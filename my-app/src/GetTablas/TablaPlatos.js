import React,{ useEffect,useState} from 'react'
import axios from 'axios';
import { Table, Button  } from 'antd';
import ModalPlatoMod from '../components/ModalPlatoMod'
function Tabla() {
    useEffect(()=>{
        getCategoria();
      },[]);
      
const [datosapi, setdatosapi]= useState([]);
   
      const getCategoria = () =>{
          axios.get(`http://localhost:4000/obtenerPlato`)
        .then(res => {
  
              setdatosapi(res.data);
        })
      }

      const  [estadoModal,setEstadoModal]= useState(false);    
    
      const [datos , setdatos] = useState([])
     
      const showModal = (ID_PLATO,NOMBRE,PRECIO,DESCRIPCION,NOMBRE_CATEGORIA,STOCK_PLATO,ESTADO) => {
        setEstadoModal(
           true,
        );
        setdatos({ID_PLATO,NOMBRE,PRECIO,DESCRIPCION,NOMBRE_CATEGORIA,STOCK_PLATO,ESTADO})
        
        // console.log("datos"+ datitos, datito2,datito3);
        // console.log("presionado")
       
      };
    
      const handleCancel = () => {
        setEstadoModal( false );
      };
     
      const columns = [
        {
            title: 'ID',
            dataIndex: 'ID_PLATO',
            key: 'ID_PLATO',
          },
        {
          title: 'Nombre Plato',
          dataIndex: 'NOMBRE',
          key: 'ID_PLATO',
        }, 
        {
          title: 'Precio ',
          dataIndex: 'PRECIO',
          key: 'ID_PLATO',
        },
        {
          title: 'Descripcion',
          dataIndex: 'DESCRIPCION',
          key: 'ID_PLATO',
        },
        {
            title: 'Categoria',
            dataIndex: 'NOMBRE_CATEGORIA',
            key: 'NOMBRE_CATEGORIA',
          },
        {
          title: 'Stock',
          dataIndex: 'STOCK_PLATO',
          key: 'ID_PLATO',
        },
        {
            title: 'Estado',
            dataIndex: 'ESTADO',
            key: 'ID_PLATO',
          }, 
          {
            title: 'Accion',
            dataIndex: 'accion',
            key: 'accion',
            render: (fila,row) =>  <>   <Button onClick={()=>showModal(row.ID_PLATO,row.NOMBRE,row.PRECIO,row.DESCRIPCION,row.NOMBRE_CATEGORIA,row.STOCK_PLATO,row.ESTADO) }  type="primary">Editar</Button> {" "} <Button type="primary"> Eliminar </Button> </>
          }
      ];




    return (
        <div>
              <ModalPlatoMod datos={datos}  showModal={showModal} estadoModal={estadoModal} handleCancel={handleCancel}></ModalPlatoMod>
           <Table dataSource={datosapi} columns={columns} style={{ marginBottom: 5, marginTop: 30 }} /> 
        </div>
    )
}

export default Tabla;
