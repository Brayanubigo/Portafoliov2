import { Modal} from 'antd';
import React,{ useEffect,useState, useRef} from 'react'
import { Form, Input, InputNumber, Button, Select , notification } from 'antd';
import axios from 'axios';
import TablaCat from '../GetTablas/TablaCategoria'
function ModalaCateAgre(objeto) {
  const { TextArea } = Input;


  const [form] = Form.useForm();

  const onReset = () => {
    form.resetFields();
  };
  



  
  const onFinish = async (data) => { 
 
    axios.post('http://localhost:4000/agregarMesa', data)
    .then(response => {
      console.log(data);
      console.log(response);  
      
    })
    notification.open({
      message: 'Mesa Agregada',
      description:
        'Mesa Agregado Correctamente',
      onClick: () => {
        console.log('Notification Clicked!');
      },
    });
    onReset();
    objeto.getMesa();
    setmodalAgre( false );
    
   
  }
   
   
  
  
    const { Option } = Select;




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
              Mesa
        </Button>
        <Modal
          visible={modalAgre}
          title="Agregar Mesa"
          footer={[
          ]}
        >
        <Form {...layout} form={form} onFinish={onFinish}>
        <Form.Item label="Cantidad de persona" name="CANT_PERSONAS">
        <InputNumber style={{ width: '100%' }} maxLength="9" />
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
