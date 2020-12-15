import React,{ useEffect,useState} from 'react'
import axios from 'axios';
import { Table, Button} from 'antd';
import ModalInsuMod from '../components/ModalInsuMod';
import ModalInsuAgre from '../components/ModalInsuAgre';
import moment from 'moment'
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
     
      const showModal = (ID_INSUMO,NOMBRE,DESCRIPCION,FECHA_VENCIMIENTO,FECHA_RECEPCION,STOCK,NOMBRE_EMPRESA,ESTADO) => {
        setEstadoModal(
           true,
        );
        const fecharec = moment(FECHA_RECEPCION).format("DD/MM/YYYY");
        const fechaven = moment(FECHA_VENCIMIENTO).format("DD/MM/YYYY");
        setdatos({ID_INSUMO,NOMBRE,DESCRIPCION,fechaven,fecharec,STOCK,NOMBRE_EMPRESA,ESTADO})
        

       
      };
      

      const handleCancel = () => {
        setEstadoModal( false );
      };
      
      const columns = [
        {
            title: 'ID',
            dataIndex: 'ID_INSUMO',
            key: 'ID_INSUMO',
            fixed: 'left',
            width: 50,
          },
        {
          title: 'Nombre',
          dataIndex: 'NOMBRE',
          key: 'NOMBRE',
          fixed: 'left',
          width: 100,
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
          render:(text)=>moment(text).format('DD/MM/YY'),
        },
        {
            title: 'Fecha Recepcion',
            dataIndex: 'FECHA_RECEPCION',
            key: 'FECHA_RECEPCION',
            render:(text)=>moment(text).format('DD/MM/YY'),
          },
          {
            title: 'Stock',
            dataIndex: 'STOCK',
            key: 'STOCK',
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
            fixed: 'right',
            render: (fila,row) =>  <>   <Button onClick={()=>showModal(row.ID_INSUMO,row.NOMBRE,row.DESCRIPCION,row.FECHA_VENCIMIENTO,row.FECHA_RECEPCION,row.STOCK,row.NOMBRE_EMPRESA,row.ESTADO) }  type="primary">Editar</Button> {" "} <Button type="danger"> Eliminar </Button> </>
          },
      ];




    return (
        <div>
          <ModalInsuAgre getInsumo={getInsumo}/>
           <ModalInsuMod datos={datos}  showModal={showModal} estadoModal={estadoModal} handleCancel={handleCancel} getInsumo={getInsumo}></ModalInsuMod>
           <Table dataSource={datosapi} columns={columns} style={{ marginBottom: 5, marginTop: 30 }}  scroll={{ x: 1500, y: 500 }} /> 
        </div>
    )
}

export default Tabla;
