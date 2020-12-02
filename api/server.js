var express = require("express");
var app = express();
var router = express.Router();
var bodyparser=require('body-parser');
var oracledb = require('oracledb');
//Authoriser tous les requettes cors)
var cors = require('cors');
app.use(cors());
oracledb.autoCommit = true;
app.use(bodyparser.json());
var moment = require('moment'); // require
///Pour changer le format de la requete 
app.use(bodyparser.urlencoded({
    extended: true
}));




var connAttrs = {
    "user": "admin",
    "password": "Sigloxxl",
    "connectString": "(DESCRIPTION =(LOAD_BALANCE = ON)(FAILOVER = ON)(ADDRESS =(PROTOCOL = TCP)(HOST = restaurant.cqsacyz5ga7e.us-east-1.rds.amazonaws.com)(PORT = 1521))(ADDRESS = (PROTOCOL = TCP)(HOST = restaurant.cqsacyz5ga7e.us-east-1.rds.amazonaws.com)(PORT=1521))(CONNECT_DATA=(SERVICE_NAME=ORCL)(FAILOVER_MODE=(TYPE=SELECT)(METHOD = BASIC))))"
}


app.get('/obtenerUsuario', function (req, res) {
    "use strict";

    oracledb.getConnection(connAttrs, function (err, connection) {
        if (err) {
            // Error connecting to DB
            res.set('Content-Type', 'application/json');
            res.status(500).send(JSON.stringify({
                status: 500,
                message: "Error connecting to DB",
                detailed_message: err.message
            }));
            return;
        }
        connection.execute("SELECT  RUT,DV, NOMBRE, DOMICILIO, CORREO, NUM_USUARIO, PASSWORD, R.NOMBRE_ROL, TELEFONO, APELLIDO, ESTADO, FECHA_NAC FROM USUARIO U JOIN ROL_USUARIO R ON R.ID_ROL=U.ROL_USUARIO_ID_ROL ORDER BY NUM_USUARIO", {}, {
            outFormat: oracledb.OBJECT // Return the result as Object
        }, function (err, result) {
            if (err) {
                res.set('Content-Type', 'application/json');
                res.status(500).send(JSON.stringify({
                    status: 500,
                    message: "Error getting the dba_tablespaces",
                    detailed_message: err.message
                }));
            } else {
                res.header('Access-Control-Allow-Origin','*');
                res.header('Access-Control-Allow-Headers','Content-Type');
                res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE,OPTIONS');
                res.contentType('application/json').status(200);
                res.send(JSON.stringify(result.rows));
				
            }
            // Release the connection
            connection.release(
                function (err) {
                    if (err) {
                        console.error(err.message);
                    } else {
                        console.log("GET /sendTablespace : Connection released");
                    }
                });
        });
    });
});

app.get('/obtenerRol', function (req, res) {
    "use strict";

    oracledb.getConnection(connAttrs, function (err, connection) {
        if (err) {
            // Error connecting to DB
            res.set('Content-Type', 'application/json');
            res.status(500).send(JSON.stringify({
                status: 500,
                message: "Error connecting to DB",
                detailed_message: err.message
            }));
            return;
        }
        connection.execute("Select ID_ROL, NOMBRE_ROL from ROL_USUARIO", {}, {
            outFormat: oracledb.OBJECT // Return the result as Object
        }, function (err, result) {
            if (err) {
                res.set('Content-Type', 'application/json');
                res.status(500).send(JSON.stringify({
                    status: 500,
                    message: "Error getting the dba_tablespaces",
                    detailed_message: err.message
                }));
            } else {
                res.header('Access-Control-Allow-Origin','*');
                res.header('Access-Control-Allow-Headers','Content-Type');
                res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE,OPTIONS');
                res.contentType('application/json').status(200);
                res.send(JSON.stringify(result.rows));
				
            }
            // Release the connection
            connection.release(
                function (err) {
                    if (err) {
                        console.error(err.message);
                    } else {
                        console.log("GET /sendTablespace : Connection released");
                    }
                });
        });
    });
});

