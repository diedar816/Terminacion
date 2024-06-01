const { app } = require('./config');
const db = require('./db');
const bodyParser = require('body-parser');
const session = require('express-session');
const mysql = require('mysql');
const bcrypt = require('bcrypt');

/*Se tiene su propio servidor, cada sesion tiene un token*/

app.use(session({
    secret: 'mysecretKey',
    resave: false,
    saveUninitialized: true

}));
/*Se configura el body Parser*, para analizar solicitud de guardar información de tipo POST*/
app.use(bodyParser.urlencoded({ extended: true }));

//Rutas para las vistas:

//Ruta para el index

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
    res.redirect('index');
});
// Rutas Ejs
app.get('/consultas', (req, res) => {
    res.render('consultas');
});

app.get('/index', (req, res) => {
    res.render('index');
});

app.get('/loginsesion', (req, res) => {
    res.render('loginsesion');
});

app.get('/registros', (req, res) => {
    res.render('registros');
});


//Defirnir ruta para el formulario de logueo de sesión
app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/public/login.html');
});

//Defirnir ruta para la muestra de resultado de consultas
app.get('/resultados', (req, res) => {
    res.sendFile(__dirname + '/public/resultados.html');
    res.redirect('consultas');
});





//Defirnir ruta para el formulario de registro de sesión
app.get('/registro', (req, res) => {
    res.sendFile(__dirname + '/public/registro.html');
});

//Para la seguridad

//Middleware para proteger rutas
function isAthenticated(req, res, next){
    if(req.session.usuario){
        return next();
    }else{
        res.redirect('login');
    }
}

//Defirnir ruta para el formulario de registro de sesión

 //Rutas de db
//Puedes implementar rutas para el registro, inicio de sesión, cierre de sesión.//post porque lo ingreso un usuario desde un formulario
app.post('/registro', async (req, res) => {
    const { nombre, apellido, telefono, email, dirección, codigoCompraCliente, contraseña} = req.body;
    const hashedContraseña = await bcrypt.hash(contraseña, 10);

    db.query('INSERT INTO compradores (nombre, apellido, telefono, email, dirección, codigoCompraCliente, contraseña) VALUES (?, ?, ?, ?, ?, ?, ?)',[nombre, apellido, telefono, email, dirección, codigoCompraCliente, hashedContraseña],(err, result)=>{
        if(err) {
            console.log(err);
            res.send('Error al registrar usuario');
        } else {
            console.log(result);
            res.redirect('/');
            
        }
    });
});

//Rutas Ejs

//Ruta para insertar datos con el formulario registros Ejs

app.post('/registros', async (req, res) => {
    const { nombre, apellido, telefono, email, dirección, codigoCompraCliente, contraseña} = req.body;
    const hashedContraseña = await bcrypt.hash(contraseña, 10);

    db.query('INSERT INTO compradores (nombre, apellido, telefono, email, dirección, codigoCompraCliente, contraseña) VALUES (?, ?, ?, ?, ?, ?, ?)',[nombre, apellido, telefono, email, dirección, codigoCompraCliente, hashedContraseña],(err, result)=>{
        if(err) {
            console.log(err);
            res.send('Error al registrar usuario');
        } else {
            console.log(result);
            res.render('index', {message: 'Nos pondremos en contacto contigo en la brevedad.'});
            
        }
    });
});

 
//Ruta de inicio de sesión
app.post('/login', async (req, res) => {
    const { email, contraseña } = req.body;

    db.query('SELECT * FROM compradores WHERE email = ?', [email], async (err, result) => {
        if(err){
            console.log(err);
            res.send('Error al iniciar sesión');
        } else {
            if(result.length > 0) {
                const usuario = result[0];
                if(await bcrypt.compare(contraseña, usuario.contraseña)){
                    req.session.usuario = usuario;
                    const y = usuario;
                    const veremail = y.email;
                    console.log("Email a verificar  " + veremail);
                    db.query('SELECT nombre,apellido,telefono,email,dirección,codigo_compra,tipo_producto,cantidad,fecha FROM compradores as c INNER JOIN pedidos as pe ON c.codigoCompraCliente=pe.codigo_compra INNER JOIN productos as pr ON pe.productos_id = pr.id WHERE c.email = ?', [veremail], async (error, resultados, campos) => {
                        if (error) {
                          console.error('Error al ejecutar la consulta:', error);
                          return;
                        }
                        
                        var data = JSON.parse(JSON.stringify(resultados));
                        p = data[0].nombre;
                        console.log(typeof p);
                        console.log(p);

                        q = data[0].apellido;
                        console.log(typeof q);
                        console.log(q);
                                                
                        r = data[0].telefono;
                        console.log(typeof r);
                        console.log(r);

                        s = data[0].email;
                        console.log(typeof s);
                        console.log(s);

                       t = data[0].email;
                       console.log(typeof t);
                       console.log(t);

                         u = data[0].email;
                        console.log(typeof u);
                      console.log(u);

                     v = data[0].dirección;
                    console.log(typeof v);
                     console.log(v);

                    w = data[0].dirección;
                    console.log(typeof w);
                    console.log(w);

                    x = data[0].codigo_compra;
                    console.log(typeof x);
                    console.log(x);

                    o = data[0].tipo_producto;
                    console.log(typeof o);
                    console.log(o);

                    m = data[0].cantidad;
                    console.log(typeof m);
                    console.log(m);

                    n = data[0].fecha;
                    console.log(typeof n);
                    console.log(n);


                      
                });
                     
                      
                    res.redirect('/resultados');
                    

                    
                } else {
                    res.send('Credenciales incorrectas');
                }
            } else {
                
                res.redirect('/');
            }
        }
    });
});

