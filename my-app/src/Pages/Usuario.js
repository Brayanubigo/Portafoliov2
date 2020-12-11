import React,{useState,useEffect, Fragment} from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import Moment from 'react-moment';
import GetUsuario from '../GetTablas/TablaUsuario';
import ModalAgreUser from '../components/ModalUsuaAgre';

function Usuario() {
  



    return (
      <Fragment>
    
    <div className='Usuario App'>
        <h3 className="ml-4 mt-4">Usuario </h3>


      
          <GetUsuario/>
          </div>
     
        
        
        
        
    
      </Fragment>
      
    );
  }


 
export default Usuario;