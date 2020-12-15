import React,{useState,useEffect} from 'react'
import { Layout, Menu ,Button, Breadcrumb, Typography } from 'antd';
import TablaCategoria from '../GetTablas/TablaCategoria';

import {BrowserRouter, BrowserRouter as Router,Switch,Route } from 'react-router-dom';
import { Link} from 'react-router-dom';

import InicioBodega from '../Pages/Bodega/InicioBodega';
import Reportes from '../Pages/Reportes';
import Inventario from '../Pages/Inventario';
import Proveedor from '../Pages/Proveedor'

import {
    
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
  } from '@ant-design/icons';

import Cookie from 'universal-cookie';
const cookies = new Cookie();
const { Title } = Typography;
const { Header, Content, Footer, Sider } = Layout;
function Contenedor() {
  useEffect(()=>{
    componentDidMount();
        },[]);

const componentDidMount = ()=>{
  if(!cookies.get('id')){
    window.location.href="./Login";
  } 
}
console.log('id' + cookies.get('id'))
  console.log('nombre: '+cookies.get('nombre'))
  console.log('apellido: '+cookies.get('apellido'))
  
  var nombre= cookies.get('nombre');
  var apellido = cookies.get('apellido')

  const cerrarSesion = ()=>{
      cookies.remove('id', {path: "/"});
      window.location.href='./Login';
      
  }

    
    return (
        
        <Layout style={{ minHeight: '100vh' }}>
        <Router>
        <Sider  style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
      }}>
              <div className="logo" />
             <Menu theme="dark" defaultSelectedKeys={'/Bodega'} mode="inline">
               <Menu.Item key="/Bodega" icon={<PieChartOutlined />}>
               <span>Inicio </span>
               <Link to="/Bodega"/>
               </Menu.Item>
               <Menu.Item key="/Reportes" icon={<DesktopOutlined />}>
               <span>Reportes</span>
               <Link to="/Reportes"/>
               </Menu.Item>
               <Menu.Item key="/Inventario" icon={<DesktopOutlined />}>
               <span>Inventario</span>
               <Link to="/Inventario"/>
               </Menu.Item>
               <Menu.Item key="/Proveedor" icon={<DesktopOutlined />}>
               <span>Proveedor</span>
               <Link to="/Proveedor"/>
               </Menu.Item>
             </Menu>
           </Sider>   
    
           <Layout className="site-layout" style={{ marginLeft: 200 }}>
           <Header className="site-layout-background" style={{ padding: 0, backgroundColor:'black' }}  >
           < Button type="primary" onClick={()=>cerrarSesion()} style={{float: 'right', marginTop: 20, marginRight: 20  }}> Cerrar Sesion </Button>
           <Title level={4} style={{float: 'right', marginTop: 20, marginRight: 20, color:'white'  }}>Bienvenido {nombre} {apellido}</Title>
         </Header>
           <Content style={{ margin: '0 16px' }}>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                            <Route exact path="/Bodega" component={InicioBodega} />

                            <Route   path='/Inventario' component={Inventario}/>
                            <Route   path='/Proveedor' component={Proveedor}/>
                           
         </div>
              </Content>
              <Footer style={{ textAlign: 'center' }}>@Restaurant Siglo XXI</Footer>
        </Layout>
        </Router>
      </Layout>
      
      
    )
}

export default Contenedor
