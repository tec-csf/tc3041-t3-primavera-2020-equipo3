const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')

const app = new express()
const { config, engine} = require('express-edge')

const MongoClient = require('mongodb').MongoClient;
const mongo = require('mongodb')
const url = "mongodb+srv://equipo3:admin@cluster-1xa1r.gcp.mongodb.net/test?retryWrites=true&w=majority"


// Automatically sets view engine and adds dot notation to app.render
app.use(engine);
app.set('views', `${__dirname}/views`);

//Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))

app.use(express.static(path.join(__dirname, "public")))

//  HOME
app.get('/home', (req, res) => {
    //res.sendFile(path.resolve(__dirname, 'sites/index.html'))
    res.render('home')
})

//  Datos del usuario
app.get('/usuario', (req, res) => {
    //res.sendFile(path.resolve(__dirname, 'sites/Usuarios.html'))
    res.render('usuario')
})

app.get('/editarUsuario', (req, res) => {
    //res.sendFile(path.resolve(__dirname, 'sites/usuarioE.html'))
    res.render('editarUsuario')
})

app.get('/addUsuario', (req, res) => {
    //res.sendFile(path.resolve(__dirname, 'sites/usuarioE.html'))
    res.render('addUsuario')
})

app.post("/addUsusario/save", (req, res) => {
    var item = {
        uID: req.body.id,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        direccion: req.body.direccion,
        telefono: req.body.telefono
    };

    mongo.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("rappi");
        dbo.collection("usuario").insertOne(item, function (err, result) {
            if (err) throw err;
            console.log('Usuario insertado');
            db.close();
        });
    });

    res.redirect('/usuario');
});

//  fin datos del usuario

//  Datos del pedido
app.get('/pedido', (req, res) => {
    //res.sendFile(path.resolve(__dirname, 'sites/Pedidos.html'))
    res.render('pedido')
})

app.get('/addPedido', (req, res) => {
    //res.sendFile(path.resolve(__dirname, 'sites/usuarioE.html'))
    res.render('addPedido')
})

app.get('/editarPedido', (req, res) => {
    //res.sendFile(path.resolve(__dirname, 'sites/pedidoE.html'))
    res.render('editarPedido')
})
//  fin datos del pedido

//  Datos del repartidor
app.get('/repartidor', (req, res) => {
    //res.sendFile(path.resolve(__dirname, 'sites/Repartidor.html'))
    res.render('repartidor')
})

app.get('/editarRepartidor', (req, res) => {
    //res.sendFile(path.resolve(__dirname, 'sites/repartidorE.html'))
    res.render('editarRepartidor')
})

app.get('/addRepartidor', (req, res) => {
    //res.sendFile(path.resolve(__dirname, 'sites/usuarioE.html'))
    res.render('addRepartidor')
})
//  fin datos del repartidor

//  Datos de la tienda
app.get('/tienda', (req, res) => {
    //res.sendFile(path.resolve(__dirname, 'sites/Tiendas.html'))
    res.render('tienda')
})

app.get('/editarTienda', (req, res) => {
    //res.sendFile(path.resolve(__dirname, 'sites/tiendaE.html'))
    res.render('editarTienda')
})

app.get('/addTienda', (req, res) => {
    //res.sendFile(path.resolve(__dirname, 'sites/usuarioE.html'))
    res.render('addTienda')
})
//  fin dato de la tienda

app.listen(4000, () => {
    console.log('App is running in port 4000')
})