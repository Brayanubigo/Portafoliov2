import { Modal} from 'antd';
import React,{ useEffect,useState} from 'react'
import { Form, Input, InputNumber, Button, Select, Space  } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import axios from 'axios';
function ModalaCateAgre() {
    useEffect(()=>{
        getCat();
        getInsu();
       },[]);
   
       const [datoscat, setdatoscat]= useState([]);
       
       const getCat = () =>{
           axios.get(`http://localhost:4000/obtenerCatPlato`)
         .then(res => {
   
            setdatoscat(res.data);
         })
       };

        const [datosins, setdatosins]= useState([]);
       
       const getInsu = () =>{
           axios.get(`http://localhost:4000/obtenerInsumos2`)
         .then(res => {
   
          setdatosins(res.data);
         })
       };




    const { TextArea } = Input;


    const onFinish = async (data) => { 

      axios.post('http://localhost:4000/agregarPlato', data)
      .then(response => {
        
        console.log(data);
        console.log(response); 
         
      })
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

      const formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 4 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 20 },
        },
      };
      const formItemLayoutWithOutLabel = {
        wrapperCol: {
          xs: { span: 24, offset: 0 },
          sm: { span: 20, offset: 4 },
        },
      }; 




    return (
        <>
              <Button type="primary" onClick={showModal}>
         Agregar Plato
        </Button>
        <Modal
          visible={modalAgre}
          title="Agregar Plato"
          onCancel={handleCancel}
          footer={[
          ]}
        >
        <Form {...layout} form={form} onFinish={onFinish}>
        <Form.Item label="Nombre de plato" name="NOMBRE" rules={[{ required: true }]}>
        <Input  ></Input>
        </Form.Item >
        
        <Form.Item  label="Precio" name="PRECIO" rules={[{ required: true }]} >
        <InputNumber
         defaultValue={1000}
        formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        parser={value => value.replace(/\$\s?|(,*)/g, '')}
        />
      
        </Form.Item >
        <Form.Item label="Descripcion" name="DESCRIPCION" rules={[{ required: true }]}>
        <TextArea> </TextArea>
        </Form.Item >

        <Form.Item name="CATEGORIA_ID_CATEGORIA" label="Categoria" rules={[{ required: true }]}  >
          <Select
            placeholder="Seleccione una categoria" 
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

        <Form.List
        name="names"
        rules={[
          {
            validator: async (_, names) => {
              if (!names || names.length < 2) {
                return Promise.reject(new Error('Debe seleccionar mas de 2 Ingredientes'));
              }
            },
          },
        ]}
      >
        {(fields, { add, remove }, { errors }) => (
          <>
            {fields.map((field, index) => (
              <Form.Item
                {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                label={index === 0 ? 'Insumo' : ''}
                required={false}
                key={field.key}
              >
                <Form.Item
                  {...field}
                  validateTrigger={['onChange', 'onBlur']}
                  noStyle
                >
                  
          <Select
            placeholder="Seleccione un insumo" 
            allowClear
            style={{ width: '60%' }}
          >
           {
            datosins.map((elemento,i) =>(
             
                <Option key={elemento.ID_INSUMO} 
                value={elemento.ID_INSUMO}>
                  {elemento.NOMBRE}
                </Option>
            
      
            ))
        }
          </Select>
        </Form.Item>

                {fields.length > 1 ? (
                  <MinusCircleOutlined
                    className="dynamic-delete-button"
                    onClick={() => remove(field.name)}
                  />
                ) : null}
              </Form.Item>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                style={{ width: '60%' }}
                icon={<PlusOutlined />}
              >
                Añadir insumo
              </Button>
              <Form.ErrorList errors={errors} />
            </Form.Item>
          </>
        )}
      </Form.List>



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
      
           <Button type="back" htmlType="button" onClick={handleCancel} >
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

export default ModalaCateAgre;
