import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { Layout, Menu} from 'antd';
import { Card, Col, Row ,DatePicker, Space ,Tabs,List} from 'antd';
import { Column } from '@ant-design/charts';


import {
  TableOutlined,
  FormOutlined,
  DashboardOutlined,
  UserOutlined,
  BarsOutlined,
  CheckCircleOutlined,
  ExclamationOutlined,
} from '@ant-design/icons';
const { Sider } = Layout;
const { SubMenu } = Menu;
const { Meta } = Card;
const { RangePicker } = DatePicker;
const { TabPane } = Tabs;
/*const datas = [
  {
    title: 'Ant Design Title 1',
  },
  {
    title: 'Ant Design Title 2',
  },
  {
    title: 'Ant Design Title 3',
  },
  {
    title: 'Ant Design Title 4',
  },
];
  const dataarea = [
    {
      country: 'Asia',
      year: '1750',
      value: 502,
    },
    {
      country: 'Asia',
      year: '1800',
      value: 635,
    },
  ];

  const configarea = {
    title: {
      visible: true,
      text: '百分比堆叠面积图',
    },
    dataarea,
    meta: {
      year: {
        range: [0, 1],
      },
    },
    xField: 'year',
    yField: 'value',
    stackField: 'country',
    color: ['#82d1de', '#cb302d', '#e3ca8c'],
    areaStyle: { fillOpacity: 0.7 },
  };*/
  /*const data = [
    { year: '1991', value: 3 },
    { year: '1992', value: 4 },
    { year: '1993', value: 3.5 },
    { year: '1994', value: 5 },
    { year: '1995', value: 4.9 },
    { year: '1996', value: 6 },
    { year: '1997', value: 7 },
    { year: '1998', value: 9 },
    { year: '1999', value: 13 },
  ];*/
  function callback(key) {
    console.log(key);
  }

  var ts,wr,dr,ds,visits,day_visits,payments_count,conversion_rate,op_week_ratio,op_day_ratio,percent;
  var datasales = [];

