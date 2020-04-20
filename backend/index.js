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
app.set('views', `../frontend/views`);

//Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))

app.use(express.static(path.join(__dirname, "public")))

//  HOME
app.get('/', async (req, res) => {
    //res.sendFile(path.resolve(__dirname, 'sites/index.html'))
    res.render('home')
})

app.get('/home', async (req, res) => {
    res.render('home')
})
// Fin HOME 

//  Datos del usuario
app.get('/usuario/:page', async (req, res) => {

    var usuarioDat = 20;                 //cantidad de usuarios que va a desplegar
    var page = req.params.page;         //pagina reciente

    mongo.connect(url, async function (err, db) {
        if (err) throw err;
        
        var dB = db.db("rappi");
        var usuarios = await dB.collection('usuario').find({}).sort({_id: 1}).toArray();

        console.log(usuarios);
        res.render('usuario', {
            usuarios: usuarios
        })
    })

})

app.get('/editarUsuario/:uID', async (req, res) => {
    
    const idUser = req.params.uID;
    console.log(idUser)
    
    mongo.connect(url, function(err, db){
        if(err) throw err;
        var query = {uID: idUser};
        
        var dbo = db.db("rappi");
        dbo.collection("usuario").find(query).toArray(function(err, usuario) {
            if (err) throw err;
            console.log(usuario[0]);
            var usuario = usuario[0];
            dbo.close();
            
            res.render('/editarUsuario', {
                usuario
            })
        })
    })
})

app.get('/addUsuario', (req, res) => {
    //res.sendFile(path.resolve(__dirname, 'sites/usuarioE.html'))
    res.render('addUsuario')
})

app.post("/addUsusario/save", (req, res) => {
    var item = {
        uID: req.body.uID,
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

app.post("/addRepartidor/save", (req, res) => {
    var item = {
        rID: req.body.rID,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        telefono: req.body.telefono,
        placa: req.body.placa
    };

    mongo.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("rappi");
        dbo.collection("repartidor").insertOne(item, function (err, result) {
            if (err) throw err;
            console.log('Repartidor insertado');
            db.close();
        });
    });

    res.redirect('/repartidor');
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

app.post("/addTienda/save", (req, res) => {
    var item = {
        tID: req.body.tID,
        direccion: req.body.direccion,
        lat: req.body.lat,
        long: req.body.long,
        nombre: req.body.nombre,
        gerente: req.body.gerente,
        categoria: req.body.categoria,
        ganancias: req.body.ganancias
    };

    mongo.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("rappi");
        dbo.collection("tienda").insertOne(item, function (err, result) {
            if (err) throw err;
            console.log('Tienda insertado');
            db.close();
        });
    });

    res.redirect('/tienda');
})

//  fin dato de la tienda

app.listen(4000, () => {
    console.log('App is running in port 4000')
})