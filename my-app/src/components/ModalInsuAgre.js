import { Modal} from 'antd';
import React,{ useEffect,useState} from 'react'
import { Form, Input, InputNumber, Button, Select,DatePicker, notification  } from 'antd';
import axios from 'axios';
import moment from 'moment';

function ModalaInsuAgre(objeto) {
    useEffect(()=>{
        getProveedor();
            },[]);

    const [datospro, setdatospro]= useState([]);
     
    const getProveedor = () =>{
        axios.get(`http://localhost:4000/obtenerProveedor`)
      .then(res => {

        setdatospro(res.data);
        
      })
    
    }
    
    

    const onFinish = async (data) => { 
 
      axios.post('http://localhost:4000/agregarInsumos', data)
      .then(response => {
        console.log(data);
        console.log(response);  
        
      })
      notification.open({
        message: 'Insumo Agregado',
        description:
          'Insumo Agregado Correctamente',
        onClick: () => {
          console.log('Notification Clicked!');
        },
      });
      objeto.getInsumo();
      setmodalAgre( false );

    }
   
      

    const dateFormat = 'DD/MM/YYYY';
    const [form] = Form.useForm();
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
          Agregar Inventario
        </Button>
        <Modal
          visible={modalAgre}
          title="Agregar Insumo"
          footer={[
          ]}
        >
        <Form {...layout} form={form} onFinish={onFinish}>
        <Form.Item label="Nombre Insumo" name="NOMBRE">
        <Input  ></Input>
        </Form.Item >
        <Form.Item  label="Descripcion" name="DESCRIPCION">
        <Input  ></Input>
        </Form.Item >
        <Form.Item  label="Fecha Vencimiento" name="FECHA_VENCIMIENTO">
        <DatePicker format={dateFormat} />
        </Form.Item >
        <Form.Item  label="Fecha Recepcion" name="FECHA_RECEPCION">
        <DatePicker  format={dateFormat} />
        </Form.Item >
        <Form.Item  label="Stock" name="STOCK">
        <InputNumber />
        </Form.Item >
        
        <Form.Item name="PROVEEDOR_ID_PROVEEDOR" label="Proveedor" rules={[{ required: true }]}  >
          
            
          <Select
            placeholder="Seleccione un Proveedor" 
            allowClear
           
          >
                {
            datospro.map((elemento,i) =>(
             
                <Option key={elemento.ID_PROVEEDOR} 
                value={elemento.ID_PROVEEDOR}>
                  {elemento.NOMBRE_EMPRESA}
                </Option>
            
      
            ))
        }
          </Select>
        </Form.Item>
       
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

export default ModalaInsuAgre;
