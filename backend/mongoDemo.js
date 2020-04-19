var MongoClient = require("mongodb").MongoClient;
const url = "mongodb+srv://equipo3:admin@cluster-1xa1r.gcp.mongodb.net/test?retryWrites=true&w=majority"

MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("rappi");
    dbo.collection("usuario").find({}, {
        projection: {
            __id: 0
        }
    }).toArray(function (err, usuario) {
        if (err) throw err;
        console.log(usuario);
        db.close();
    });
});

MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("rappi");
    dbo.collection("tienda").find({}, {
        projection: {
            __id: 0
        }
    }).toArray(function (err, tienda) {
        if (err) throw err;
        console.log(tienda);
        db.close();
    });
});

MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("rappi");
    dbo.collection("repartidor").find({}, {
        projection: {
            __id: 0
        }
    }).toArray(function (err, repartidor) {
        if (err) throw err;
        console.log(repartidor);
        db.close();
    });
});


MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("rappi");
    dbo.collection("pedido").find({}, {
        projection: {
            __id: 0
        }
    }).toArray(function (err, pedido) {
        if (err) throw err;
        console.log(pedido);
        db.close();
    });
});