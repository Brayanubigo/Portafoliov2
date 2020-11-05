import React from 'react'
import {Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import Cookie from 'universal-cookie';
const cookies = new Cookie();

function Inicio() {
  
  const cerrarSesion = ()=>{
    cookies.remove('id', {path: "/"});
    window.location.href='./';
    
}

 const componentDidMount = ()=>{
  if(cookies.get('id')){
    window.location.href="./";
  } 
}
//  componentDidMount();
 
console.log('rut ' + cookies.get('id'));  
  return (
       
        <div className='inicio mr-auto'>
          <h5>Inicio</h5>
          <button type="button" class="btn btn-primary" onClick={()=>cerrarSesion()}>Cerrar Sesion</button>
        </div>
    )
}

export default Inicio
