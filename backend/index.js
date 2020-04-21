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
app.set('views', `../frontend`);

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

//  Datos del pedido
app.get('/pedido/:page', async (req, res) => {
    var pedidoDat = 20; //cantidad de datos que va a desplegar
    var page = req.params.page; //pagina reciente

    mongo.connect(url, async function (err, db) {
        if (err) throw err;

        var dB = db.db("rappi");
        var pedidos = await dB.collection('pedido').find({}).sort({
            _id: 1
        }).toArray();

        //console.log(pedidos);

        res.render('pedido', {
            pedidos: pedidos
        })
    })
})

app.get('/addPedido', (req, res) => {
    res.render('addPedido');
})

app.post("/addPedido/save", (req, res) => {
    var item = {
        pID: req.body.pID,
        Hora: req.body.Hora,
        Monto: req.body.Monto,
        producto: req.body.producto,
        rID: req.body.rID,
        tID: req.body.tID,
        uID: req.body.uID
    };

    mongo.connect(url, function (err, db) {
        if (err) throw err;
        var dB = db.db("rappi");
        dB.collection("pedido").insertOne(item, function (err, result) {
            if (err) throw err;
            console.log('Pedido insertado');
            db.close();
        });
    });

    res.redirect('/home');
});

app.get('/editarPedido/:pID', async (req, res) => {

    const idPed = req.params.pID;

    mongo.connect(url, async function (err, db) {
        if (err) throw err;

        var dB = db.db("rappi");

        var search = {
            pID: idPed
        };

        dB.collection("pedido").find(search).toArray(function (err, pedido) {
            if (err) throw err;
            console.log(pedido[0]);
            var pedido = pedido[0];

            res.render('editarPedido', {
                pedido
            })
        })
    })
})

app.post("/editarPedido/save", (req, res) => {
    var idPed = req.body.pID;
    console.log(idPed);

    var pedidoComponentes = {
        pID: req.body.pID,
        Hora: req.body.Hora,
        Monto: req.body.Monto,
        producto: req.body.producto,
        rID: req.body.rID,
        tID: req.body.tID,
        uID: req.body.uID
    };

    mongo.connect(url, function (err, db) {
        if (err) throw err;
        const dB = db.db("rappi");
        const bus = {
            pID: idPed
        };

        console.log(bus);

        dB.collection("pedido").update(bus, pedidoComponentes, function (err, res) {
            if (err) throw err;
            console.log('Pedido editado correctamente');

        });

    });

    res.redirect('/home');
})

app.get('/borrarPedido/:pID', async (req, res) => {

    const idPed = req.params.pID;

    mongo.connect(url, async function (err, db) {
        if (err) throw err;

        var dB = db.db("rappi");

        var search = {
            pID: idPed
        };

        dB.collection("pedido").find(search).toArray(function (err, pedido) {
            if (err) throw err;
            console.log(pedido[0]);
            var pedido = pedido[0];

            res.render('borrarPedido', {
                pedido
            })
        })
    })
})

app.post('/borrarPedido/delete', async(req, res) =>{
    var idPedido = req.body.pID;
    console.log(idPedido);

    var pedidoComponentes={
        pID: req.body.pID,
        Hora: req.body.Hora,
        Monto: req.body.Monto,
        producto: req.body.producto,
        rID: req.body.rID,
        tID: req.body.tID,
        uID: req.body.uID
    }

    mongo.connect(url, function(err, db){
        if(err) throw err;
        const dB = db.db("rappi");
        const busID = {pID: idPedido};

        console.log(idPedido);

        dB.collection("pedido").remove(busID, pedidoComponentes, function(err, res){
            if(err) throw err;
            console.log("Pedido eliminado correctamente")
        })
    })

    res.redirect('/home');
})
//  fin datos del pedido

//  Datos del usuario
app.get('/usuario/:page', async (req, res) => {

    var usuarioDat = 20;                 //cantidad de usuarios que va a desplegar
    var page = req.params.page;         //pagina reciente

    mongo.connect(url, async function (err, db) {
        if (err) throw err;
        
        var dB = db.db("rappi");
        var usuarios = await dB.collection('usuario').find({}).sort({_id: 1}).toArray();

        //console.log(usuarios);
        res.render('usuario', {
            usuarios: usuarios
        })
    })

})

app.get('/borrarUsuario/:uID', async (req, res) => {

    const idUser = req.params.uID;

    mongo.connect(url, async function (err, db) {
        if (err) throw err;

        var dB = db.db("rappi");

        var search = { uID: idUser };

        dB.collection("usuario").find(search).toArray(function (err, usuario) {
            if (err) throw err;
            console.log(usuario[0]);
            var usuario = usuario[0];

            res.render('borrarUsuario', {
                usuario
            })
        })
    })
})

