import React, { useState ,useEffect} from 'react';
import { Modal, Button , DatePicker, Space,Form, Input, Layout,Image,TimePicker,  Select } from 'antd';
import moment from 'moment';
import Cookie from 'universal-cookie';

import swal from 'sweetalert';
import axios from 'axios';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import ModalRegristoReser from './ModalRegistroReser'
const cookies = new Cookie();
const { RangePicker } = DatePicker;
const { Option } = Select;
function ModalReservaAgre() {
  useEffect(()=>{
    getMesa();
              },[]);

  const [datosmesa, setdatosmesa]= useState([]);
   
  const getMesa = () =>{
      axios.get(`http://localhost:4000/obtenerMesa`)
    .then(res => {

      setdatosmesa(res.data);
    })
  }
  

    const [isModalVisible, setIsModalVisible] = useState(false)
    const showModal = () => {
      
       
        setIsModalVisible(true);
      };
    
      const handleOk = () => {
        setIsModalVisible(false);
      };
    
      const handleCancel = () => {
        setIsModalVisible(false);
      };

      const dateFormat = 'DD/MM/YYYY';

      const layout = {
        labelCol: { span: 20 },
        wrapperCol: { span: 20 },
       
      };
      const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];
      const format = 'HH:mm';

    return (
        <>
        <Button type="primary" onClick={showModal}>
          RESERVAR
        </Button>
        <Modal
          title="RESERVAR"
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={[
          ]}
        >

<Form
         {...layout}
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      
      style={{ borderBlock:'1px'}}
      
    >
     
     <Form.Item
        name="FECHA_RESERVA"
        rules={[{ required: true, message: 'Por favor, Ingrese una Fecha de reserva!' }]}
      >
          <DatePicker defaultValue={moment('01/01/2015', dateFormatList[0])} format={dateFormatList} />
         
      </Form.Item>

     
      <Form.Item name="MESA_NUM_MESA" label="Clientes" rules={[{ required: true}]}  >
          
            
          <Select
            placeholder="Seleccione una mesa" 
            allowClear
           
          >
                {
            datosmesa.map((elemento,i) =>(
             
                <Option key={elemento.NUM_MESA} 
                value={elemento.NUM_MESA}>
                  {elemento.CANT_PERSONAS}
                </Option>
            
      
            ))
        }
          </Select>
        </Form.Item>



      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Ingresar
        </Button>
        <Button type="back" style={{ marginLeft:'5px'}} htmlType="submit" className="login-form-button" onClick={handleCancel}>
          Cancelar
        </Button>
      </Form.Item>

    </Form>
    

      
        </Modal>
      </>
  
    )
}

export default ModalReservaAgre
