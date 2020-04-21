[{
    '$lookup': {
        'from': 'repartidor',
        'localField': 'rID',
        'foreignField': 'rID',
        'as': 'repartidor_a_cargo'
    }
}]

// Si se quiere correr en un MongoDB Compass
{
    from: 'repartidor',
    localField: 'rID',
    foreignField: 'rID',
    as: 'repartidor_a_cargo'
}
