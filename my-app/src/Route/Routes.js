import React,{Fragment}  from 'react'
import {BrowserRouter, BrowserRouter as Router,Switch,Route } from 'react-router-dom';
import Inicio from '../Pages/Inicio';
import Product from '../Pages/Product';
import Reportes from '../Pages/Reportes';
import Usuario from '../Pages/Usuario';
import Login from '../Pages/Login';
import Categoria from '../Pages/Categoria';
import Inventario from '../Pages/Inventario';


function Routes() {
    return (
        <>
     <>
     <Router>
   <Switch>
   <Route exact path="/" component={Inicio}/>
      <Route  path='/Inicio'  component={Inicio}/>
       <Route   path='/Reportes' component={Reportes}/>
       <Route   path='/Platos' component={Product}/>
       <Route   path='/Categoria'  component={Categoria}/>
       <Route   path='/Inventario' component={Inventario}/>
       <Route  path='/Usuario'  component={Usuario}/>
   </Switch>
   </Router>
  </>
        </>
    )
}

export default Routes;
