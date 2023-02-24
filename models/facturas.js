const { Schema, model } = require('mongoose');

const FacturasSchema = Schema({
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    productos: [{
        type: Schema.Types.ObjectId,
        ref: 'Producto',
        required: true 
    }]
});


module.exports = model('Factura', FacturasSchema);