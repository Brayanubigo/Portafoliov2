import React,{useState,useEffect} from 'react'
import { Layout, Menu ,Button, Breadcrumb, Typography } from 'antd';
import TablaCategoria from '../GetTablas/TablaCategoria';

import {BrowserRouter, BrowserRouter as Router,Switch,Route } from 'react-router-dom';
import { Link} from 'react-router-dom';

import Inicio from '../Pages/Inicio';
import Categoria from '../Pages/Categoria';
import Product from '../Pages/Product';
import Reportes from '../Pages/Reportes';
import Usuario from '../Pages/Usuario';
import Proveedor from '../Pages/Proveedor';
import Mesa from '../Pages/Mesas';
import Inventario from '../Pages/Inventario';
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
             <Menu theme="dark" defaultSelectedKeys={'/Inicio'} mode="inline">
               <Menu.Item key="/Inicio" icon={<PieChartOutlined />}>
               <span>Inicio </span>
               <Link to="/Inicio"/>
               </Menu.Item>
              
               <Menu.Item key="/Mesa" icon={<DesktopOutlined />}>
               <span>Mesa</span>
               <Link to="/Mesa"/>
               </Menu.Item>
               <Menu.Item key="/Platos" icon={<DesktopOutlined />}>
               <span>Platos</span>
               <Link to="/Platos"/>
               </Menu.Item>
               <Menu.Item key="/Categoria" icon={<DesktopOutlined />}>
               <span>Categoria</span>
               <Link to="/Categoria"/>
               </Menu.Item>
               <Menu.Item key="/Inventario" icon={<DesktopOutlined />}>
               <span>Inventario</span>
               <Link to="/Inventario"/>
               </Menu.Item>
               <Menu.Item key="/Proveedor" icon={<DesktopOutlined />}>
               <span>Proveedor</span>
               <Link to="/Proveedor"/>
               </Menu.Item>
               <Menu.Item key="/Usuario" icon={<DesktopOutlined />}>
               <span>Usuarios</span>
               <Link to="/Usuario"/>
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
                        
                        <Switch >

                            <Route exact  path="/Inicio" component={Inicio} />
                            <Route   path='/Reportes' component={Reportes}/>
                            <Route   path='/Mesa' component={Mesa}/>
                            <Route   path='/Platos' component={Product}/>
                
                            <Route   path='/Proveedor' component={Proveedor}/>
                            <Route   path='/Inventario' component={Inventario}/>
                            <Route  path='/Usuario'  component={Usuario}/>
                            <Route path="/Categoria" component={Categoria} />
                            </Switch>
         </div>
              </Content>
              <Footer style={{ textAlign: 'center' }}>@Restaurant Siglo XXI</Footer>
        </Layout>
        </Router>
      </Layout>
      
      
    )
}

export default Contenedor
