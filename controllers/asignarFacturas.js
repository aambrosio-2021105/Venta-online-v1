const { request, response } = require('express');
const Asignacion = require('../models/asignar-facturas');
const Usuario = require('../models/usuario');
const Facturas = require('../models/facturas');

const getAsignacion = async (req = request, res = response) => {

    //condiciones del get
    const _id = req.usuario.id;
    const query = { usuario:_id };

    const listaCategorias = await Promise.all([
        Asignacion.countDocuments(query),
        Asignacion.find(query)
    ]);

    res.json({
        msg: 'get Api - Controlador Usuario',
       listaCategorias
    });

}
const postAsignacion = async (req = request, res = response) => {
    //toUpperCase para todo a Mayusculas
   
    const _id = req.usuario.id;
    const _idFactura = Facturas._id;
    // Generar la data a guardar
    const data = {
        _id,
        _idFactura
    }

    const asignacion = new Asignacion(data);
    //Guardar en DB
    await asignacion.save();

    res.status(201).json(asignacion);

}

module.exports = {
    getAsignacion,
    postAsignacion
}
