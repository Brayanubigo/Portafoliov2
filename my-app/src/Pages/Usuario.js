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


    return (
      <Fragment>
    
    <div className='Usuario App'>
        <h3 className="ml-4 mt-4">Usuario </h3>


        <ModalAgreUser/>
          <GetUsuario/>
          </div>
     
        
        
        
        
    
      </Fragment>
      
    );
  }


 
export default Usuario;