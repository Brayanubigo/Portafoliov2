import { Modal} from 'antd';
import React,{ useEffect,useState} from 'react'
import { Form, Input, InputNumber, Button, Select,DatePicker } from 'antd';
import axios from 'axios';
import moment from 'moment';

function ModalaCateAgre() {
    useEffect(()=>{
      getRol();
            },[]);

    const [datosrol, setdatosrol]= useState([]);
     
    const getRol = () =>{
        axios.get(`http://localhost:4000/obtenerRol`)
      .then(res => {

        setdatosrol(res.data);
      })
    }
    


    const onFinish = async (data) => { 
 
      axios.post('http://localhost:4000/agregarUsuario', data)
      .then(response => {
        console.log(data);
        console.log(response);  
        
      })
      setmodalAgre( false );
    }
   
      
  
   

    const dateFormat = 'DD/MM/YYYY';
    const { Option } = Select;
   

    const [datoform, setdatoform]= useState({
        NOMBRE_CATEGORIA: '',
        DESCRIPCION: '',
        ESTADO: ''
    });


    const  [modalAgre, setmodalAgre]= useState(false);    

      const showModal = () => {
        setmodalAgre(
           true,
        );
      };
    
      const handleOk = () => {
        setmodalAgre( false );
      };
    
      const handleCancel = () => {
        setmodalAgre( false );
      };
    
    

      const layout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 16 },
      };
     
      const tailLayout = {
        wrapperCol: { offset: 13, span: 16 },
      };

    return (
        <>
              <Button type="primary" onClick={showModal}>
         Agregar Usuario
        </Button>
        <Modal
          visible={modalAgre}
          title="Agregar Usuario"
          footer={[
          ]}
        >
        <Form {...layout} onFinish={onFinish}>
        <Form.Item label="Rut" name="RUT">
        <InputNumber />
        </Form.Item >
        <Form.Item  label="Digito Verificador" name="DV">
        <InputNumber />
        </Form.Item >
      
        <Form.Item  label="Nombre" name="NOMBRE">
        <Input />
        </Form.Item >

        <Form.Item  label="Apellido" name="APELLIDO">
        <Input />
        </Form.Item >
        
        <Form.Item  label="Correo" name="CORREO" rules={[{ type: 'email' }]}>
        <Input />
        </Form.Item >

        <Form.Item  label="Domicilio" name="DOMICILIO">
        <Input />
        </Form.Item >

        <Form.Item  label="Telefono" name="TELEFONO">
        <InputNumber />
        </Form.Item >

        <Form.Item  label="Password" name="PASSWORD" rules={[{ required: true }]}>
        <Input.Password  />
        </Form.Item >

          
        <Form.Item  label="Fecha de nacimiento" name="FECHA_NAC">
        <DatePicker  format={dateFormat} />
        </Form.Item >
     
      
        <Form.Item name="ROL_USUARIO_ID_ROL" label="Cargo" rules={[{ required: true }]}  >
          
            
          <Select
            placeholder="Seleccione un Proveedor" 
            allowClear
           
          >
                {
            datosrol.map((elemento,i) =>(
             
                <Option key={elemento.ID_ROL} 
                value={elemento.ID_ROL}>
                  {elemento.NOMBRE_ROL}
                </Option>
            
      
            ))
        }
          </Select>
        </Form.Item>
       
        <Form.Item name="ESTADO" label="Estado" rules={[{ required: true }]}  >
          

            
          <Select
            placeholder="Seleccione un estado" 
            allowClear
           
          >
            <Option value="1">Activo</Option>
            <Option value="0">Inactivo</Option>
          </Select>
        </Form.Item>
        <Form.Item {...tailLayout} >
      
           <Button type="back" htmlType="button" onClick={handleCancel} >
            Cancelar
           </Button>

           <Button type="primary" htmlType="submit" style={{ marginLeft: 10}}>
            Enviar
           </Button>
         </Form.Item>

      
       
       
             </Form>
             
        </Modal>
        </>
    )
}

export default ModalaCateAgre;
