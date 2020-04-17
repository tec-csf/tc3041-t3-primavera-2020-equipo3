const path = require('path')
const express = require('express')
const { config, engine} = require('express-edge')

const app = new express()

// Automatically sets view engine and adds dot notation to app.render
app.use(engine);
app.set('views', `${__dirname}/views`);

app.use(express.static(path.join(__dirname, "public")))

//  HOME
app.get('/', (req, res) => {
    //res.sendFile(path.resolve(__dirname, 'sites/index.html'))
    res.render('index')
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
    res.render('editarTienda')
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