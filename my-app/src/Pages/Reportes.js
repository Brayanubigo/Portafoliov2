import React,{ useEffect,useState} from 'react'
import ExportExcel from 'react-export-excel'
import {Container, Card, Form, Button,Statistic, Row, Col } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import tablaUsu from '../GetTablas/TablaUsuario';
import axios from 'axios';

function Reportes() {
    useEffect(()=>{
        getUsuario();
        },[]);
    const [datosapi, setdatosapi]= useState([]);
   
    const getUsuario = () =>{
        axios.get(`http://localhost:4000/obtenerUsuario`)
      .then(res => {
          
            setdatosapi(res.data);
      })
    }

    const ExcelFile = ExportExcel.ExcelFile
    const ExcelSheet = ExportExcel.ExcelSheet
    const ExcelColumn = ExportExcel.ExcelColumn
   
    return (
        <div className="site-statistic-demo-card">
        <Row gutter={30}>
         
        <Col span={6}>
    

        </Col>
        
        </Row>
        </div>
    )
}

export default Reportes;