app.post('/agregarUsuario', function (req, res, next) {

    var rut = req.body.RUT;
    var dv = req.body.DV;
    var nombre = req.body.NOMBRE;
    var apellido = req.body.APELLIDO;
    var correo = req.body.CORREO;
    var telefono = req.body.TELEFONO;
    var domicilio = req.body.DOMICILIO;
    var estado = req.body.ESTADO;
    var rol_usuario_id_rol = req.body.ROL_USUARIO_ID_ROL;
    var fecha_nac = moment( req.body.FECHA_NAC).format("DD/MM/YYYY");
    var password = req.body.PASSWORD;

    oracledb.getConnection(connAttrs, function (err, connection) {
        if (err) {
            // Error al conectar
            res.set('Content-Type', 'application/json');
            res.status(500).send(JSON.stringify({
                status: 500,
                message: "Error al conectar a la base de datos",
                detailed_message: err.message
            }));
            return;
        }

        connection.execute("BEGIN SP_CREAR_USUARIOS(" + rut + ",'" + dv + "', '" + nombre + "' , '" + apellido + "', '" + correo + "' , " + telefono + " ,'" + domicilio + "','" + password + "'," + rol_usuario_id_rol + ",'" + fecha_nac + "','" + estado + "'); END;", {}, {
            outFormat: oracledb.OBJECT // Return the result as Object
        }, function (err, result) {
            if (err) {
                res.header('Access-Control-Allow-Origin', '*');
                res.header('Access-Control-Allow-Headers', 'Content-Type');
                res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
                res.contentType('application/json').status(200);
                res.send(JSON.stringify(err.message));

            } else {
                res.header('Access-Control-Allow-Origin', '*');
                res.header('Access-Control-Allow-Headers', 'Content-Type');
                res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
                res.contentType('application/json').status(200);
                res.send(JSON.stringify(res));
               


            }
            // Release the connection
            connection.release(
                function (err) {
                    if (err) {
                        console.error(err.message);
                    } else {
                        console.log("POST /sendTablespace : Connection released");
                    }
                });
        });
    });
    console.log("data"+JSON.stringify(req.body));
});

app.post('/updateUsuario', function (req, res,next) {
    
    var num_usuario = req.body.NUM_USUARIO;
    var rut = req.body.RUT;
    var dv = req.body.DV;
    var nombre = req.body.NOMBRE;
    var apellido = req.body.APELLIDO;
    var correo = req.body.CORREO;
    var telefono = req.body.TELEFONO;
    var domicilio = req.body.DOMICILIO;
    var estado = req.body.ESTADO;
    var fecha_nac = req.body.FECHA_NAC;
    var rol_usuario_id_rol = req.body.ROL_USUARIO_ID_ROL;

    console.log("data"+JSON.stringify(req.body))
      oracledb.getConnection(connAttrs, function (err, connection) {
        if (err) {
            // Error connecting to DB
            res.set('Content-Type', 'application/json');
            res.status(500).send(JSON.stringify({
                status: 500,
                message: "Error connecting to DB",
                detailed_message: err.message
            }));
            return;
        }
		//ALTER USER sidney 
    //IDENTIFIED BY second_2nd_pwd
    //DEFAULT TABLESPACE example;
	
        connection.execute("BEGIN SP_ACTUALIZAR_USUARIOS(" + num_usuario + "," + rut + ",'" + dv + "', '" + nombre + "' , '" + apellido + "','" + fecha_nac + "', '" + correo + "' , " + telefono + " ,'" + domicilio + "'," + rol_usuario_id_rol + ",'" + estado + "'); END;", {}, {
            outFormat: oracledb.OBJECT // Return the result as Object
        }, function (err, result) {
            if (err) {
                res.header('Access-Control-Allow-Origin','*'); 
                res.header('Access-Control-Allow-Headers','Content-Type');
                res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE,OPTIONS');
                res.contentType('application/json').status(200);
                res.send(JSON.stringify(err.message)) ;
               
            } else {
                res.header('Access-Control-Allow-Origin','*');
                res.header('Access-Control-Allow-Headers','Content-Type');
                res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE,OPTIONS');
                res.contentType('application/json').status(200);
                res.send(JSON.stringify("1"))   ; 
                
            }
            // Release the connection
            connection.release(
                function (err) {
                    if (err) {
                        console.error(err.message);
                    } else {
                        console.log("POST /sendTablespace : Connection released");
                    }
                });
        });
    });
   
});


app.post('/eliminarUsuario', function (req, res,next) {
    
    var pnum_usuario = req.body.NUM_USUARIO;
    
    // var id = req.params.NUM_USUARIO;
    // var idint = parseInt(id);
    console.log("ID ES " + JSON.stringify(req.body));
    oracledb.getConnection(connAttrs, function (err, connection) {
      if (err) {
          // Error connecting to DB
          res.set('Content-Type', 'application/json');
          res.status(500).send(JSON.stringify({
              status: 500,
              message: "Error connecting to DB",
              detailed_message: err.message
          }));
          return;
      }
      connection.execute("BEGIN SP_ELIMINAR_USUARIOS(" + pnum_usuario + "); END;", {}, {
          outFormat: oracledb.OBJECT // Return the result as Object
      }, function (err, result) {
          if (err) {
              res.header('Access-Control-Allow-Origin','*'); 
              res.header('Access-Control-Allow-Headers','Content-Type');
              res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE,OPTIONS');
              res.contentType('application/json').status(200);
              res.send(JSON.stringify(err.message)) ;
              
             
          } else {
              res.header('Access-Control-Allow-Origin','*');
              res.header('Access-Control-Allow-Headers','Content-Type');
              res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE,OPTIONS');
              res.contentType('application/json').status(200);
              res.send(JSON.stringify("1"))   ; 
              
          }
          // Release the connection
          connection.release(
              function (err) {
                  if (err) {
                      console.error(err.message);
                  } else {
                      console.log("POST /sendTablespace : Connection released");
                  }
              });
      });
  });   
});


