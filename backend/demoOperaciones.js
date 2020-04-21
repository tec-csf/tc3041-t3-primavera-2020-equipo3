const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')

const app = new express()
const {
    config,
    engine
} = require('express-edge')

const MongoClient = require('mongodb').MongoClient;
const mongo = require('mongodb')
const url = "mongodb+srv://equipo3:admin@cluster-1xa1r.gcp.mongodb.net/test?retryWrites=true&w=majority"


// Automatically sets view engine and adds dot notation to app.render
app.use(engine);
app.set('views', `../frontend`);

//Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(express.static(path.join(__dirname, "public")))

//
MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dB = db.db("rappi");
    dB.collection('pedido').aggregate([{
            $facet: {
            "ProductosMasVendidos": [{
                    "$unwind": "$producto"
                },
                {
                    "$sortByCount": "$producto"
                }
            ]
            }
        }]).toArray(function (err, res) {
        if (err) throw err;
        console.log(JSON.stringify(res));
        db.close();
    });
});



//  $lookup
/*
MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dB = db.db("rappi");
    dB.collection('pedido').aggregate([
        {
            $lookup: {
                from: 'repartidor',
                localField: 'rID',
                foreignField: 'rID',
                as: 'repartidor_a_cargo'
            }
    }]).toArray(function (err, res) {
        if (err) throw err;
        console.log(JSON.stringify(res));
        db.close();
    });
});
*/