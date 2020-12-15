import React,{ useEffect,useState,useRef} from 'react'
import axios from 'axios';
import { Table, Button , notification} from 'antd';
import ModalCat from '../components/ModalCateAgre'
import ModalCatMod from '../components/ModalCateModi';
import swal from 'sweetalert';

function Tabla() {
    useEffect(()=>{
        getCategoria();
      },[]);
      
const [datosapi, setdatosapi]= useState([]);
   
      const getCategoria = (props) =>{
          axios.get(`http://localhost:4000/obtenerCategoria`)
        .then(res => {
  
              setdatosapi(res.data);
        })
      }

   
      const eliminarButton = (ID_CATEGORIA) =>{
        console.log(ID_CATEGORIA);
       
        swal({
          title: "¿Estas seguro que desea eliminar?",
          text: "Si eliminas solo cambiaras el estado, y este no podra acceder al sistema, ¿Estas seguro?",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        })
        .then((willDelete) => {
          if (willDelete) {
            axios.post('http://localhost:4000/eliminarCategoria', {"id":ID_CATEGORIA})
        .then(response => {
            console.log(response);
            notification.open({
              message: 'Categoria Eliminado',
              description:
                'Categoria Eliminado Correctamente',
              onClick: () => {
                console.log('Notification Clicked!');
              },
            });  
            getCategoria();
        })
        .catch(err => console.warn(err));
    
          } 
        });
       
      }







    const  [estadoModal,setEstadoModal]= useState(false);    
    
    const [datos , setdatos] = useState([])
   
    const showModal = (ID_CATEGORIA,NOMBRE_CATEGORIA,DESCRIPCION,ESTADO) => {
      setEstadoModal(
         true,
      );
      setdatos({ID_CATEGORIA,NOMBRE_CATEGORIA,DESCRIPCION,ESTADO})
      
      // console.log("datos"+ datitos, datito2,datito3);
      // console.log("presionado")
     
    };
  
    const handleCancel = () => {
      setEstadoModal( false );
    };
   

      const columns = [
        {
            title: 'ID',
            dataIndex: 'ID_CATEGORIA',
            key: 'ID_CATEGORIA',
          },
        {
          title: 'Nombre Categoria',
          dataIndex: 'NOMBRE_CATEGORIA',
          key: 'NOMBRE_CATEGORIA',
        },
        {
          title: 'Descripcion',
          dataIndex: 'DESCRIPCION',
          key: 'DESCRIPCION',
        },
        {
          title: 'Estado',
          dataIndex: 'ESTADO',
          key: 'ESTADO',
        },
        {
          title: 'Accion',
          dataIndex: 'accion',
          key: 'accion',
          render: (fila,row) =>  <>   <Button onClick={()=>showModal(row.ID_CATEGORIA,row.NOMBRE_CATEGORIA,row.DESCRIPCION,row.ESTADO) }  type="primary">Editar</Button> {" "} <Button type="danger" onClick={()=>eliminarButton(row.ID_CATEGORIA)}> Eliminar </Button> </>
        },
      ];




    return (
        <div>
          <ModalCatMod datos={datos}  showModal={showModal} estadoModal={estadoModal} handleCancel={handleCancel} getCategoria={getCategoria}></ModalCatMod>
            <ModalCat getCategoria={getCategoria} style={{ marginBottom: 100, marginTop: 100 }} />
           <Table dataSource={datosapi} columns={columns} style={{ marginBottom: 5, marginTop: 30 }} /> 
        </div>


    )
}

export default Tabla;
