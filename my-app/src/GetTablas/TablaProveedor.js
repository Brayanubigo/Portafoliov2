import React,{ useEffect,useState} from 'react'
import axios from 'axios';
import { Table, Button} from 'antd';
import ModalProveMod from '../components/ModalProveMod';
function Tabla() {
    useEffect(()=>{
        getProveedor();
      },[]);
      
const [datosapi, setdatosapi]= useState([]);
   
      const getProveedor = () =>{
          axios.get(`http://localhost:4000/obtenerProveedor2`)
        .then(res => {
  
              setdatosapi(res.data);
        })
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
          render: (fila,row) =>  <>   <Button onClick={()=>showModal(row.ID_PROVEEDOR,row.NOMBRE_EMPRESA,row.TELEFONO) }  type="primary">Editar</Button> {" "} <Button type="primary"> Eliminar </Button> </>
        },
      ];




    return (
        <div>
          <ModalProveMod datos={datos}  showModal={showModal} estadoModal={estadoModal} handleCancel={handleCancel} getProveedor={getProveedor}></ModalProveMod>
           <Table dataSource={datosapi} columns={columns} style={{ marginBottom: 5, marginTop: 30 }} /> 
        </div>
    )
}

export default Tabla;