//Ruta para inicio de sesion y muestra de resultados en consulta con los formularios loginsesion y consultas Ejs

app.post('/loginsesion', async (req, res) => {
    const { email, contraseña } = req.body;

    db.query('SELECT * FROM compradores WHERE email = ?', [email], async (err, result) => {
        if(err){
            console.log(err);
            res.send('Error al iniciar sesión');
        } else {
            if(result.length > 0) {
                const usuario = result[0];
                if(await bcrypt.compare(contraseña, usuario.contraseña)){
                    req.session.usuario = usuario;
                    const y = usuario;
                    const veremail = y.email;
                    console.log("Email a verificar  " + veremail);
                    db.query('SELECT nombre,apellido,telefono,email,dirección,codigo_compra,tipo_producto,cantidad,fecha FROM compradores as c INNER JOIN pedidos as pe ON c.codigoCompraCliente=pe.codigo_compra INNER JOIN productos as pr ON pe.productos_id = pr.id WHERE c.email = ?', [veremail], async (error, resultados, campos) => {
                        if (error) {
                          console.error('Error al ejecutar la consulta:', error);
                          return;
                        }
                        //console.log(typeof(resultados));
                        //console.log(resultados);
                        var data = JSON.parse(JSON.stringify(resultados));
                        p = data[0].nombre;
                        console.log(typeof p);
                        console.log(p);

                        q = data[0].apellido;
                        console.log(typeof q);
                        console.log(q);
                                                
                        r = data[0].telefono;
                        console.log(typeof r);
                        console.log(r);

                        s = data[0].email;
                        console.log(typeof s);
                        console.log(s);

                       t = data[0].email;
                       console.log(typeof t);
                       console.log(t);

                         u = data[0].email;
                        console.log(typeof u);
                      console.log(u);

                     v = data[0].dirección;
                    console.log(typeof v);
                     console.log(v);

                    w = data[0].dirección;
                    console.log(typeof w);
                    console.log(w);

                    x = data[0].codigo_compra;
                    console.log(typeof x);
                    console.log(x);

                    o = data[0].tipo_producto;
                    console.log(typeof o);
                    console.log(o);

                    m = data[0].cantidad;
                    console.log(typeof m);
                    console.log(m);

                    n = data[0].fecha;
                    console.log(typeof n);
                    console.log(n);
                    let fecha_actual = n;
                    h =  fecha_actual.getDate();
                    console.log(h);

                    //const f = document.getElementById("f");

                    //f.innerHTML = p;

                      
                });
                     
                      
                    
                    res.render('consultas', {p,q,r,u,w,x,o,m,n});
                    res.redirect('/consultas');
                    

                    //res.send('Inicio de sesión exitoso');
                } else {
                    res.send('Credenciales incorrectas');
                }
            } else {
                //res.send('Usuario no encontrado');
                //res.redirect('/');
                res.render('index', {});
            }
        }
    });
});

module.exports = app;

