import React,{useState,useEffect, Fragment} from 'react';
import axios from 'axios';
import { Modal, ModalBody, ModalHeader, ModalFooter, Button , Container} from 'reactstrap';
import swal from 'sweetalert';
import GetPlato from '../GetTablas/TablaPlatos';
import ModalPlatoAgre from '../components/ModalPlatoAgre';
function Product() {
      
        
        // Obtener datos de node js

    
     // Generar estructura de los datos que vendran del formulario
     const [datoform, setdatoform]= useState({
        ID_PLATO: '',
        NOMBRE: '',
        PRECIO: '',
        DESCRIPCION: '',
        CATEGORIA_ID_CATEGORIA: ''

    });

  //EDITAR FORMULARIO 
const [modalEditar, setModalEditar] = useState(false);

const abrirModalEditar=(elemento, caso) =>{
  setdatoform(elemento);
  (caso==='Editar')?setModalEditar(true):setModalEliminar(true);
}



const modificarPlato = (event)=>{
    
  console.log('formulario modificado');
  event.preventDefault()
  axios.post('http://localhost:4000/updatePlato', datoform)
  .then(response => {
      console.log(response);
      setModalEditar(false);
  })
  .catch(err => console.warn(err));
}

const handleInputChange = (event) => {
  setdatoform({
      ... datoform,
      [event.target.name]:event.target.value
      
  })
  console.log(datoform);
}

// FORM ELIMINAR
const [modalEliminar, setModalEliminar] = useState(false);

const eliminarButton = (id) =>{
  console.log(id);
  swal({
    title: "¿Estas seguro que desea eliminar?",
    text: "Si eliminar el plato no se volvera a mostrar",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((willDelete) => {
    if (willDelete) {
      axios.post('http://localhost:4000/eliminarPlato', id)
  .then(response => {
      console.log(response);
      setModalEliminar(false);
  })
  .catch(err => console.warn(err));

    } 
  });
 
}

    return (
      
     <Fragment>
       <Container>


        <div className='Usuario App'>
        <h3 className="ml-4 mt-4">Platos </h3>
      
    
          <ModalPlatoAgre/>
          <GetPlato/>
    </div>




    </Container>
      </Fragment>
    )
    }

export default Product;