import React,{Fragment}  from 'react'
import './App.css';
import {BrowserRouter,  BrowserRouter as Router,Switch,Route } from 'react-router-dom';
import Routes from './Route/Routes';
import Contenedor from './Layouts/Contenedor';

function App() {
  return (
    <>
   {/* <BrowserRouter>
   <Switch>
   <Route exact path="/" component={Login}/>
      <Route path='/Inicio' exact component={Inicio}/>
       <Route path='/Reportes' exact component={Reportes}/>
       <Route path='/Productos' exact component={Product}/>
       <Route path='/Usuario' exact component={Usuario}/>
   </Switch>
  </BrowserRouter> */}
   
     
     


   <Contenedor/>
   
  
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
