const { Schema, model } = require('mongoose');

const AsignacionSchema = Schema({

    //no actualizar
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
  
    facturas: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Factura',
            required: true
        }
    ]

});


module.exports = model('Asignacion', AsignacionSchema);