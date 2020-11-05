import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Cookie from 'universal-cookie';
import { Form, Input, Button, Checkbox } from 'antd';

const cookies = new Cookie();
function Login() {
//   useEffect(()=>{
//     componentDidMount();
// },[]);
    const [datologin, setdatologin]= useState({
        RUT: '',
        PASSWORD: '',
    });


    const handleChange = (event) => {
        setdatologin({
            ... datologin,
            [event.target.name]:event.target.value
            
        })
        console.log(datologin);
    }

    const iniciarSesion = (event)=>{
    
      console.log('Login');
  
      axios.post('http://localhost:4000/obtenerSesion', datologin)
      .then(response => {
        console.log(response.data);  
        var x  = response.data.p_existe
        if(x > 0){

          cookies.set('id',datologin.RUT, {path: "/"});
          console.log(response.data);
          alert('Bienvenido');
          window.location.href="./Inicio";
      }else{
        
        alert('El usuario o la contraseña no son correctos')
        
      }
       
      })
      .catch(err => console.warn(err));
  }
 
   const componentDidMount = ()=>{
  if(cookies.get('id')){
    window.location.href="../components/Navbar";
  }
}

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const onFinish = values => {
  console.log('Success:', values);
};
    return (
   


        <div>
     <Form
      {...layout}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
      {/* <button type="button" class="btn btn-primary" onClick={()=>iniciarSesion()}>Login</button> */}
      
   

        </div>
    )
}

export default Login;














