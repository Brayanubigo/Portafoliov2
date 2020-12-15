import { Modal} from 'antd';
import React,{ useEffect,useState} from 'react'
import { Form, Input, InputNumber, Button, Select,DatePicker } from 'antd';
import axios from 'axios';


function ModalRegristoReser(objeto) {
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
    

  const [form] = Form.useForm();

  const onReset = () => {
    form.resetFields();
  };

    

  
  
  const onFinish = async (data) => { 
      axios.post('http://localhost:4000/agregarUsuarioCliente', data)
      .then(response => {
        console.log(data);
        console.log(response);  
        
      })
      onReset();
      setmodalAgre( false );
      
     
    }
   
      
  
   

    const dateFormat = 'DD/MM/YYYY';
    const { Option } = Select;
   
   

   


    const  [modalAgre, setmodalAgre]= useState(false);    

      const showModal = () => {
        setmodalAgre(
           true,
        );
      };
    
      const handleCancel = () => {
        setmodalAgre( false );
      };
    
      
    
      const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
      };


      const layout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 16 },
      };
     
      const tailLayout = {
        wrapperCol: { offset: 13, span: 16 },
      };

      const validateMessages = {
        required: '${label} es Requerido!',
        types: {
          email: '${label} is not a valid email!',
          number: '${label} is not a valid number!',
          Select: '${label} is not a valid number!'
        },
      };

    return (
        <>
              <a type="primary" onClick={showModal}>
         Registrate
        </a>
        <Modal
          visible={modalAgre}
          onCancel={handleCancel}
         
          title="Agregar Usuario"
          footer={[
          ]}
        >
        <Form {...layout} onFinish={onFinish}  form={form} validateMessages={validateMessages}>
        <Form.Item label="Rut" name="RUT" rules={[{ required: true }]}>
        <InputNumber style={{ width: '100%' }} maxLength="8" />
        </Form.Item >
        <Form.Item  label="Digito Verificador" name="DV" rules={[{ required: true }]}>
        <Input  maxLength="1" style={{ width: '10%' }} />
        </Form.Item >
      
        <Form.Item  label="Nombre" name="NOMBRE" rules={[{ required: true }]}>
        <Input />
        </Form.Item >

        <Form.Item  label="Apellido" name="APELLIDO" rules={[{ required: true }]}>
        <Input />
        </Form.Item >
        
        <Form.Item  label="Correo" name="CORREO" rules={[{ type: 'email', required: true }]}>
        <Input />
        </Form.Item >

        <Form.Item  label="Domicilio" name="DOMICILIO" rules={[{ required: true }]}>
        <Input />
        </Form.Item >

        <Form.Item  label="Telefono" name="TELEFONO" rules={[{ required: true}]}>
        <InputNumber style={{ width: '100%' }} maxLength="9" />
        </Form.Item >

        <Form.Item  label="Password" name="PASSWORD" rules={[{ required: true }]}>
        <Input.Password  />
        </Form.Item >

          
        <Form.Item  label="Fecha de nacimiento" name="FECHA_NAC" rules={[{ required: true}]}>
        <DatePicker  format={dateFormat} />
        </Form.Item >
     
      
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

export default ModalRegristoReser;
