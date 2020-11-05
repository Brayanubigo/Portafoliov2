import { Modal} from 'antd';
import React,{ useEffect,useState, useRef} from 'react'
import { Form, Input, InputNumber, Button, Select } from 'antd';
import axios from 'axios';
import TablaCat from '../GetTablas/TablaCategoria'

function ModalaPlatoModi(objeto) {
    useEffect(()=>{
        getCat();
       },[]);
   
       const [datoscat, setdatoscat]= useState([]);
       
       const getCat = () =>{
           axios.get(`http://localhost:4000/obtenerCatPlato`)
         .then(res => {
   
            setdatoscat(res.data);
         })
       };

const onFinish = async (data) => { 
        
      axios.post('http://localhost:4000/updatePlato', data)
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
          title="Editar Plato"
          
          footer={[

          ]}
        >
       <Form {...layout} form={form} onFinish={onFinish} initialValues={{ID_PLATO: objeto.datos.ID_PLATO,NOMBRE: objeto.datos.NOMBRE,DESCRIPCION:objeto.datos.DESCRIPCION,PRECIO:objeto.datos.PRECIO,CATEGORIA_ID_CATEGORIA:objeto.datos.ID_CATEGORIA,STOCK_PLATO:objeto.datos.STOCK_PLATO,ESTADO:objeto.datos.ESTADO }}>
       <Form.Item label="ID" name="ID_PLATO"  >
        <Input disabled />
          </Form.Item >
        <Form.Item label="Nombre de plato" name="NOMBRE" rules={[{ required: true }]}>
        <Input  ></Input>
        </Form.Item >
        <Form.Item label="Descripcion" name="DESCRIPCION" rules={[{ required: true }]}>
        <TextArea> </TextArea>
        </Form.Item >
        <Form.Item  label="Precio" name="PRECIO" rules={[{ required: true }]} >
        <InputNumber
        formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        parser={value => value.replace(/\$\s?|(,*)/g, '')}
        />
        </Form.Item >
        <Form.Item name="CATEGORIA_ID_CATEGORIA" label="Categoria" rules={[{ required: true }]}  >
          <Select
            placeholder="Seleccione un estado" 
            allowClear
          >
           {
            datoscat.map((elemento,i) =>(
             
                <Option key={elemento.ID_CATEGORIA} 
                value={elemento.ID_CATEGORIA}>
                  {elemento.NOMBRE_CATEGORIA}
                </Option>
            
      
            ))
        }
          </Select>
        </Form.Item>
        <Form.Item  label="Stock" name="STOCK_PLATO" rules={[{ required: true }]}>
        <InputNumber />
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

           <Button type="primary" htmlType="submit" style={{ marginLeft: 10}} >
            Enviar
           </Button>
         </Form.Item>

      
       
       
             </Form>
             
        </Modal>
        </>
    )
}

export default ModalaPlatoModi;
