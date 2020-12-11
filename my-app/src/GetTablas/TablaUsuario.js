import React,{ useEffect,useState} from 'react'
import axios from 'axios';
import { Table,Button} from 'antd';
import ModalUsuMod from '../components/ModalUsuMod';
import moment from 'moment'
import ModalAgreUser from '../components/ModalUsuaAgre';
import swal from 'sweetalert';

function Tabla() {
    useEffect(()=>{
      getUsuario();
      },[]);
      
    

const [datosapi, setdatosapi]= useState([]);
   
      const getUsuario = () =>{
          axios.get(`http://localhost:4000/obtenerUsuario`)
        .then(res => {
            
              setdatosapi(res.data);
        })
      }


      const  [estadoModal,setEstadoModal]= useState(false);    
    
      const [datos , setdatos] = useState([])
     
      const showModalMod = (NUM_USUARIO,RUT,DV,NOMBRE,APELLIDO,FECHA_NAC,CORREO,TELEFONO,DOMICILIO,NOMBRE_ROL,ESTADO) => {
        setEstadoModal(
           true,
        );
        const fecha = moment(FECHA_NAC).format("DD/MM/YYYY");
        setdatos({NUM_USUARIO,RUT,DV,NOMBRE,APELLIDO, fecha ,CORREO,TELEFONO,DOMICILIO,NOMBRE_ROL,ESTADO})
        

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
            axios.post('http://localhost:4000/eliminarUsuario', NUM_USUARIO)
        .then(response => {
            console.log(response);
            
        })
        .catch(err => console.warn(err));
    
          } 
        });
       
      }


      const handleCancel = () => {
        setEstadoModal( false );
        getUsuario();
      };
     


      
      const columns = [
        {
            title: 'ID',
            dataIndex: 'NUM_USUARIO',
            key: 'NUM_USUARIO',
            fixed: 'left',
            width: 50,
          },
        {
          title: 'Rut',
          dataIndex: 'RUT',
          key: 'RUT',
          fixed: 'left',
          width: 100,
        },
        {
          title: 'D.V',
          dataIndex: 'DV',
          key: 'DV',
          fixed: 'left',
          width: 55,
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
            title: 'Fecha nac.',
            dataIndex:  'FECHA_NAC',
            key: 'FECHA_NAC',
            render:(text)=>moment(text).format('DD/MM/YY'),
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
            fixed: 'right',
            render: (fila,row) =>  <>   <Button onClick={()=>showModalMod(row.NUM_USUARIO,row.RUT,row.DV,row.NOMBRE,row.APELLIDO,row.FECHA_NAC,row.CORREO,row.TELEFONO,row.DOMICILIO,row.NOMBRE_ROL,row.ESTADO) }  type="primary">Editar</Button> {"   "} <Button type="danger" onClick={()=>eliminarButton(row.NUM_USUARIO)}> Eliminar </Button> </>
          },
      ];




    return (
        <div>
            <ModalAgreUser getUsuario={getUsuario}/>
            <ModalUsuMod datos={datos}  showModal={showModalMod} estadoModal={estadoModal} handleCancel={handleCancel} getUsuario={getUsuario}/>
           < Table dataSource={datosapi} columns={columns} style={{ marginBottom: 5, marginTop: 30 }}  scroll={{ x: 1500, y: 500 }}/> 
        </div>
    )
}

export default Tabla;