app.post("/borrarUsuario/delete", (req, res) => {
    var idUser = req.body.uID;
    console.log(idUser);

    var usuarioComponents = {
        uID: req.body.uID,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        direccion: req.body.direccion,
        telefono: req.body.telefono
    };

    mongo.connect(url, function (err, db) {
        if (err) throw err;
        const dB = db.db("rappi");
        const busID = { uID: idUser };

        console.log(busID);

        dB.collection("usuario").remove(busID, usuarioComponents, function (err, res) {
            if (err) throw err;
            console.log('Usuario eliminado correctamente');

        });

    });

    res.redirect('/home');
})

app.get('/editarUsuario/:uID', async (req, res) => {
    
    const idUser = req.params.uID;

    mongo.connect(url, async function(err, db){
        if(err) throw err;
        
        var dB = db.db("rappi");
        
        var search = {uID: idUser};

        dB.collection("usuario").find(search).toArray(function(err, usuario) {
            if (err) throw err;
            console.log(usuario[0]);
            var usuario = usuario[0];
            
            res.render('editarUsuario', {
                usuario
            })
        })
    })
})

app.post("/editarUsuario/save", (req, res) =>{
    var idUser = req.body.uID;
    console.log(idUser);
    
    var usuarioComponents ={
        uID: req.body.uID,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        direccion: req.body.direccion,
        telefono: req.body.telefono
    };
    
    mongo.connect(url, function (err, db) {
        if (err) throw err;
        const dB = db.db("rappi");
        const bus = {uID: idUser};

        console.log(bus);

        dB.collection("usuario").update(bus, usuarioComponents, function (err, res) {
            if (err) throw err;
            console.log('Usuario editado correctamente');
            
        });

    });
    
    res.redirect('/home');
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
        var dB = db.db("rappi");
        dB.collection("usuario").insertOne(item, function (err, result) {
            if (err) throw err;
            console.log('Usuario insertado');
            db.close();
        });
    });

    res.redirect('/home');
});

//  fin datos del usuario


//  Datos del repartidor
app.get('/repartidor/:page', (req, res) => {
    var pedidoDat = 20; //cantidad de datos que va a desplegar
    var page = req.params.page; //pagina reciente

    mongo.connect(url, async function (err, db) {
        if (err) throw err;

        var dB = db.db("rappi");
        var repartidores = await dB.collection('repartidor').find({}).sort({
            _id: 1
        }).toArray();

        console.log(repartidores);

        res.render('repartidor', {
            repartidores: repartidores
        })
    })
})

app.get('/borrarRepartidor/:rID', async (req, res) => {
    const idRepartidor = req.params.rID;
    
    mongo.connect(url, async function(err, db){
        if(err) throw err;

        var dB = db.db("rappi");
        var search = {rID: idRepartidor};

        dB.collection("repartidor").find(search).toArray(function(err, repartidor){
            if(err) throw (err);
            console.log(repartidor[0]);
            var repartidor = repartidor[0];

            res.render('borrarRepartidor',{
                repartidor
            })
        })
    })
})

app.post("/borrarRepartidor/delete", (req, res) => {
    var idRepartidor = req.body.rID;
    console.log(idRepartidor);

    var repartidorComponents = {
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
        const dB = db.db("rappi");

        const busID = {
            rID: idRepartidor
        };

        console.log(busID);

        dB.collection("repartidor").remove(busID, repartidorComponents, function (err, res) {
            if (err) throw err;
            console.log('Repartidor eliminado correctamente');

        });

    });

    res.redirect('/home');
})

app.get('/editarRepartidor/:rID', async (req, res) => {
    const idRepartidor = req.params.rID;

    mongo.connect(url, async function (err, db) {
        if (err) throw err;

        var dB = db.db("rappi");
        var search = {
            rID: idRepartidor
        };

        dB.collection("repartidor").find(search).toArray(function (err, repartidor) {
            if (err) throw err;
            console.log(repartidor[0]);
            var repartidor = repartidor[0];

            res.render('editarRepartidor', {
                repartidor
            })
        })
    })
})

