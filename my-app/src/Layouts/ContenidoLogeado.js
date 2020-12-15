import React,{useState,useEffect} from 'react'
import { Layout, Menu, Breadcrumb, Row, Image,Carousel,Button } from 'antd';
import '../ccss/style.css';
import imagen from '../img/asd.png'
import imagen2 from '../img/1234.jpg'
import InicioCliente from '../Pages/Cliente/InicioCliente';
import Carta from '../Pages/Cliente/Carta'
import ReservacionLogeado from '../Pages/Cliente/ReservacionLogeado'
import { Link} from 'react-router-dom';
import {BrowserRouter, BrowserRouter as Router,Switch,Route } from 'react-router-dom';
import Cookie from 'universal-cookie';
const cookies = new Cookie();



// import Footer from './Footer'
const { Header, Content,Footer } = Layout;

const centerStyle = {
  position: 'relative',
  display: 'flex',
  justifyContent: 'center'
};

function ContenedorCliente() {
useEffect(()=>{
  componentDidMount();
      },[]);

      const componentDidMount = ()=>{
        if(!cookies.get('id')){
          window.location.href="./Cliente";
        } 
        }
        console.log('id' + cookies.get('id'))
        console.log('nombre: '+cookies.get('nombre'))
        console.log('apellido: '+cookies.get('apellido'))
        
        var nombre= cookies.get('nombre');
        var apellido = cookies.get('apellido')
        
        const cerrarSesion = ()=>{
            cookies.remove('id', {path: "/"});
            window.location.href='./Cliente';
            
        }



  
  return (
     
      <Layout>
      <Router>
      <Header  style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
      < Button type="primary" onClick={()=>cerrarSesion()} style={{float: 'right', marginTop: 20, marginRight: 20  }}> Cerrar Sesion </Button>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['/ClienteL']} style={centerStyle}>
          <Menu.Item key="/ClienteL">
          <span>Inicio </span>
          <Link to="/ClienteL"/>
          </Menu.Item>
          
          <Menu.Item key="/Carta">
          <span>Carta </span>
          <Link to="/Carta"/>
          </Menu.Item>
          
          <Menu.Item key="3">
          <span>Sobre nosotros </span>
          <Link to="/Carta"/>
          </Menu.Item>
          <Menu.Item key="/ReservacionLogeado">
          <span>Reservacion</span>
          <Link to="/ReservacionLogeado"/>
          </Menu.Item>
          <Menu.Item key="6">Contactanos</Menu.Item>
         
        </Menu>
    
      </Header>
      <Layout className="site-layout" >
      <Content className="site-layout" >

      <div className="site-layout-background" >
                            <Route exact path="/ClienteL" component={InicioCliente} />
                            <Route   path='/Carta' component={Carta}/>
                            <Route   path='/ReservacionLogeado' component={ReservacionLogeado}/>
                           
         </div>
         </Content>
         </Layout>
      <Footer style={{ textAlign: 'center' }}>@Restaurant Siglo XXI</Footer>
      </Router>
      </Layout>

      
    )
}

export default ContenedorCliente
