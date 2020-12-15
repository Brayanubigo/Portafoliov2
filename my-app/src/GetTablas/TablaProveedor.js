import React,{ useEffect,useState} from 'react'
import axios from 'axios';
import { Table, Button, notification} from 'antd';
import ModalProveMod from '../components/ModalProveMod';
import ModalProveAgre from '../components/ModalProveAgre';
import swal from 'sweetalert';
function Tabla() {
  const [fetched, setFetched] = useState(false);
  useEffect(()=>{
    const ac = new AbortController();     
    Promise.all([
    getProveedor()
      ]).then(() => setFetched(true)) },[]);
      
const [datosapi, setdatosapi]= useState([]);
   
      const getProveedor = () =>{
          axios.get(`http://localhost:4000/obtenerProveedor2`)
        .then(res => {
  
              setdatosapi(res.data);
        })
        .catch(err => console.warn(err));
      }


     
      const  [estadoModal,setEstadoModal]= useState(false);    
    
      const [datos , setdatos] = useState([])
     
      const showModal = (ID_PROVEEDOR,NOMBRE_EMPRESA,TELEFONO) => {
        setEstadoModal(
           true,
        );
        setdatos({ID_PROVEEDOR,NOMBRE_EMPRESA,TELEFONO})
        

       
      };
    
      const handleCancel = () => {
        setEstadoModal( false );
      };
     
      const eliminarButton = (ID_PROVEEDOR) =>{
        console.log(ID_PROVEEDOR);
       
        swal({
          title: "¿Estas seguro que desea eliminar?",
          text: "Si eliminas solo cambiaras el estado, y este no podra acceder al sistema, ¿Estas seguro?",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        })
        .then((willDelete) => {
          if (willDelete) {
            axios.post('http://localhost:4000/eliminarProveedor', {"id":ID_PROVEEDOR})
        .then(response => {
            console.log(response);
            notification.open({
              message: 'Usuario Eliminado',
              description:
                'Usuario Eliminado Correctamente',
              onClick: () => {
                console.log('Notification Clicked!');
              },
            });  
            getProveedor();
        })
        .catch(err => console.warn(err));
    
          } 
        });
       
      }


      
      const columns = [
        {
            title: 'ID',
            dataIndex: 'ID_PROVEEDOR',
            key: 'ID_PROVEEDOR',
          },
        {
          title: 'Nombre Proveedor',
          dataIndex: 'NOMBRE_EMPRESA',
          key: 'NOMBRE_EMPRESA',
        },
        {
          title: 'Telefono',
          dataIndex: 'TELEFONO',
          key: 'TELEFONO',
        },
        {
          title: 'Accion',
          dataIndex: 'accion',
          key: 'accion',
          render: (fila,row) =>  <>   <Button onClick={()=>showModal(row.ID_PROVEEDOR,row.NOMBRE_EMPRESA,row.TELEFONO) }  type="primary">Editar</Button> {" "} <Button type="danger" onClick={()=>eliminarButton(row.ID_PROVEEDOR)}> Eliminar </Button> </>
        },
      ];


    return (
        <div>
          <ModalProveAgre getProveedor={getProveedor}/>
          <ModalProveMod datos={datos}  showModal={showModal} estadoModal={estadoModal} handleCancel={handleCancel} getProveedor={getProveedor}></ModalProveMod>
           <Table dataSource={datosapi} columns={columns} style={{ marginBottom: 5, marginTop: 30 }} /> 
        </div>
    )
}

export default Tabla;