app.post('/obtenerSesion', function (req, res,next) {
    
    var rut = req.body.RUT;
    var contra = req.body.PASSWORD;
    
   console.log("datos de entrada " + JSON.stringify(req.body));
    oracledb.getConnection(connAttrs, function (err, connection) {
      if (err) {
          // Error connecting to DB
          res.set('Content-Type', 'application/json');
          res.status(500).send(JSON.stringify({
              status: 500,
              message: "Error connecting to DB",
              detailed_message: err.message
          }));
          return;
      }
      var bindvars = {
        p_existe:  { type: oracledb.STRING, dir: oracledb.BIND_OUT, maxSize: 200 },
        p_nombre:  { type: oracledb.STRING, dir: oracledb.BIND_OUT, maxSize: 200 },
        p_apellido:  { type: oracledb.STRING, dir: oracledb.BIND_OUT, maxSize: 200 },
      p_rol:  { type: oracledb.STRING, dir: oracledb.BIND_OUT, maxSize: 200 }
    };
      connection.execute("BEGIN SP_INICIAR_USUARIO(" + rut + ",'" + contra + "',:p_existe, :p_nombre,  :p_apellido,:p_rol ); END;", bindvars, 
       function (err, result) {
          if (err) {
              res.header('Access-Control-Allow-Origin','*'); 
              res.header('Access-Control-Allow-Headers','Content-Type');
              res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE,OPTIONS');
              res.contentType('application/json').status(200);
              res.send(JSON.stringify(err.message)) ;

              
             
          } else {
              res.header('Access-Control-Allow-Origin','*');
              res.header('Access-Control-Allow-Headers','Content-Type');
              res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE,OPTIONS');
              res.contentType('application/json').status(200);
              res.send(JSON.stringify(result.outBinds))   ; 
              
          }
          // Release the connection
          connection.release(
              function (err) {
                  if (err) {
                      console.error(err.message);
                  } else {
                      console.log("POST /sendTablespace : Connection released");
                      res.send(JSON.stringify(result.outBinds))   ; 
                  }
              });
      });
  });   
});





// PRODUCTO

app.get('/obtenerPlato', function (req, res) {
    "use strict";

    oracledb.getConnection(connAttrs, function (err, connection) {
        if (err) {
            // Error connecting to DB
            res.set('Content-Type', 'application/json');
            res.status(500).send(JSON.stringify({
                status: 500,
                message: "Error connecting to DB",
                detailed_message: err.message
            }));
            return;
        }
        connection.execute("SELECT P.ID_PLATO, P.NOMBRE, P.PRECIO, P.DESCRIPCION, C.NOMBRE_CATEGORIA, P.ESTADO, P.STOCK_PLATO FROM PLATO P JOIN CATEGORIA C ON C.ID_CATEGORIA=P.CATEGORIA_ID_CATEGORIA ORDER BY ID_PLATO", {}, {
            outFormat: oracledb.OBJECT // Return the result as Object
        }, function (err, result) {
            if (err) {
                res.set('Content-Type', 'application/json');
                res.status(500).send(JSON.stringify({
                    status: 500,
                    message: "Error getting the dba_tablespaces",
                    detailed_message: err.message
                }));
            } else {
                res.header('Access-Control-Allow-Origin','*');
                res.header('Access-Control-Allow-Headers','Content-Type');
                res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE,OPTIONS');
                res.contentType('application/json').status(200);
                res.send(JSON.stringify(result.rows));
				
            }
            // Release the connection
            connection.release(
                function (err) {
                    if (err) {
                        console.error(err.message);
                    } else {
                        console.log("GET /sendTablespace : Connection released");
                    }
                });
        });
    });
});

app.get('/obtenerCatPlato', function (req, res) {
    "use strict";

    oracledb.getConnection(connAttrs, function (err, connection) {
        if (err) {
            // Error connecting to DB
            res.set('Content-Type', 'application/json');
            res.status(500).send(JSON.stringify({
                status: 500,
                message: "Error connecting to DB",
                detailed_message: err.message
            }));
            return;
        }
        connection.execute("Select ID_CATEGORIA, NOMBRE_CATEGORIA From CATEGORIA", {}, {
            outFormat: oracledb.OBJECT // Return the result as Object
        }, function (err, result) {
            if (err) {
                res.set('Content-Type', 'application/json');
                res.status(500).send(JSON.stringify({
                    status: 500,
                    message: "Error getting the dba_tablespaces",
                    detailed_message: err.message
                }));
            } else {
                res.header('Access-Control-Allow-Origin','*');
                res.header('Access-Control-Allow-Headers','Content-Type');
                res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE,OPTIONS');
                res.contentType('application/json').status(200);
                res.send(JSON.stringify(result.rows));
				
            }
            // Release the connection
            connection.release(
                function (err) {
                    if (err) {
                        console.error(err.message);
                    } else {
                        console.log("GET /sendTablespace : Connection released");
                    }
                });
        });
    });
});

