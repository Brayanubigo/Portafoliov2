import React,{useState,useEffect, Fragment} from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import Moment from 'react-moment';
import GetUsuario from '../GetTablas/TablaUsuario';
import ModalAgreUser from '../components/ModalUsuaAgre';

function Usuario() {
  


  
  
  const eliminarButton = (id) =>{
    console.log(id);
    swal({
      title: "Estas seguro que desea eliminar?",
      text: "Si eliminas el usuario no se volvera a mostrar",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        axios.post('http://localhost:4000/eliminarUsuario', id)
    .then(response => {
        console.log(response);
        
    })
    .catch(err => console.warn(err));

      } 
    });
   
  }


// FUNCIONES DEL MODAL PARA ABRIR
    // const abrirModalAgregar=() =>{
    //   setModalAgregar(true);
    // }
    
    // const abrirModalEditar=(elemento, caso) =>{
    //   setdatoform(elemento);
    //   (caso==='Editar')?setModalEditar(true):setModalEliminar(true);
    // }
    return (
      <Fragment>
    
         
        <ModalAgreUser/>
          <GetUsuario/>
            
     
        
        
        
        
    
      </Fragment>
      
    );
  }


 
export default Usuario;