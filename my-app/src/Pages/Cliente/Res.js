import React from 'react'
import { Layout, Menu, Breadcrumb, Row, Image,Carousel,Button } from 'antd';
import imagen from '../../img/asd.png'
import imagen2 from '../../img/462860.jpg'
import ModalReservaAgre from '../../componentsClietne/ModalReservaAgre'

// import Footer from './Footer'
const { Header, Content,Footer } = Layout;

const centerStyle = {
  position: 'relative',
  display: 'flex',
  justifyContent: 'center'
};



function onChange(a, b, c) {
  console.log(a, b, c);
}

const contentStyle = {
  height: '500px',
  width:'100%',
  color: '#fff',
  lineHeight: '450px',
  textAlign: 'center',
  backgroundImage: `url(${imagen2})`,
  marginTop:'50px',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  

};



function Res() {
    return (
     
      <Layout>
      <Content className="site-layout" >
        
      <Carousel afterChange={onChange}>
      <div  style={{}}>
      <h4  style={contentStyle}> 
     <ModalReservaAgre style={{ position: 'absolute', marginTop:'50px' }}   type="primary"/> 
      </h4>

     
    </div>
  
  </Carousel>

   
    
    
 
      </Content>
  
      </Layout>

      
    )
}

export default Res
