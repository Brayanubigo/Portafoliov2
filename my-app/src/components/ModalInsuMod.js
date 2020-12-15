import { Modal} from 'antd';
import React,{ useEffect,useState, useRef} from 'react'
import { Form, Input, InputNumber, Button, Select,DatePicker, notification  } from 'antd';
import axios from 'axios';
import TablaCat from '../GetTablas/TablaCategoria'

function ModalUsuMod(objeto) {
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
        
      axios.post('http://localhost:4000/updateInsumos', data)
      .then(response => {
        console.log(data);
        console.log(response);  
       
      })
      notification.open({
        message: 'Insumo Modificado',
        description:
          'Insumo Modificado Correctamente',
        onClick: () => {
          console.log('Notification Clicked!');
        },
      });
      
    }
   
    const { TextArea } = Input;
    const { Option } = Select;
    const [form] = Form.useForm();
    const dateFormat = 'DD/MM/YYYY';
    
    

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
          title="Editar Insumo"
          
          footer={[

          ]}
        >
        <Form {...layout} onFinish={onFinish} initialValues={{ID_INSUMO: objeto.datos.ID_INSUMO ,NOMBRE: objeto.datos.NOMBRE, DESCRIPCION: objeto.datos.DESCRIPCION,
     FECHA_VENCIMIENTO:objeto.datos.fechaven,FECHA_RECEPCION:objeto.datos.fecharec,STOCK:objeto.datos.STOCK,PROVEEDOR_ID_PROVEEDOR:objeto.datos.NOMBRE_EMPRESA,
     ESTADO:objeto.datos.ESTADO}}>
        <Form.Item label="ID" name="ID_INSUMO"  >
        <Input disabled />
          </Form.Item >
        
        <Form.Item  label="Nombre" name="NOMBRE">
        <Input />
        </Form.Item >

        <Form.Item  label="Descripcion" name="DESCRIPCION">
        <TextArea />
        </Form.Item >
        
        <Form.Item  label="Fecha vencimiento" name="FECHA_VENCIMIENTO">
        <Input />
        </Form.Item >

        <Form.Item  label="Fecha de recepcion" name="FECHA_RECEPCION">
        <Input />
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

export default ModalUsuMod;


// 