app.post('/agregarPlato', function (req, res, next) {

    var precio = req.body.PRECIO;
    var descripcion = req.body.DESCRIPCION;
    var categoria = req.body.CATEGORIA_ID_CATEGORIA;
    var nombre = req.body.NOMBRE;
    var estado = req.body.ESTADO;
    var stock_plato = req.body.STOCK_PLATO;
    oracledb.getConnection(connAttrs, function (err, connection) {
        if (err) {
            // Error al conectar
            res.set('Content-Type', 'application/json');
            res.status(500).send(JSON.stringify({
                status: 500,
                message: "Error al conectar a la base de datos",
                detailed_message: err.message
            }));
            return;
        }

        connection.execute("BEGIN SP_CREAR_PLATO('"+ nombre +"'," + precio + ",'" + descripcion + "',"+ categoria +","+ estado +","+ stock_plato +"); END;", {}, {
            outFormat: oracledb.OBJECT // Return the result as Object
        }, function (err, result) {
            if (err) {
                res.header('Access-Control-Allow-Origin', '*');
                res.header('Access-Control-Allow-Headers', 'Content-Type');
                res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
                res.contentType('application/json').status(200);
                res.send(JSON.stringify(err.message));

            } else {
                res.header('Access-Control-Allow-Origin', '*');
                res.header('Access-Control-Allow-Headers', 'Content-Type');
                res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
                res.contentType('application/json').status(200);
                res.send(JSON.stringify(res));
               


            }
            // Release the connection
            connection.release(
                function (err) {
                    if (err) {
                        console.error(err.message);
                    } else {
                        console.log("POST /sendTablespace : Connection released");
                    }
                });
        });
    });
    console.log("data"+JSON.stringify(req.body));
});


app.post('/updatePlato', function (req, res,next) {
    
    var id_plato = req.body.ID_PLATO;
    var nombre = req.body.NOMBRE;
    var descripcion = req.body.DESCRIPCION;
    var categoria = req.body.CATEGORIA_ID_CATEGORIA;
    var precio = req.body.PRECIO;
    var estado = req.body.ESTADO;
    var stock = req.body.STOCK_PLATO;
    console.log("data"+JSON.stringify(req.body))
      oracledb.getConnection(connAttrs, function (err, connection) {
        if (err) {
            // Error connecting to DB
            res.set('Content-Type', 'application/json');
            res.status(500).send(JSON.stringify({
                status: 500,
                message: "Error connecting to DB",
                detailed_message: err.message
            }));
            return;
        }
		//ALTER USER sidney 
    //IDENTIFIED BY second_2nd_pwd
    //DEFAULT TABLESPACE example;
	
        connection.execute("BEGIN SP_ACTUALIZAR_PRODUCTO(" + id_plato + ",'" + nombre + "'," + precio + ",'" + descripcion + "'," + categoria + "," + stock + "," + estado + "); END;", {}, {
            outFormat: oracledb.OBJECT // Return the result as Object
        }, function (err, result) {
            if (err) {
                res.header('Access-Control-Allow-Origin','*'); 
                res.header('Access-Control-Allow-Headers','Content-Type');
                res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE,OPTIONS');
                res.contentType('application/json').status(200);
                res.send(JSON.stringify(err.message)) ;
               
            } else {
                res.header('Access-Control-Allow-Origin','*');
                res.header('Access-Control-Allow-Headers','Content-Type');
                res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE,OPTIONS');
                res.contentType('application/json').status(200);
                res.send(JSON.stringify("1"))   ; 
                
            }
            // Release the connection
            connection.release(
                function (err) {
                    if (err) {
                        console.error(err.message);
                    } else {
                        console.log("POST /sendTablespace : Connection released");
                    }
                });
        });
    });
   
});




