import { Modal} from 'antd';
import React,{ useEffect,useState, useRef} from 'react'
import { Form, Input, InputNumber, Button, Select,DatePicker } from 'antd';
import axios from 'axios';
import TablaCat from '../GetTablas/TablaCategoria'
import moment from 'moment'
function ModalUsuMod(objeto) {
    useEffect(()=>{
        getRol();
              },[]);
  
      const [datosrol, setdatosrol]= useState([]);
  
      
      const getRol = () =>{
          axios.get(`http://localhost:4000/obtenerRol`)
        .then(res => {
  
          setdatosrol(res.data);
        })
      }

    

      const onReset = () => {
        form.resetFields();
      };

const onFinish = async (data) => { 
        
      axios.post('http://localhost:4000/updateUsuario', data)
      .then(response => {
        console.log(data);
        console.log(response);  
       
      })
      onReset();
      objeto.getUsuario();
      objeto.handleCancel();
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
          title="Editar Usuario"
         
          onCancel={objeto.handleCancel}
          footer={[

          ]}
        >
         
        <Form {...layout} onFinish={onFinish}  form={form} initialValues={{NUM_USUARIO: objeto.datos.NUM_USUARIO ,RUT: objeto.datos.RUT, DV: objeto.datos.DV,
     NOMBRE:objeto.datos.NOMBRE,APELLIDO:objeto.datos.APELLIDO,  FECHA_NAC:objeto.datos.fecha,
     CORREO:objeto.datos.CORREO,DOMICILIO:objeto.datos.DOMICILIO,
   TELEFONO:objeto.datos.TELEFONO,  ROL_USUARIO_ID_ROL:objeto.datos.NOMBRE_ROL,
 ESTADO:objeto.datos.ESTADO }}>
      
      
        <Form.Item label="ID" name="NUM_USUARIO"  >
        <Input disabled />
          </Form.Item >
          <Form.Item label="Rut" name="RUT">
          <InputNumber style={{ width: '100%' }} maxLength="8" />
        </Form.Item >
        <Form.Item  label="Dv" name="DV">
        <Input  maxLength="1" style={{ width: '10%' }} />
        </Form.Item >
        <Form.Item  label="Nombre" name="NOMBRE">
        <Input />
        </Form.Item >

        <Form.Item  label="Apellido" name="APELLIDO">
        <Input />
        </Form.Item >
        

        <Form.Item  label="Fecha de nacimiento" name="FECHA_NAC">
     
        <Input />
        </Form.Item >

        <Form.Item  label="Correo" name="CORREO" rules={[{ type: 'email' }]}>
        <Input />
        </Form.Item >

        <Form.Item  label="Domicilio" name="DOMICILIO">
        <Input />
        </Form.Item >

        <Form.Item  label="Telefono" name="TELEFONO">
        <InputNumber style={{ width: '100%' }} maxLength="9" />
        </Form.Item >
        
        <Form.Item name="ROL_USUARIO_ID_ROL" label="Cargo"  >
          
            
          <Select
            placeholder="Seleccione un Proveedor" 
            allowClear
           
          >
                {
            datosrol.map((elemento,i) =>(
             
                <Option key={elemento.ID_ROL} 
                value={elemento.ID_ROL}>
                  {elemento.NOMBRE_ROL}
                </Option>
            
      
            ))
        }
          </Select>
        </Form.Item>

        <Form.Item name="ESTADO" label="Estado"  >
          

            
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


           <Button type="primary" htmlType="submit" style={{ marginLeft: 10}}>
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