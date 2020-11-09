import React,{useState,useEffect} from 'react'
import { Layout, Menu, Breadcrumb} from 'antd';
import TablaCategoria from '../GetTablas/TablaCategoria';

import {BrowserRouter, BrowserRouter as Router,Switch,Route } from 'react-router-dom';
import { Link} from 'react-router-dom';

import Inicio from '../Pages/Inicio';
import Categoria from '../Pages/Categoria';
import Product from '../Pages/Product';
import Reportes from '../Pages/Reportes';
import Usuario from '../Pages/Usuario';
import Proveedor from '../Pages/Proveedor';
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
 
 
 
  const  [collapsed, setcollapsed]= useState((false));  

    
const onCollapse = isCollapsed => {    
        setcollapsed( isCollapsed );
      };
    return (
        
        <Layout style={{ minHeight: '100vh' }}>
        <Router>
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
             <div className="logo" />
             <Menu theme="dark" defaultSelectedKeys={'/Inicio'} mode="inline">
               <Menu.Item key="/Inicio" icon={<PieChartOutlined />}>
               <span>Inicio </span>
               <Link to="/Inicio"/>
               </Menu.Item>
               <Menu.Item key="/Reportes" icon={<DesktopOutlined />}>
               <span>Reportes</span>
               <Link to="/Reportes"/>
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
    
           <Layout className="site-layout">
           <Header className="site-layout-background" style={{ padding: 0 }} />
           <Content style={{ margin: '0 16px' }}>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                            <Route exact path="/" component={Inicio} />
                            <Route   path='/Inicio' component={Inicio}/>
                            <Route   path='/Reportes' component={Reportes}/>
                            <Route   path='/Platos' component={Product}/>
                            <Route   path='/Proveedor' component={Proveedor}/>
                            <Route   path='/Inventario' component={Inventario}/>
                            <Route  path='/Usuario'  component={Usuario}/>
                            <Route path="/Categoria" component={Categoria} />
         </div>
              </Content>
              <Footer style={{ textAlign: 'center' }}>@Restaurant Siglo XXI</Footer>
        </Layout>
        </Router>
      </Layout>
      
      
    )
}

export default Contenedor
