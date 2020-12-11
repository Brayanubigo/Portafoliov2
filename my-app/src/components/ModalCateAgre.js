import { Modal} from 'antd';
import React,{ useEffect,useState, useRef} from 'react'
import { Form, Input, InputNumber, Button, Select } from 'antd';
import axios from 'axios';
import TablaCat from '../GetTablas/TablaCategoria'
function ModalaCateAgre(objeto) {
  const { TextArea } = Input;


 
    const onFinish = async (data) => { 
      axios.post('http://localhost:4000/agregarCategoria', data)
      .then(response => {
        console.log(data);
        console.log(response);  
        
      })
      objeto.getCategoria();
      setmodalAgre( false );  
      
    }
   
      
  
    const [form] = Form.useForm();
    const { Option } = Select;

    

    const  [modalAgre, setmodalAgre]= useState(false);    

      const showModal = () => {
        setmodalAgre(
           true,
        );
      };
    
  
    
      const handleCancel = () => {
        form.resetFields();
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
         Agregar Categoria
        </Button>
        <Modal
          visible={modalAgre}
          title="Agregar Categoria"
          footer={[
          ]}
        >
        <Form {...layout} form={form} onFinish={onFinish}>
        <Form.Item label="Nombre Categoria" name="NOMBRE_CATEGORIA">
        <Input  ></Input>
        </Form.Item >
        <Form.Item  label="Descripcion" name="DESCRIPCION">
        <TextArea  ></TextArea>
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