app.post('/eliminarPlato', function (req, res,next) {
    
    var pid_plato = req.body.ID_PLATO;
    
    // var id = req.params.NUM_USUARIO;
    // var idint = parseInt(id);
    console.log("ID ES " + JSON.stringify(req.body));
    oracledb.getConnection(connAttrs, function (err, connection) {
      if (err) {
          // Error connecting to DB
          res.set('Content-Type', 'application/json');
          res.status(500).send(JSON.stringify({
              status: 500,
              message: "Error connecting to DB",
              detailed_message: err.message
          }));
          return;
      }
      connection.execute("BEGIN SP_ELIMINAR_PLATO(" + pid_plato + "); END;", {}, {
          outFormat: oracledb.OBJECT // Return the result as Object
      }, function (err, result) {
          if (err) {
              res.header('Access-Control-Allow-Origin','*'); 
              res.header('Access-Control-Allow-Headers','Content-Type');
              res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE,OPTIONS');
              res.contentType('application/json').status(200);
              res.send(JSON.stringify(err.message)) ;
              
             
          } else {
              res.header('Access-Control-Allow-Origin','*');
              res.header('Access-Control-Allow-Headers','Content-Type');
              res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE,OPTIONS');
              res.contentType('application/json').status(200);
              res.send(JSON.stringify("1"))   ; 
              
          }
          // Release the connection
          connection.release(
              function (err) {
                  if (err) {
                      console.error(err.message);
                  } else {
                      console.log("POST /sendTablespace : Connection released");
                  }
              });
      });
  });   
});








//// CATEGORIA

app.post('/agregarCategoria', function (req, res, next) {

    var nom_cate = req.body.NOMBRE_CATEGORIA;
    var descripcion = req.body.DESCRIPCION;
    var estado = req.body.ESTADO;
    console.log("data"+JSON.stringify(req.body)); 
    oracledb.getConnection(connAttrs, function (err, connection) {
        if (err) {
            // Error al conectar
            res.set('Content-Type', 'application/json');
            res.status(500).send(JSON.stringify({
                status: 500,
                message: "Error al conectar a la base de datos",
                detailed_message: err.message
            }));
            return;
        }

        connection.execute("BEGIN SP_CREAR_CATEGORIA('" + nom_cate + "','" + descripcion + "'," + estado + "); END;", {}, {
            outFormat: oracledb.OBJECT // Return the result as Object
        }, function (err, result) {
            if (err) {
                res.header('Access-Control-Allow-Origin', '*');
                res.header('Access-Control-Allow-Headers', 'Content-Type');
                res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
                res.contentType('application/json').status(200);
                res.send(JSON.stringify(err.message));
                console.log("data"+JSON.stringify(req.body));   
            } else {
                res.header('Access-Control-Allow-Origin', '*');
                res.header('Access-Control-Allow-Headers', 'Content-Type');
                res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
                res.contentType('application/json').status(200);
                res.send(JSON.stringify(res));
                console.log("data"+JSON.stringify(req.body));
               


            }
            // Release the connection
            connection.release(
                function (err) {
                    if (err) {
                        console.error(err.message);
                    } else {
                        console.log("POST /sendTablespace : Connection released");
                    }
                });
        });
    });
    console.log("data"+JSON.stringify(req.body));
});


app.get('/obtenerCategoria', function (req, res) {
    "use strict";

    oracledb.getConnection(connAttrs, function (err, connection) {
        if (err) {
            // Error connecting to DB
            res.set('Content-Type', 'application/json');
            res.status(500).send(JSON.stringify({
                status: 500,
                message: "Error connecting to DB",
                detailed_message: err.message
            }));
            return;
        }
        connection.execute("Select * From CATEGORIA ORDER BY ID_CATEGORIA", {}, {
            outFormat: oracledb.OBJECT // Return the result as Object
        }, function (err, result) {
            if (err) {
                res.set('Content-Type', 'application/json');
                res.status(500).send(JSON.stringify({
                    status: 500,
                    message: "Error getting the dba_tablespaces",
                    detailed_message: err.message
                }));
            } else {
                res.header('Access-Control-Allow-Origin','*');
                res.header('Access-Control-Allow-Headers','Content-Type');
                res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE,OPTIONS');
                res.contentType('application/json').status(200);
                res.send(JSON.stringify(result.rows));
				
            }
            // Release the connection
            connection.release(
                function (err) {
                    if (err) {
                        console.error(err.message);
                    } else {
                        console.log("GET /sendTablespace : Connection released");
                    }
                });
        });
    });
});


