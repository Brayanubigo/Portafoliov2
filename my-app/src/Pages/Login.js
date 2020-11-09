import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Cookie from 'universal-cookie';
import { Form, Input, Button,Layout } from 'antd';

const { Header, Footer, Content } = Layout;
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
      
        if(x > 0){

          cookies.set('id',response.data.p_existe, {path: "/"});
          cookies.set('nombre',response.data.p_nombre, {path: "/"});
          cookies.set('apellido',response.data.p_apellido, {path: "/"});
          console.log(response.data+nombre+apellido);
          alert(`Bienvenido ${nombre} ${apellido}`);
          window.location.href="./Inicio";
      }else{
        
        alert('El usuario o la contraseña no son correctos')
        
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
  labelCol: { span: 8 },
  wrapperCol: { span: 10 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const onFinish = values => {
  console.log('Success:', values);
};
    return (
   
    

        <>
          <Layout>
      <Header></Header>
      <Content span={24} style={{ height: 660 }}>
        <Form
      {...layout}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={iniciarSesion}
      style={{ marginTop: '150px' }}
    >
      <Form.Item
        label="Rut"
        name="RUT"
        rules={[{ required: true, message: 'Ingresa un Rut!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="PASSWORD"
        rules={[{ required: true, message: 'Ingresa una contraseña!' }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
         Entrar
        </Button>
      </Form.Item>
    </Form>
    </Content>

    </Layout>
     
      {/* <button type="button" class="btn btn-primary" onClick={()=>iniciarSesion()}>Login</button> */}
      
   

        </>
    )
}

export default Login;














