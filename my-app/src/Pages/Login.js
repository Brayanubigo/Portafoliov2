import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Cookie from 'universal-cookie';
import { Form, Input, Button,Layout,Image} from 'antd';
import Footer from '../Layouts/Footer';
import swal from 'sweetalert';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import logo from '../img/asd.png';
import fondo from '../img/1234.jpg';
const { Header,  Content } = Layout;
const cookies = new Cookie();
function Login() {
  useEffect(()=>{
    componentDidMount();
},[]);
 


    const iniciarSesion = async(data)=>{
      console.log('Login');
  
      axios.post('http://localhost:4000/obtenerSesion', data)
      .then(response => {
        console.log(response.data);  
        var x  = response.data.p_existe
        var nombre= response.data.p_nombre
        var apellido= response.data.p_apellido
        var rol = response.data.p_rol
        if(x > 0 && rol == 1){

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
          window.location.href="./Inicio";
      } else if(x > 0 && rol==2){
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
        window.location.href="./Cocina";
      }else if(x > 0 && rol==3){
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
        window.location.href="./Bodega";
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
 
  const componentDidMount = ()=>{
    if(cookies.get('id')){
      window.location.href="./Inicio";
    } 
}

const layout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

    return (
   
    

      <Layout style={{ textAlign: 'center', margin: 'auto' ,backgroundColor: 'white', backgroundImage:"url(" + fondo + ")" ,backgroundSize:'cover', overflow:'hidden'}}>
     
       <Content style={{ textAlign: 'center', margin: 'auto', marginTop:'30px' , width:'300px', 
       minHeight:'84.8vh'}}>
  
       <Image
      width={300}
      style={{ textAlign: 'center', marginBottom: '10px' }}
      src={logo}
    />
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
        rules={[{ required: true, message: 'Por favor, Ingrese un RUT!' }]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="RUT ej:12345678" />
      </Form.Item>
      <Form.Item
        name="PASSWORD"
        rules={[{ required: true, message: 'Por favor, Ingrese una contraseña!' }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Contraseña"
        />
      </Form.Item>
     

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Ingresar
        </Button>
      </Form.Item>
    </Form>
    

    </Content>
    <Footer/>

     
     
      
   

    </Layout>
    );
}

export default Login;














