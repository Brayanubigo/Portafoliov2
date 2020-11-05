import React,{ useEffect,useState} from 'react'
import axios from 'axios';
import { Table,Button} from 'antd';
import ModalUsuMod from '../components/ModalUsuMod';
function Tabla() {
    useEffect(()=>{
        getCategoria();
      },[]);
      
const [datosapi, setdatosapi]= useState([]);
   
      const getCategoria = () =>{
          axios.get(`http://localhost:4000/obtenerUsuario`)
        .then(res => {
  
              setdatosapi(res.data);
        })
      }

      const  [estadoModal,setEstadoModal]= useState(false);    
    
      const [datos , setdatos] = useState([])
     
      const showModal = (NUM_USUARIO,RUT,DV,NOMBRE,APELLIDO,FECHA_NAC,CORREO,TELEFONO,DOMICILIO,NOMBRE_ROL,ESTADO) => {
        setEstadoModal(
           true,
        );
        setdatos({NUM_USUARIO,RUT,DV,NOMBRE,APELLIDO,FECHA_NAC,CORREO,TELEFONO,DOMICILIO,NOMBRE_ROL,ESTADO})
        

       
      };
      

        
      const handleCancel = () => {
        setEstadoModal( false );
      };
     

      const columns = [
        {
            title: 'ID',
            dataIndex: 'NUM_USUARIO',
            key: 'NUM_USUARIO',
          },
        {
          title: 'Rut',
          dataIndex: 'RUT',
          key: 'RUT',
        },
        {
          title: 'Dig. Ver.',
          dataIndex: 'DV',
          key: 'DV',
        },
        {
          title: 'Nombre',
          dataIndex: 'NOMBRE',
          key: 'NOMBRE',
        },
        {
            title: 'Apellido',
            dataIndex: 'APELLIDO',
            key: 'APELLIDO',
          },
           {
            title: 'Fecha de nac.',
            dataIndex: 'FECHA_NAC',
            key: 'FECHA_NAC',
          },
          {
            title: 'Correo',
            dataIndex: 'CORREO',
            key: 'CORREO',
          },
          {
            title: 'Telefono',
            dataIndex: 'TELEFONO',
            key: 'TELEFONO',
          },  
          {
            title: 'Domicilio',
            dataIndex: 'DOMICILIO',
            key: 'DOMICILIO',
          },
          {
            title: 'Cargo',
            dataIndex: 'NOMBRE_ROL',
            key: 'NOMBRE_ROL',
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
            render: (fila,row) =>  <>   <Button onClick={()=>showModal(row.NUM_USUARIO,row.RUT,row.DV,row.NOMBRE,row.APELLIDO,row.FECHA_NAC,row.CORREO,row.TELEFONO,row.DOMICILIO,row.NOMBRE_ROL,row.ESTADO) }  type="primary">Editar</Button> {" "} <Button type="primary"> Eliminar </Button> </>
          },
      ];




    return (
        <div>
            <ModalUsuMod datos={datos}  showModal={showModal} estadoModal={estadoModal} handleCancel={handleCancel} getCategoria={getCategoria}></ModalUsuMod>
           <Table dataSource={datosapi} columns={columns} style={{ marginBottom: 5, marginTop: 30 }} /> 
        </div>
    )
}

export default Tabla;
