import { Modal} from 'antd';
import React,{ useEffect,useState, useRef} from 'react'
import { Form, Input, InputNumber, Button, Select } from 'antd';
import axios from 'axios';
import TablaCat from '../GetTablas/TablaCategoria'
function ModalaCateAgre() {
  const { TextArea } = Input;

  // const getCate = (props) =>{
  //   props.getCategoria
  // }

  

    const onFinish = async (data) => { 
   
     
      axios.post('http://localhost:4000/agregarProveedor', data)
      .then(response => {
        console.log(data);
        console.log(response);  
        
      })
      setmodalAgre( false );  
    
    }
   
      
  
    const [form] = Form.useForm();
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
         Agregar Proveedor
        </Button>
        <Modal
          visible={modalAgre}
          title="Agregar Proveedor"
          footer={[
          ]}
        >
        <Form {...layout} form={form} onFinish={onFinish}>
        <Form.Item label="Nombre Proveedor" name="NOMBRE_EMPRESA">
        <Input  ></Input>
        </Form.Item >
        <Form.Item  label="Telefono" name="TELEFONO">
        <InputNumber />
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

export default ModalaCateAgre;
