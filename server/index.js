const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./node_modules/db");

app.use(cors());
app.use(express.json()); 

app.listen(5000,()=>{
    console.log("server started on port 5000");
});

app.post("/sales_monthly", async (req, res) => {
  try {
    var  s  = req.body;
    console.log(s[0]);
    console.log(s[1]);
    console.log(`SELECT sales_count,date FROM sales_company_wise WHERE date >= '${s[0]}'  AND date <= '${s[1]}' ORDER BY date ASC`);
    const allTodos = await pool.query(`SELECT sales_count,date FROM sales_company_wise WHERE date >= '${s[0]}'  AND date <= '${s[1]}' ORDER BY date ASC`);
    console.log(allTodos.rows);
    res.json(allTodos.rows);

  } catch (err) {
    console.error(err.message);
  }
});

app.get("/totalsales", async (req, res) => {
    try {
      const allTodos = await pool.query("SELECT * FROM sales");
      res.json(allTodos.rows);
    } catch (err) {
      console.error(err.message);
    }
  });

  app.get("/visits", async (req, res) => {
    try {
      const allTodos = await pool.query("SELECT * FROM visits");
      res.json(allTodos.rows);
    } catch (err) {
      console.error(err.message);
    }
  });

  app.get("/payments", async (req, res) => {
    try {
      const allTodos = await pool.query("SELECT * FROM payments");
      res.json(allTodos.rows);
    } catch (err) {
      console.error(err.message);
    }
  });

  app.get("/operations", async (req, res) => {
    try {
      const allTodos = await pool.query("SELECT * FROM operational_effect");
      res.json(allTodos.rows);
    } catch (err) {
      console.error(err.message);
    }
  });

  app.get("/sales_company_wise", async (req, res) => {
    try {
      const allTodos = await pool.query("SELECT * FROM sales_company_wise ORDER BY sales_count DESC");
      res.json(allTodos.rows);
    } catch (err) {
      console.error(err.message);
    }
  });

  app.get("/sales_company_wise_graph", async (req, res) => {
    try {
      var s = "2020-03-07";
      var e = "2020-09-09";
      console.log("hi");
      //console.log(`SELECT sales_count,date FROM sales_company_wise WHERE date >= '${s}'  AND date <= '${e}' ORDER BY date ASC`);
      const allTodos = await pool.query(`SELECT sales_count,date FROM sales_company_wise WHERE date >= '${s}'  AND date <= '${e}' ORDER BY date ASC`);
      res.json(allTodos.rows);
      console.log(allTodos.rows);

    } catch (err) {
      console.error(err.message);
    }
  });