app.post('/updateCategoria', function (req, res,next) {
    
    var id_categoria = req.body.ID_CATEGORIA;
    var nombre = req.body.NOMBRE_CATEGORIA;
    var descripcion = req.body.DESCRIPCION;
    var estado = req.body.ESTADO;


    console.log("data"+JSON.stringify(req.body))
      oracledb.getConnection(connAttrs, function (err, connection) {
        if (err) {
            // Error connecting to DB
            res.set('Content-Type', 'application/json');
            res.status(500).send(JSON.stringify({
                status: 500,
                message: "Error connecting to DB",
                detailed_message: err.message
            }));
            return;
        }
		//ALTER USER sidney 
    //IDENTIFIED BY second_2nd_pwd
    //DEFAULT TABLESPACE example;
	
        connection.execute("BEGIN SP_ACTUALIZAR_CATEGORIA(" + id_categoria + ",'" + nombre + "','" + descripcion + "'," + estado + "); END;", {}, {
            outFormat: oracledb.OBJECT // Return the result as Object
        }, function (err, result) {
            if (err) {
                res.header('Access-Control-Allow-Origin','*'); 
                res.header('Access-Control-Allow-Headers','Content-Type');
                res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE,OPTIONS');
                res.contentType('application/json').status(200);
                res.send(JSON.stringify(err.message)) ;
               
            } else {
                res.header('Access-Control-Allow-Origin','*');
                res.header('Access-Control-Allow-Headers','Content-Type');
                res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE,OPTIONS');
                res.contentType('application/json').status(200);
                res.send(JSON.stringify("1"))   ; 
                
            }
            // Release the connection
            connection.release(
                function (err) {
                    if (err) {
                        console.error(err.message);
                    } else {
                        console.log("POST /sendTablespace : Connection released");
                    }
                });
        });
    });
   
});



app.post('/eliminarCategoria', function (req, res,next) {
    
    var pid_categoria = req.body.ID_CATEGORIA;
    
    // var id = req.params.NUM_USUARIO;
    // var idint = parseInt(id);
    console.log("ID ES " + JSON.stringify(req.body));
    oracledb.getConnection(connAttrs, function (err, connection) {
      if (err) {
          // Error connecting to DB
          res.set('Content-Type', 'application/json');
          res.status(500).send(JSON.stringify({
              status: 500,
              message: "Error connecting to DB",
              detailed_message: err.message
          }));
          return;
      }
      connection.execute("BEGIN SP_ELIMINAR_CATEGORIA(" + pid_categoria + "); END;", {}, {
          outFormat: oracledb.OBJECT // Return the result as Object
      }, function (err, result) {
          if (err) {
              res.header('Access-Control-Allow-Origin','*'); 
              res.header('Access-Control-Allow-Headers','Content-Type');
              res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE,OPTIONS');
              res.contentType('application/json').status(200);
              res.send(JSON.stringify(err.message)) ;
              
             
          } else {
              res.header('Access-Control-Allow-Origin','*');
              res.header('Access-Control-Allow-Headers','Content-Type');
              res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE,OPTIONS');
              res.contentType('application/json').status(200);
              res.send(JSON.stringify("1"))   ; 
              
          }
          // Release the connection
          connection.release(
              function (err) {
                  if (err) {
                      console.error(err.message);
                  } else {
                      console.log("POST /sendTablespace : Connection released");
                  }
              });
      });
  });   
});





// INSUMOS


app.get('/obtenerInsumos', function (req, res) {
    "use strict";

    oracledb.getConnection(connAttrs, function (err, connection) {
        if (err) {
            // Error connecting to DB
            res.set('Content-Type', 'application/json');
            res.status(500).send(JSON.stringify({
                status: 500,
                message: "Error connecting to DB",
                detailed_message: err.message
            }));
            return;
        }
        connection.execute("Select ID_INSUMO, NOMBRE, DESCRIPCION, FECHA_VENCIMIENTO, FECHA_RECEPCION, CANT_RECEP, CANT_OCUPADO, NOMBRE_EMPRESA, ESTADO from INSUMOS I JOIN PROVEEDOR P ON P.ID_PROVEEDOR=I.PROVEEDOR_ID_PROVEEDOR ORDER BY ID_INSUMO", {}, {
            outFormat: oracledb.OBJECT // Return the result as Object
        }, function (err, result) {
            if (err) {
                res.set('Content-Type', 'application/json');
                res.status(500).send(JSON.stringify({
                    status: 500,
                    message: "Error getting the dba_tablespaces",
                    detailed_message: err.message
                }));
            } else {
                res.header('Access-Control-Allow-Origin','*');
                res.header('Access-Control-Allow-Headers','Content-Type');
                res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE,OPTIONS');
                res.contentType('application/json').status(200);
                res.send(JSON.stringify(result.rows));
				
            }
            // Release the connection
            connection.release(
                function (err) {
                    if (err) {
                        console.error(err.message);
                    } else {
                        console.log("GET /sendTablespace : Connection released");
                    }
                });
        });
    });
});

