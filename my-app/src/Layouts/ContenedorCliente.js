import React from 'react'
import { Layout, Menu, Breadcrumb, Row, Image,Carousel,Button } from 'antd';
import '../ccss/style.css';
import imagen from '../img/asd.png'
import imagen2 from '../img/1234.jpg'
import InicioCliente from '../Pages/Cliente/InicioCliente';
import Carta from '../Pages/Cliente/Carta'
import Reservacion from '../Pages/Cliente/Reservacion'
import { Link} from 'react-router-dom';
import {BrowserRouter, BrowserRouter as Router,Switch,Route } from 'react-router-dom';

// import Footer from './Footer'
const { Header, Content,Footer } = Layout;

const centerStyle = {
  position: 'relative',
  display: 'flex',
  justifyContent: 'center'
};




function ContenedorCliente() {
    return (
     
      <Layout>
      <Router>
      <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['/Cliente']} style={centerStyle}>
          <Menu.Item key="/Cliente">
          <span>Inicio </span>
          <Link to="/Cliente"/>
          </Menu.Item>
          
          <Menu.Item key="/Carta">
          <span>Carta </span>
          <Link to="/Carta"/>
          </Menu.Item>
          
          <Menu.Item key="3">
          <span>Sobre nosotros </span>
          <Link to="/Carta"/>
          </Menu.Item>
          <Menu.Item key="/Reservacion">
          <span>Reservacion</span>
          <Link to="/Reservacion"/>
          </Menu.Item>
          <Menu.Item key="6">Contactanos</Menu.Item>
         
        </Menu>
    
      </Header>
      <Layout className="site-layout" >
      <Content className="site-layout" >

      <div className="site-layout-background" >
                            <Route exact path="/Cliente" component={InicioCliente} />
                            <Route   path='/Carta' component={Carta}/>
                            <Route   path='/Reservacion' component={Reservacion}/>
                           
         </div>
         </Content>
         </Layout>
      <Footer style={{ textAlign: 'center' }}>@Restaurant Siglo XXI</Footer>
      </Router>
      </Layout>

      
    )
}

export default ContenedorCliente
