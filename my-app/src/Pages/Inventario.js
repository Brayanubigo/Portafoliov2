import React,{useState,useEffect, Fragment} from 'react'
import axios from 'axios';
import { Modal, ModalBody, ModalHeader, ModalFooter, Button , Container} from 'reactstrap';
import swal from 'sweetalert';
import Moment from 'react-moment';
import GetInsumo from '../GetTablas/TablaInsumo';

function Inventario() {
   
    
    
    
    return (
        <div>
              <Fragment>
       <Container>


        <div className=''>
        <h3 className="ml-4 mt-4">Inventario </h3>
      
          
          
          <GetInsumo/>
          
    </div>
</Container>
      </Fragment>
        </div>
    )
}

export default Inventario;
