import { Modal} from 'antd';
import React,{ useEffect,useState, useRef} from 'react'
import { Form, Input, InputNumber, Button, Select } from 'antd';
import axios from 'axios';
import TablaCat from '../GetTablas/TablaCategoria'

function ModalaCateModi(objeto) {
  
const onFinish = async (data) => { 
        
      axios.post('http://localhost:4000/updateCategoria', data)
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
          title="Editar Categoria"
          
          footer={[

          ]}
        >
        <Form {...layout} onFinish={onFinish} initialValues={{ID_CATEGORIA: objeto.datos.ID_CATEGORIA,NOMBRE_CATEGORIA: objeto.datos.NOMBRE_CATEGORIA,DESCRIPCION:objeto.datos.DESCRIPCION,ESTADO:objeto.datos.ESTADO }}>
        <Form.Item label="ID" name="ID_CATEGORIA"  >
        <Input disabled />
          </Form.Item >
        <Form.Item label="Nombre Categoria" name="NOMBRE_CATEGORIA"  >
        <Input />
        </Form.Item >
        <Form.Item  label="Descripcion" name="DESCRIPCION">
        <TextArea></TextArea>
        </Form.Item >
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
