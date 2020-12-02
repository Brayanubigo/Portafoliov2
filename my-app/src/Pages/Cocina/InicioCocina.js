import React,{useEffect}  from 'react'
import {Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import Cookie from 'universal-cookie';
const cookies = new Cookie();

function InicioCocina() {
  useEffect(()=>{
    componentDidMount();
        },[]);


  console.log('id' + cookies.get('id'))
  console.log('nombre: '+cookies.get('nombre'))
  console.log('apellido: '+cookies.get('apellido'))
  const cerrarSesion = ()=>{
    cookies.remove('id', {path: "/"});
    window.location.href='./Login';
    
}

const componentDidMount = ()=>{
  if(!cookies.get('id')){
    window.location.href="./Login";
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

export default InicioCocina;