app.get('/obtenerProveedor', function (req, res) {
    "use strict";

    oracledb.getConnection(connAttrs, function (err, connection) {
        if (err) {
            // Error connecting to DB
            res.set('Content-Type', 'application/json');
            res.status(500).send(JSON.stringify({
                status: 500,
                message: "Error connecting to DB",
                detailed_message: err.message
            }));
            return;
        }
        connection.execute("Select ID_PROVEEDOR, NOMBRE_EMPRESA FROM PROVEEDOR ", {}, {
            outFormat: oracledb.OBJECT // Return the result as Object
        }, function (err, result) {
            if (err) {
                res.set('Content-Type', 'application/json');
                res.status(500).send(JSON.stringify({
                    status: 500,
                    message: "Error getting the dba_tablespaces",
                    detailed_message: err.message
                }));
            } else {
                res.header('Access-Control-Allow-Origin','*');
                res.header('Access-Control-Allow-Headers','Content-Type');
                res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE,OPTIONS');
                res.contentType('application/json').status(200);
                res.send(JSON.stringify(result.rows));
				
            }
            // Release the connection
            connection.release(
                function (err) {
                    if (err) {
                        console.error(err.message);
                    } else {
                        console.log("GET /sendTablespace : Connection released");
                    }
                });
        });
    });
});

app.post('/agregarInsumos', function (req, res) {
 
    var descripcion = req.body.DESCRIPCION;
    var nombre = req.body.NOMBRE;
    var fecha_venc = moment( req.body.FECHA_VENCIMIENTO).format("DD/MM/YYYY");
    var fecha_recep =  moment(  req.body.FECHA_RECEPCION).format("DD/MM/YYYY");
    var cant_recep = req.body.CANT_RECEP;
    var cant_ocupado = req.body.CANT_OCUPADO;
    var proveedor = req.body.PROVEEDOR_ID_PROVEEDOR;
    var estado = req.body.ESTADO;
console.log("DATOS FORM" + JSON.stringify(req.body));
    oracledb.getConnection(connAttrs, function (err, connection) {
        if (err) {
            // Error al conectar
            res.set('Content-Type', 'application/json');
            res.status(500).send(JSON.stringify({
                status: 500,
                message: "Error al conectar a la base de datos",
                detailed_message: err.message
            }));
            return;
        }

        connection.execute("BEGIN SP_CREAR_INSUMO('" + nombre + "','" + descripcion + "','"+ fecha_venc +"','"+ fecha_recep +"',"+ cant_recep +","+ cant_ocupado +","+ proveedor +","+ estado +"); END;", {}, {
            outFormat: oracledb.OBJECT // Return the result as Object
        }, function (err, result) {
            if (err) {
                res.header('Access-Control-Allow-Origin', '*');
                res.header('Access-Control-Allow-Headers', 'Content-Type');
                res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
                res.contentType('application/json').status(200);
                res.send(JSON.stringify(err.message));

            } else {
                res.header('Access-Control-Allow-Origin', '*');
                res.header('Access-Control-Allow-Headers', 'Content-Type');
                res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
                res.contentType('application/json').status(200);
                res.send(JSON.stringify(res));
               


            }
            // Release the connection
            connection.release(
                function (err) {
                    if (err) {
                        console.error(err.message);
                    } else {
                        console.log("POST /sendTablespace : Connection released");
                    }
                });
        });
    });
});

app.post('/updateInsumos', function (req, res,next) {
    
    var id_insumo = req.body.ID_INSUMO;
    var nombre = req.body.NOMBRE;
    var descripcion = req.body.DESCRIPCION;
    var fecha_vencimiento = req.body.FECHA_VENCIMIENTO;
    var fecha_recep = req.body.FECHA_RECEPCION;
    var cant_recep = req.body.CANT_RECEP;
    var cant_ocupado = req.body.CANT_OCUPADO;
    var proveedor = req.body.PROVEEDOR_ID_PROVEEDOR;
    var estado = req.body.ESTADO;

    console.log("data"+JSON.stringify(req.body))
      oracledb.getConnection(connAttrs, function (err, connection) {
        if (err) {
            // Error connecting to DB
            res.set('Content-Type', 'application/json');
            res.status(500).send(JSON.stringify({
                status: 500,
                message: "Error connecting to DB",
                detailed_message: err.message
            }));
            return;
        }
		//ALTER USER sidney 
    //IDENTIFIED BY second_2nd_pwd
    //DEFAULT TABLESPACE example;
	
        connection.execute("BEGIN SP_ACTUALIZAR_INSUMO(" + id_insumo + ",'" + nombre + "','" + descripcion + "','" + fecha_vencimiento + "','" + fecha_recep + "'," + cant_recep + "," + cant_ocupado + "," + proveedor + "," + estado + "); END;", {}, {
            outFormat: oracledb.OBJECT // Return the result as Object
        }, function (err, result) {
            if (err) {
                res.header('Access-Control-Allow-Origin','*'); 
                res.header('Access-Control-Allow-Headers','Content-Type');
                res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE,OPTIONS');
                res.contentType('application/json').status(200);
                res.send(JSON.stringify(err.message)) ;
               
            } else {
                res.header('Access-Control-Allow-Origin','*');
                res.header('Access-Control-Allow-Headers','Content-Type');
                res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE,OPTIONS');
                res.contentType('application/json').status(200);
                res.send(JSON.stringify("1"))   ; 
                
            }
            // Release the connection
            connection.release(
                function (err) {
                    if (err) {
                        console.error(err.message);
                    } else {
                        console.log("POST /sendTablespace : Connection released");
                    }
                });
        });
    });
   
});
// PROVEEDOR

