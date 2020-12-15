import React,{Fragment}  from 'react'
import './App.css';
import {BrowserRouter,  BrowserRouter as Router,Switch,Route } from 'react-router-dom';
import Login from './Pages/Login';
import Contenedor from './Layouts/Contenedor';
import ContenedorCocina from './Layouts/ContenedorCocina';
import ContenedorBodega from './Layouts/ContenedorBodega';
import ContenedorCliente from './Layouts/ContenedorCliente';
import ContenidoClienteLo from './Layouts/ContenidoLogeado';
function App() {
  return (
    <>
   <BrowserRouter>
   <Switch >
   <Route exact path="/Login" component={Login}/>
      <Route path='/Inicio'  component={Contenedor}/>
      <Route path='/Cocina'  component={ContenedorCocina}/>
      <Route path='/Bodega'  component={ContenedorBodega}/>
      <Route path='/Cliente'  component={ContenedorCliente}/>
      <Route path='/ClienteL'  component={ContenidoClienteLo}/>
   </Switch>
  </BrowserRouter>

     
     


 
   
  
     {/* <Switch>
       <Route path='/Inicio' exact component={Inicio}/>
       <Route path='/Reportes' exact component={Reportes}/>
       <Route path='/Productos' exact component={Product}/>
       <Route path='/Categoria' exact component={Categoria}/>
       <Route path='/Inventario' exact component={Inventario}/>
       <Route path='/Usuario' exact component={Usuario}/>
         </Switch> */}

    
      
    </>
  );
}

export default App;
