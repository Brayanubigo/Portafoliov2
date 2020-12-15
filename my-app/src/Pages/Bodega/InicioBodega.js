import React,{useState,useEffect}  from 'react'
import {Container, Card, Form, Button,Statistic, Row, Col } from 'antd';
import axios from 'axios';
import { BgColorsOutlined } from '@ant-design/icons';


function InicioBodega() {
  useEffect(()=>{
    getInsumo();
    getUsuarios();
    getProveedor();
    getRol();
  },[]);
  
  const [datosapi, setdatosapi]= useState([]);
   
  const getInsumo = () =>{
      axios.get(`http://localhost:4000/obtenerInsumosInicio`)
    .then(res => {
          console.log("res "+ res.data.length)
          setdatosapi(res.data.length);
    })
  } 

  const [datosapiusu, setdatosapiusu]= useState([]);
   
  const getUsuarios = () =>{
      axios.get(`http://localhost:4000/obtenerUsuario`)
    .then(res => {
          console.log("res "+ res.data.length)
          setdatosapiusu(res.data.length);
    })
  } 

  const [datosapipro, setdatosapipro]= useState([]);
   
  const getProveedor = () =>{
      axios.get(`http://localhost:4000/obtenerProveedor2`)
    .then(res => {
          console.log("res "+ res.data.length)
          setdatosapipro(res.data.length);
    })
  } 

  const [datosapicli, setdatosapicli]= useState([]);
   
  const getRol = () =>{
      axios.get(`http://localhost:4000/obtenerUsuarioInicio`)
    .then(res => {
          console.log("res "+ res.data.length)
          setdatosapicli(res.data.length);
    })
  } 


  return (
    <div className="site-statistic-demo-card">
    <Row gutter={30}>
     
    <Col span={6}>
      <Statistic title="Inventario" value={datosapi} valueStyle={{color:"white"}}  style={{backgroundColor:'#4BA6FE'}}/>
    </Col>
    
   
    <Col span={6}>
      <Statistic title="Usuarios" value={datosapiusu} valueStyle={{color:"white"}} style={{backgroundColor:'#4BA6FE'}}/>
    </Col>
    
  

    <Col span={6}>
      
      <Statistic title="Proveedor" value={datosapipro} valueStyle={{color:"white"}} style={{backgroundColor:'#4BA6FE'}}/>
    </Col>
    
    
 
    <Col span={6}>
      <Statistic title="Clientes" value={datosapicli} valueStyle={{color:"white"}} style={{backgroundColor:'#4BA6FE'}}/>
    </Col>
    
    </Row>
    </div>
    )
}

export default InicioBodega
