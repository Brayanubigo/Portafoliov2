import React,{ useEffect,useState} from 'react'
import axios from 'axios';
import { Table, Button  , notification} from 'antd';
import ModalPlatoMod from '../components/ModalPlatoMod'
import ModalPlatoAgre from '../components/ModalPlatoAgre';
import swal from 'sweetalert';
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

      const eliminarButton = (NUM_USUARIO) =>{
        console.log(NUM_USUARIO);
       
        swal({
          title: "¿Estas seguro que desea eliminar?",
          text: "Si eliminas solo cambiaras el estado, y este no podra acceder al sistema, ¿Estas seguro?",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        })
        .then((willDelete) => {
          if (willDelete) {
            axios.post('http://localhost:4000/eliminarUsuario', {"id":NUM_USUARIO})
        .then(response => {
            console.log(response);
            notification.open({
              message: 'Plato Eliminado',
              description:
                'Plato Eliminado Correctamente',
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



     
      const columns = [
        {
            title: 'ID',
            dataIndex: 'ID_PLATO',
            key: 'ID_PLATO',
            fixed: 'left',
            width: 50,
          },
        {
          title: 'Nombre Plato',
          dataIndex: 'NOMBRE',
          key: 'NOMBRE',
          fixed: 'left',
          width: 100,
        }, 
        {
          title: 'Precio ',
          dataIndex: 'PRECIO',
          key: 'PRECIO',
          fixed: 'left',
          width: 100,
        },
        {
          title: 'Descripcion',
          dataIndex: 'DESCRIPCION',
          key: 'DESCRIPCION',
        },
        {
            title: 'Categoria',
            dataIndex: 'NOMBRE_CATEGORIA',
            key: 'NOMBRE_CATEGORIA',
          },
        {
          title: 'Stock',
          dataIndex: 'STOCK_PLATO',
          key: 'STOCK_PLATO',
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
            render: (fila,row) =>  <>   <Button onClick={()=>showModal(row.ID_PLATO,row.NOMBRE,row.PRECIO,row.DESCRIPCION,row.NOMBRE_CATEGORIA,row.STOCK_PLATO,row.ESTADO) }  type="primary">Editar</Button> {" "} <Button type="danger" onClick={()=>eliminarButton(row.NUM_USUARIO)}> Eliminar </Button> </>
          }
      ];




    return (
        <div>
             <ModalPlatoAgre/>
              <ModalPlatoMod datos={datos}  getCategoria={getCategoria} showModal={showModal} estadoModal={estadoModal} handleCancel={handleCancel}></ModalPlatoMod>
           <Table dataSource={datosapi} columns={columns} style={{ marginBottom: 5, marginTop: 30 }} scroll={{ x: 1500, y: 500 }}/> 
        </div>
    )
}

export default Tabla;