app.post('/editarRepartidor/save', (req, res) => {
    var idRepartidor = req.body.rID;
    console.log(idRepartidor);

    var repartidorComponentes = {
        rID: req.body.rID,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        telefono: req.body.telefono,
        placa: req.body.placa
    };

    mongo.connect(url, function (err, db) {
        if (err) throw err;
        const dB = db.db("rappi");
        const bus = {
            rID: idRepartidor
        };

        console.log(bus);
        dB.collection("repartidor").update(bus, repartidorComponentes, function (err, res) {
            if (err) throw err;
            console.log("Repartidor actualizado correctamente");
        })
    })

    res.redirect('/home');
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
        var dB = db.db("rappi");
        dB.collection("repartidor").insertOne(item, function (err, result) {
            if (err) throw err;
            console.log('Repartidor insertado');
            db.close();
        });
    });

    res.redirect('/home');
})
//  fin datos del repartidor

//  Datos de la tienda
app.get('/tienda/:page', async (req, res) => {
    var tiendaDat = 20; //cantidad de usuarios que va a desplegar
    var page = req.params.page; //pagina reciente

    mongo.connect(url, async function (err, db) {
        if (err) throw err;

        var dB = db.db("rappi");
        var tiendas = await dB.collection('tienda').find({}).sort({
            _id: 1
        }).toArray();

        console.log(tiendas);
        res.render('tienda', {
            tiendas: tiendas
        })
    })
})

app.get('/borrarTienda/:tID', async (req, res) => {

    const idTienda = req.params.tID;

    mongo.connect(url, async function (err, db) {
        if (err) throw err;

        var dB = db.db("rappi");

        var search = {
            tID: idTienda
        };

        dB.collection("tienda").find(search).toArray(function (err, tienda) {
            if (err) throw err;
            console.log(tienda[0]);
            var tienda = tienda[0];

            res.render('borrarTienda', {
                tienda
            })
        })
    })
})

app.post("/borrarTienda/delete", (req, res) => {
    var idTienda = req.body.tID;
    console.log(idTienda);

    var tiendaComponents = {
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
        const dB = db.db("rappi");

        const busID = {
            tID: idTienda
        };

        console.log(busID);

        dB.collection("tienda").remove(busID, tiendaComponents, function (err, res) {
            if (err) throw err;
            console.log('Tienda eliminada correctamente');

        });

    });

    res.redirect('/home');
})

app.get('/editarTienda/:tID', (req, res) => {
    const idTienda = req.params.tID;

    mongo.connect(url, async function (err, db) {
        if (err) throw err;

        var dB = db.db("rappi");
        var search = {
            tID: idTienda
        };

        dB.collection("tienda").find(search).toArray(function (err, tienda) {
            if (err) throw err;
            console.log(tienda[0]);
            var tienda = tienda[0];

            res.render('editarTienda', {
                tienda
            })
        })
    })
})

app.post('/editarTienda/save', (req, res) => {
    var idTienda = req.body.tID;
    console.log(idTienda);

    var tiendaComponents = {
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
        const dB = db.db("rappi");
        const bus = {
            tID: idTienda
        };

        console.log(bus);
        dB.collection("tienda").update(bus, tiendaComponents, function (err, res) {
            if (err) throw err;
            console.log("Tienda editada correctamente");
        })
    })
    res.redirect('/home');
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
        var dB = db.db("rappi");
        dB.collection("tienda").insertOne(item, function (err, result) {
            if (err) throw err;
            console.log('Tienda insertado');
            db.close();
        });
    });

    res.redirect('/home');
})

//  fin dato de la tienda

//Aggregation operations
/*
app.get('/lookup', (req, res) => {

    mongo.connect(url, async function (err, db) {
        if (err) throw err;

        var dB = db.db("rappi");

        var consL = {
            $lookup: {
                from: 'repartidor',
                localField: 'rID',
                foreignField: 'rID',
                as: 'repartidor_a_cargo'
            }
        }

        await dB.collection('pedido').aggregate(consL).toArray(function (err, lookUP){
            if (err) throw err;

            console.log(lookUP);

            res.render('lookup', {
                pedido: lookUP
            })
        });
    })
})

app.get('/facet', (req, res) =>{
    
    var consF = {
        $facet: {
            "ProductosMasVendidos": [{
                    "$unwind": "$producto"
                },
                {
                    "$sortByCount": "$producto"
                }
            ]
        }
    }

    //console.log(consF);

    mongo.connect(url, async function(err, db){
        if (err) throw err;

        var dB = db.db("rappi");

        mongo.connect(url, async function(err, db){
            
            if(err) throw err;
            var dB = db.db("rappi");

            await dB.collection('pedido').aggregate(consF).toArray(function(err, faceT){
                console.log(faceT);

                res.render('facet', {
                    pedido: faceT
                })

            });

        })
    })

})
*/

app.listen(4000, () => {
    console.log('App is running in port 4000')
})