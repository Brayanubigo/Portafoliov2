import React,{useState,useEffect, Fragment} from 'react'
import axios from 'axios';
import { Modal, ModalBody, ModalHeader, ModalFooter, Button , Container} from 'reactstrap';
import swal from 'sweetalert';
import GetCategoria from '../GetTablas/TablaCategoria';
import ModalCatAgre from '../components/ModalCateAgre';
function Categoria() {

    
   

 // Generar estructura de los datos que vendran del formulario
 const [datoform, setdatoform]= useState({
    ID_CATEGORIA: '',
    NOMBRE_CATEGORIA: '',
    DESCRIPCION: ''
  
});


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
        <div className=''>
        
        <GetCategoria/>
    </div>


{/* MODAL EDITAR */}

<Modal isOpen={modalEditar}>
        <ModalHeader>
        <div>
            <h3>Editar Usuario </h3>
            </div>
        </ModalHeader>
        <ModalBody>
        <form className='container-fluid mr-auto' onSubmit={modificarCategoria}>
 
   <div class="form-group">
    <label>Nombre Categoria</label>
    <input type="text" class="form-control" name="NOMBRE_CATEGORIA"  value={datoform.NOMBRE_CATEGORIA} onChange={handleInputChange}/>
  </div>
   <div class="form-group">
    <label>Descripcion</label>
    <input type="text" class="form-control" name="DESCRIPCION"  value={datoform.DESCRIPCION} onChange={handleInputChange}/>
  </div>
  <button type="submit" class="btn btn-primary" onClick= {()=>setModalEditar(false)}>Actualizar</button>
  <button type="submit" class="btn btn-danger ml-3" onClick={()=>setModalEditar(false)}>Cancelar</button>
</form>
        </ModalBody>
        </Modal>
        
        

    </Container>
      </Fragment>
    )
}

export default Categoria;
