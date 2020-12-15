import React from 'react'
import { Layout, Menu, Breadcrumb, Row, Image,Carousel,Button } from 'antd';
import imagen from '../../img/asd.png'
import imagen2 from '../../img/1234.jpg'


// import Footer from './Footer'
const { Header, Content,Footer } = Layout;

const centerStyle = {
  position: 'relative',
  display: 'flex',
  justifyContent: 'center'
};


const contentStyle = {
  height: 'height: 600px',
  color: '#fff',
  lineHeight: '50px',
  textAlign: 'center',

 
};


function onChange(a, b, c) {
  console.log(a, b, c);
}

const carouselStyle = {
  height: '100% ',
  width:'100vw ',
  color: '#fff',
  
  textAlign: 'center',
  marginLeft: '0',
  padding: '0',
};


function Carta() {
    return (
     
      <Layout>
      <Content className="site-layout" >
       
        <div className='inicio mr-auto'>
          <h5>Inicio</h5>
          
        </div>
    
      </Content>
  
      </Layout>

      
    )
}

export default Carta