class App extends React.Component{
  constructor(props) {
    super(props);
  this.onChangeDate = this.onChangeDate.bind(this);
  this.state = {
    collapsed: false,
    error: null,
    isLoaded: false,
    items: [],
    bar: []
  };
}
onChangeDate(e,f) {
  const body = (f);
      fetch("http://localhost:5000/sales_monthly ",{
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
            }).then(res => res.json())
            .then( (result) => {
              this.setState({
                bar: result,
              });
              console.log(result);
            },
            (error) => {
              this.setState({
                isLoaded: true,
                error
              });
            });
      /*try {
        const body = { e };
        console.log(body);
        const response = fetch("http://localhost:5000/todos", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        });
  
        window.location = "/";
      } catch (err) {
        console.error(err.message);
      }*/

}
  componentDidMount() {
    const urls = [
      "http://localhost:5000/totalsales",
      "http://localhost:5000/visits",
      "http://localhost:5000/payments",
      "http://localhost:5000/operations",
      "http://localhost:5000/sales_company_wise"
  ];
    /*fetch(this.state.api)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )*/
      Promise.all(urls.map(url=>
        fetch(url)
        .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
        )
      ));
  }
  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    //var data = this.state.bar;
    /*const data = [
      { year: '1991', value: 3 },
      { year: '1992', value: 4 },
      { year: '1993', value: 3.5 },
      { year: '1994', value: 5 },
      { year: '1995', value: 4.9 },
      { year: '1996', value: 6 },
      { year: '1997', value: 7 },
      { year: '1998', value: 9 },
      { year: '1999', value: 13 },
    ];*/
    var data =this.state.bar;
    for(var i =0;i<data.length;i++)
    {
      data[i].sales_count = parseInt(data[i].sales_count,10); 
    }
    console.log(data);
    var config;
    config= {
      data,
      title: {
        visible: true,
        text: 'Stores Sales Trend',
      },
      xField: 'date',
      yField: 'sales_count',
      point: {
        visible: true,
        size: 5,
        shape: 'diamond',
        style: {
          fill: 'white',
          stroke: '#2593fc',
          lineWidth: 2,
        },
      },
    };
  
    console.log(this.state.items);
    if(this.state.items[0]!==undefined)
    {
      console.log(this.state.items[0].type);
      if(this.state.items[0].type==='sales')
      {
      ts = this.state.items[0].total_sales;
      wr = "Week Ratio         "+this.state.items[0].week_ratio+"%";
      dr = "Day Ratio  "  + this.state.items[0].day_ratio+"%";
      ds = "Day Sales " +this.state.items[0].day_sales;
      }
      else if(this.state.items[0].type==='visits')
            {
              visits = this.state.items[0].visits_count;
              day_visits = "Day Visits   " +this.state.items[0].day_visits;
            }
            else if(this.state.items[0].type==='payments')
            {
              payments_count = this.state.items[0].payments_count;
              conversion_rate = "Conversion Rate   "+this.state.items[0].conversion_rate+"%";
            }
            else if(this.state.items[0].type==='operations')
            {
                  op_day_ratio = "Day Ratio   "  +this.state.items[0].day_ratio+"%";
                  op_week_ratio = "Week Ratio   " +this.state.items[0].week_ratio+"%";
                  percent = this.state.items[0].percentage+"%";
            }
            else if(this.state.items[0].type==='sales_count')
            {
                datasales= this.state.items;
                console.log(datasales);
            }
    }
    return (
      <Layout style={{ minHeight: '100vh' }}  >
      <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <SubMenu key="sub1" icon={<DashboardOutlined />} title="Dashboard">
            <Menu.Item key="3">Analysis</Menu.Item>
            <Menu.Item key="4">Monitor</Menu.Item>
            <Menu.Item key="5">Workplace</Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" icon={<FormOutlined />} title="Form">
            <Menu.Item key="6">Team 1</Menu.Item>
            <Menu.Item key="8">Team 2</Menu.Item>
          </SubMenu>
          <SubMenu key="sub3" icon={<TableOutlined />} title="List">
            <Menu.Item key="9">Team 1</Menu.Item>
            <Menu.Item key="10">Team 2</Menu.Item>
          </SubMenu>
          <SubMenu key="sub4" icon={<BarsOutlined />} title="Profile">
            <Menu.Item key="11">Team 1</Menu.Item>
            <Menu.Item key="12">Team 2</Menu.Item>
          </SubMenu>
          <SubMenu key="sub5" icon={<CheckCircleOutlined />} title="Result">
            <Menu.Item key="13">Team 1</Menu.Item>
            <Menu.Item key="14">Team 2</Menu.Item>
          </SubMenu>
          <SubMenu key="sub6" icon={<ExclamationOutlined />} title="Exception">
            <Menu.Item key="15">Team 1</Menu.Item>
            <Menu.Item key="16">Team 2</Menu.Item>
          </SubMenu>
          <SubMenu key="sub7" icon={<UserOutlined />} title="Account">
            <Menu.Item key="17">Team 1</Menu.Item>
            <Menu.Item key="18">Team 2</Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>

      <Row gutter={16}>
      <Col span={6}>
          <Card title="Total Sales" bordered={false} style={{width: 250,height:200}}>
            <Meta
            description={ts} size={6}
          />
                      <Meta           
            description = {wr}
            />
                    <Meta
            description={dr} size={6}
          />
                              <Meta
            description={ds} size={6}
          />
          </Card>
        </Col>
        <Col span={6}>
          <Card title="Visits" bordered={false} style={{width: 250,height:200}}>
          <Meta
            description={visits}
          />
                    <Meta
            description={day_visits}
          />
          </Card>
        </Col>
        <Col span={6}>
          <Card title="Payments" bordered={false} style={{width: 250,height:200}}>
          <Meta
            description={payments_count}
          />
                    <Meta
            description={conversion_rate}
          />
          </Card>
        </Col>
        <Col span={6}>
          <Card title="Operational Effect" bordered={false} style={{width: 250,height:200}}>
          <Meta
            description={percent}
          />
                    <Meta
            description={op_week_ratio}
          />
                              <Meta
            description={op_day_ratio}
          />
          </Card>
        </Col>
  
        <Col span={12}>

          <Card>
    <Space direction="vertical" size={12}>
  <Tabs type="card">

    <TabPane tab="Sales" key="2">
    </TabPane>
    <TabPane tab="Visits" key="3">
    </TabPane>
  </Tabs>
  </Space>
  <Space direction="vertical" size={12}>
    <RangePicker onChange={this.onChangeDate} />
  </Space>
  <Column {...config} />

      </Card>
      </Col>
      <Col span={12}>
          <Card title="Sales Ranking" bordered={false} style={{width: 250,height:550}}>
          <List
    itemLayout="horizontal"
    dataSource={datasales}
    renderItem={item => (
      <List.Item>
        <List.Item.Meta
          description={item.sales_count}
        />
        <div>{item.company_name}</div>
      </List.Item>
    )}
  />
          </Card>
        </Col>


      </Row>
    </Layout>
    );
  }
}

export default App;