app.get('/obtenerProveedor2', function (req, res) {
    "use strict";

    oracledb.getConnection(connAttrs, function (err, connection) {
        if (err) {
            // Error connecting to DB
            res.set('Content-Type', 'application/json');
            res.status(500).send(JSON.stringify({
                status: 500,
                message: "Error connecting to DB",
                detailed_message: err.message
            }));
            return;
        }
        connection.execute("Select * FROM PROVEEDOR ORDER BY ID_PROVEEDOR ", {}, {
            outFormat: oracledb.OBJECT // Return the result as Object
        }, function (err, result) {
            if (err) {
                res.set('Content-Type', 'application/json');
                res.status(500).send(JSON.stringify({
                    status: 500,
                    message: "Error getting the dba_tablespaces",
                    detailed_message: err.message
                }));
            } else {
                res.header('Access-Control-Allow-Origin','*');
                res.header('Access-Control-Allow-Headers','Content-Type');
                res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE,OPTIONS');
                res.contentType('application/json').status(200);
                res.send(JSON.stringify(result.rows));
				
            }
            // Release the connection
            connection.release(
                function (err) {
                    if (err) {
                        console.error(err.message);
                    } else {
                        console.log("GET /sendTablespace : Connection released");
                    }
                });
        });
    });
});

app.post('/agregarProveedor', function (req, res, next) {
 
   
    var nombre = req.body.NOMBRE_EMPRESA;
    var telefono = req.body.TELEFONO;
   
    

    oracledb.getConnection(connAttrs, function (err, connection) {
        if (err) {
            // Error al conectar
            res.set('Content-Type', 'application/json');
            res.status(500).send(JSON.stringify({
                status: 500,
                message: "Error al conectar a la base de datos",
                detailed_message: err.message
            }));
            return;
        }

        connection.execute("BEGIN SP_CREAR_PROVEEDOR('" + nombre + "'," + telefono + "); END;", {}, {
            outFormat: oracledb.OBJECT // Return the result as Object
        }, function (err, result) {
            if (err) {
                res.header('Access-Control-Allow-Origin', '*');
                res.header('Access-Control-Allow-Headers', 'Content-Type');
                res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
                res.contentType('application/json').status(200);
                res.send(JSON.stringify(err.message));

            } else {
                res.header('Access-Control-Allow-Origin', '*');
                res.header('Access-Control-Allow-Headers', 'Content-Type');
                res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
                res.contentType('application/json').status(200);
                res.send(JSON.stringify(res));
               


            }
            // Release the connection
            connection.release(
                function (err) {
                    if (err) {
                        console.error(err.message);
                    } else {
                        console.log("POST /sendTablespace : Connection released");
                    }
                });
        });
    });
    console.log("data"+JSON.stringify(req.body));
});

app.post('/updateProveedor', function (req, res,next) {
    
    var id_proveedor = req.body.ID_PROVEEDOR;
    var nombre = req.body.NOMBRE_EMPRESA;
    var telefono = req.body.TELEFONO;
    

    console.log("data"+JSON.stringify(req.body))
      oracledb.getConnection(connAttrs, function (err, connection) {
        if (err) {
            // Error connecting to DB
            res.set('Content-Type', 'application/json');
            res.status(500).send(JSON.stringify({
                status: 500,
                message: "Error connecting to DB",
                detailed_message: err.message
            }));
            return;
        }
		//ALTER USER sidney 
    //IDENTIFIED BY second_2nd_pwd
    //DEFAULT TABLESPACE example;
	
        connection.execute("BEGIN SP_ACTUALIZAR_PROVEEDOR(" + id_proveedor + ",'" + nombre + "'," + telefono + "); END;", {}, {
            outFormat: oracledb.OBJECT // Return the result as Object
        }, function (err, result) {
            if (err) {
                res.header('Access-Control-Allow-Origin','*'); 
                res.header('Access-Control-Allow-Headers','Content-Type');
                res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE,OPTIONS');
                res.contentType('application/json').status(200);
                res.send(JSON.stringify(err.message)) ;
               
            } else {
                res.header('Access-Control-Allow-Origin','*');
                res.header('Access-Control-Allow-Headers','Content-Type');
                res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE,OPTIONS');
                res.contentType('application/json').status(200);
                res.send(JSON.stringify("1"))   ; 
                
            }
            // Release the connection
            connection.release(
                function (err) {
                    if (err) {
                        console.error(err.message);
                    } else {
                        console.log("POST /sendTablespace : Connection released");
                    }
                });
        });
    });
   
});





app.listen(4000,function(){
    console.log("Hola");
});
