import React,{useState,useEffect, Fragment} from 'react'
import axios from 'axios';
import { Modal, ModalBody, ModalHeader, ModalFooter, Button , Container} from 'reactstrap';
import swal from 'sweetalert';
import GetProveedor from '../GetTablas/TablaProveedor';

function Proveedor() {

    
   

 // Generar estructura de los datos que vendran del formulario
 const [datoform, setdatoform]= useState({
    ID_CATEGORIA: '',
    NOMBRE_CATEGORIA: '',
    DESCRIPCION: ''
  
});

// MODAL Y FORMULARIO DE AGREGAR
const [modalAgregar, setModalAgregar] = useState(false);

    const enviarFormulario = (event)=>{
    
        
        console.log('formulario listo');
        event.preventDefault()
        axios.post('http://localhost:4000/agregarCategoria', datoform)
        .then(response => {
            console.log(response);
            setModalAgregar(false);
        })
        .catch(err => console.warn(err));
    }

    const capturaFormularioAdd = e => {
      const { name, value } = e.target;
      setdatoform((prevState) => ({
          ...prevState,
          [name]: value
      }));
      console.log(datoform);
  }
  
  const abrirModalAgregar=() =>{
    setModalAgregar(true);
  }


//EDITAR FORMULARIO 
const [modalEditar, setModalEditar] = useState(false);

const abrirModalEditar=(elemento, caso) =>{
  setdatoform(elemento);
  (caso==='Editar')?setModalEditar(true):setModalEliminar(true);
}



const modificarCategoria = (event)=>{
    
  console.log('formulario modificado');
  event.preventDefault()
  axios.post('http://localhost:4000/updateCategoria', datoform)
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
    title: "Estas seguro que desea eliminar?",
    text: "Si la categoria no se volvera a mostrar",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((willDelete) => {
    if (willDelete) {
      axios.post('http://localhost:4000/eliminarCategoria', id)
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
        <h3 className="ml-4 mt-4">Proveedor </h3>

        <GetProveedor/>
        </div>


    </Container>
      </Fragment>
    )
}

export default Proveedor;
