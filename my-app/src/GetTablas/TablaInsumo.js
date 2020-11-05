import React,{ useEffect,useState} from 'react'
import axios from 'axios';
import { Table, Button} from 'antd';
import ModalInsuMod from '../components/ModalInsuMod'
function Tabla() {
    useEffect(()=>{
        getInsumo();
      },[]);
      
const [datosapi, setdatosapi]= useState([]);
   
      const getInsumo = () =>{
          axios.get(`http://localhost:4000/obtenerInsumos`)
        .then(res => {
  
              setdatosapi(res.data);
        })
      }

      const  [estadoModal,setEstadoModal]= useState(false);    
    
      const [datos , setdatos] = useState([])
     
      const showModal = (ID_INSUMO,NOMBRE,DESCRIPCION,FECHA_VENCIMIENTO,FECHA_RECEPCION,CANT_RECEP,CANT_OCUPADO,NOMBRE_EMPRESA,ESTADO) => {
        setEstadoModal(
           true,
        );
        setdatos({ID_INSUMO,NOMBRE,DESCRIPCION,FECHA_VENCIMIENTO,FECHA_RECEPCION,CANT_RECEP,CANT_OCUPADO,NOMBRE_EMPRESA,ESTADO})
        

       
      };
      

        
      const handleCancel = () => {
        setEstadoModal( false );
      };
      
      const columns = [
        {
            title: 'ID',
            dataIndex: 'ID_INSUMO',
            key: 'ID_INSUMO',
          },
        {
          title: 'Nombre',
          dataIndex: 'NOMBRE',
          key: 'NOMBRE',
        },
        {
          title: 'Descripcion',
          dataIndex: 'DESCRIPCION',
          key: 'DESCRIPCION',
        },
        {
          title: 'Fecha Vencimiento',
          dataIndex: 'FECHA_VENCIMIENTO',
          key: 'FECHA_VENCIMIENTO',
        },
        {
            title: 'Fecha Recepcion',
            dataIndex: 'FECHA_RECEPCION',
            key: 'FECHA_RECEPCION',
          },
          {
            title: 'Cantidad Recepcion',
            dataIndex: 'CANT_RECEP',
            key: 'CANT_RECEP',
          },
          {
            title: 'Cantidad Ocupado',
            dataIndex: 'CANT_OCUPADO',
            key: 'CANT_OCUPADO',
          },
          {
            title: 'Proveedor',
            dataIndex: 'NOMBRE_EMPRESA',
            key: 'NOMBRE_EMPRESA',
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
            render: (fila,row) =>  <>   <Button onClick={()=>showModal(row.ID_INSUMO,row.NOMBRE,row.DESCRIPCION,row.FECHA_VENCIMIENTO,row.FECHA_RECEPCION,row.CANT_RECEP,row.CANT_OCUPADO,row.NOMBRE_EMPRESA,row.ESTADO) }  type="primary">Editar</Button> {" "} <Button type="primary"> Eliminar </Button> </>
          },
      ];




    return (
        <div>
           <ModalInsuMod datos={datos}  showModal={showModal} estadoModal={estadoModal} handleCancel={handleCancel} getInsumo={getInsumo}></ModalInsuMod>
           <Table dataSource={datosapi} columns={columns} style={{ marginBottom: 5, marginTop: 30 }} /> 
        </div>
    )
}

export default Tabla;
