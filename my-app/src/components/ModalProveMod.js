import { Modal} from 'antd';
import React,{ useEffect,useState, useRef} from 'react'
import { Form, Input, InputNumber, Button, Select } from 'antd';
import axios from 'axios';
import TablaCat from '../GetTablas/TablaCategoria'

function ModalaCateModi(objeto) {
  

const onFinish = async (data) => { 
        
      axios.post('http://localhost:4000/updateProveedor', data)
      .then(response => {
        console.log(data);
        console.log(response);  
       
      })
      
    }
   
    const { TextArea } = Input;
    const { Option } = Select;
    const [form] = Form.useForm();

    
    

      const layout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 16 },
      };
     
      const tailLayout = {
        wrapperCol: { offset: 13, span: 16 },
      };



    return (
        <>
          
        <Modal
          visible={objeto.estadoModal}
          title="Editar Proveedor"
          
          footer={[

          ]}
        >
        <Form {...layout} onFinish={onFinish} initialValues={{ID_PROVEEDOR: objeto.datos.ID_PROVEEDOR,NOMBRE_EMPRESA: objeto.datos.NOMBRE_EMPRESA,TELEFONO:objeto.datos.TELEFONO }}>
        <Form.Item label="ID" name="ID_PROVEEDOR"  >
        <Input disabled />
          </Form.Item >
          <Form.Item label="Nombre Proveedor" name="NOMBRE_EMPRESA">
        <Input  ></Input>
        </Form.Item >
        <Form.Item  label="Telefono" name="TELEFONO">
        <InputNumber />
        </Form.Item >
        <Form.Item {...tailLayout} >
      
           <Button type="back" htmlType="button" onClick={objeto.handleCancel} >
            Cancelar
           </Button>


           <Button type="primary" htmlType="submit" style={{ marginLeft: 10}} onClick={objeto.handleCancel}>
            Enviar
           </Button>
         </Form.Item>

      
       
       
             </Form>
             
        </Modal>
        </>
    )
}

export default ModalaCateModi;
