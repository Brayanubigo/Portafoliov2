import React, { useState } from 'react';
import { Modal, Button , DatePicker, Space,Form, Input, Layout,Image} from 'antd';
import moment from 'moment';
import Cookie from 'universal-cookie';
import swal from 'sweetalert';
import axios from 'axios';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import ModalRegristoReser from './ModalRegistroReser'
const cookies = new Cookie();
const { RangePicker } = DatePicker;

function ModalReservaAgre() {
    const [isModalVisible, setIsModalVisible] = useState(false)
    const showModal = () => {
      
       
        setIsModalVisible(true);
      };
    
      const handleOk = () => {
        setIsModalVisible(false);
      };
    
      const handleCancel = () => {
        setIsModalVisible(false);
      };

      const dateFormat = 'DD/MM/YYYY';

      const layout = {
        labelCol: { span: 20 },
        wrapperCol: { span: 20 },
       
      };

      const iniciarSesion = async(data)=>{
        console.log('Login');
    
        axios.post('http://localhost:4000/obtenerSesion', data)
        .then(response => {
          console.log(response.data);  
          var x  = response.data.p_existe
          var nombre= response.data.p_nombre
          var apellido= response.data.p_apellido
          var rol = response.data.p_rol
          if(x > 0 && rol == 4){
  
            cookies.set('id',response.data.p_existe, {path: "/"});
            cookies.set('nombre',response.data.p_nombre, {path: "/"});
            cookies.set('apellido',response.data.p_apellido, {path: "/"});
             cookies.set('rol',response.data.p_rol, {path: "/"});
            console.log(response.data+nombre+apellido+rol);
            swal({
              title: "¡Bienvenido!",
              text: `Bienvenido ${nombre} ${apellido}`,
              icon: "success"
            });
            window.location.href="./ClienteL";
        } else{
          
          swal({
            title: "Error",
            text: "Usuario o contraseña no son correctas",
            icon: "error",
            button: "Ok",
          });
          
        }
          
        })
        .catch(err => console.warn(err));
    }

    return (
        <>
        <Button type="primary" onClick={showModal}>
          RESERVAR
        </Button>
        <Modal
          title="RESERVAR"
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={[
          ]}
        >

<Form
         {...layout}
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={iniciarSesion}  
      style={{ borderBlock:'1px'}}
      
    >
     
     <Form.Item
        name="RUT"
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="RUT ej:12345678" />
      </Form.Item>
      <Form.Item
        name="PASSWORD"
    
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Contraseña"
          rules={[{ required: true, message: 'Por favor, Ingrese una contraseña!' }]}
        />
      </Form.Item>
     

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Ingresar
        </Button>
        <Button type="back" style={{ marginLeft:'5px'}} htmlType="submit" className="login-form-button" onClick={handleCancel}>
          Cancelar
        </Button>
      </Form.Item>
     
      <span style={{  justifyContent: 'center'}}> ¿No tienes una cuenta? <ModalRegristoReser/>

 </span>



    </Form>
    

          {/* <RangePicker
      defaultValue={[moment('01/01/2020', dateFormat), moment('02/01/2020', dateFormat)]}
      format={dateFormat}
    /> */}
        </Modal>
      </>
  
    )
}

export default ModalReservaAgre
