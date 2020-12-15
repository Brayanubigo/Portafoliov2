import React,{ useEffect,useState} from 'react'
import axios from 'axios';
import { Table, Button, notification} from 'antd';
import ModalProveMod from '../components/ModalProveMod';
import ModalmesaAgre from '../components/ModalMesaAgre';
import swal from 'sweetalert';
function Tabla() {
  const [fetched, setFetched] = useState(false);
  useEffect(()=>{
    const ac = new AbortController();     
    Promise.all([
        getMesa()
      ]).then(() => setFetched(true)) },[]);
      
const [datosapi, setdatosapi]= useState([]);
   
      const getMesa = () =>{
          axios.get(`http://localhost:4000/obtenerMesa`)
        .then(res => {
  
              setdatosapi(res.data);
        })
        .catch(err => console.warn(err));
      }


     
      const  [estadoModal,setEstadoModal]= useState(false);    
    
      const [datos , setdatos] = useState([])
     
      const showModal = (NUM_MESA,CANT_PERSONAS,ESTADO,ONLINE,INVITADO_NUM_INVITADO) => {
        setEstadoModal(
           true,
        );
        setdatos({NUM_MESA,CANT_PERSONAS,ESTADO,ONLINE,INVITADO_NUM_INVITADO})
        

       
      };
    
      const handleCancel = () => {
        setEstadoModal( false );
      };
     
      const eliminarButton = (NUM_MESA) =>{
        console.log(NUM_MESA);
       
        swal({
          title: "¿Estas seguro que desea eliminar?",
          text: "Si eliminas solo cambiaras el estado, y este no podra acceder al sistema, ¿Estas seguro?",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        })
        .then((willDelete) => {
          if (willDelete) {
            axios.post('http://localhost:4000/eliminarMesa', {"id":NUM_MESA})
        .then(response => {
            console.log(response);
            notification.open({
              message: 'Mesa Eliminado',
              description:
                'Mesa Eliminado Correctamente',
              onClick: () => {
                console.log('Notification Clicked!');
              },
            });  
            getMesa();
        })
        .catch(err => console.warn(err));
    
          } 
        });
       
      }


      
      const columns = [
        {
            title: 'ID',
            dataIndex: 'NUM_MESA',
            key: 'NUM_MESA',
          },
        {
          title: 'Cantidad de personas',
          dataIndex: 'CANT_PERSONAS',
          key: 'CANT_PERSONAS',
          width: 300,
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
          render: (fila,row) =>  <>   <Button onClick={()=>showModal(row.NUM_MESA,row.CANT_PERSONAS,row.ESTADO) }  type="primary">Editar</Button> {" "} <Button type="danger" onClick={()=>eliminarButton(row.NUM_MESA)}> Eliminar </Button> </>
        },
      ];


    return (
        <div>
          <ModalmesaAgre getMesa={getMesa}/>
          <ModalProveMod datos={datos}  showModal={showModal} estadoModal={estadoModal} handleCancel={handleCancel} getMesa={getMesa}></ModalProveMod>
           <Table dataSource={datosapi} columns={columns} style={{ marginBottom: 5, marginTop: 30 }} /> 
        </div>
    )
}

export default Tabla;


