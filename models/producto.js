const { Schema, model } = require('mongoose');

const ProductoSchema = Schema({
    nombre: {
        type: String,
        required: [true , 'El nombre de la cateogira es obligatorio'],
        unique: true
    }, 
  
    //no actualizar
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    precio: {
        type: Number,
        default: 0
    },
    cantidad:{
        type: Number,
        default: 0
    },
    //no actualizar
    cantidadVendida:{
        type: Number,
        default: 0
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true
    },
    descripcion: { 
        type: String 
    },
    //lo cambiamos por estado ya que es lo mismo la disponibiladad
    disponible: { 
        type: Boolean,
        default: true,
        required: true
    },

});


module.exports = model('Producto', ProductoSchema);