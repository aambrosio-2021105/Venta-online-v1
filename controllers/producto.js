const { request, response, json } = require('express');
const Producto = require('../models/producto');



const getProductosAgotados = async (req = request, res = response)=>{
    const query = { categoria: 0 };


    const listaProductos = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
           .populate('usuario', 'correo')
           .populate('categoria', 'nombre')
    ]);
    
    res.json({
        msg: 'Lista de productos activos',
        listaProductos
    });
}
const getProductosMayorV = async (req = request, res = response)=>{
    //Producto.findOne().sort('cantidadVendida');

    const query = { cantidadVendida:{$gt:10} };
    const productoVendido = await Promise.all([
        //Producto.findOne().sort('-cantidadVendida')
        Producto.countDocuments(query),
        Producto.find(query)
    ])

    res.json({
        msg: 'Lista de productos activos',
        productoVendido
    });
}
const getProductos = async (req = request, res = response) => {
 
     //condiciones del get
     const query = { disponible: true };

     const listaProductos = await Promise.all([
         Producto.countDocuments(query),
         Producto.find(query)
            .populate('usuario', 'correo')
            .populate('categoria', 'nombre')
     ]);
     
     res.json({
         msg: 'Lista de productos activos',
         listaProductos
     });

}


const getProductoPorId = async (req = request, res = response) => {

   const { id } = req.params;
   const prouductoById = await Producto.findById( id )
        .populate('usuario', 'nombre')
        .populate('categoria', 'nombre');

   res.status(201).json( prouductoById );

}


const postProducto = async (req = request, res = response) => {

    const { disponible, usuario, ...body } = req.body;

    const productoDB = await Producto.findOne({ nombre: body.nombre });

    //validacion si el producto ya existe
    if ( productoDB ) {
        return res.status(400).json({
            msg: `El producto ${ productoDB.nombre }, ya existe en la DB`
        });
    }

    //Generar la data a guardar
    const data = {
        ...body,
        nombre: body.nombre.toUpperCase(),
        usuario: req.usuario._id
    }

    const producto = await Producto( data );

    //Guardar en DB
    await producto.save();

    res.status(201).json( producto );
   
}


const putProducto = async (req = request, res = response) => {

    const { id } = req.params;
    const { disponible, usuario,cantidadVendida, ...restoData } = req.body;

    if ( restoData.nombre ) {
        restoData.nombre = restoData.nombre.toUpperCase();
        restoData.usuario = req.usuario._id;
    }
    
    const productoActualizado = await Producto.findByIdAndUpdate(id, restoData, { new: true });

    res.status(201).json({
        msg: 'Put Controller Producto',
        productoActualizado
    })

}

const deleteProducto = async (req = request, res = response) => {

    const { id } = req.params;
    //Eliminar fisicamente de la DB
    //const productoEliminado = await Producto.findByIdAndDelete( id );

    //Eliminar por el disponible:false
    const productoEliminado_ = await Producto.findByIdAndUpdate( id, { disponible: false}, { new: true } );

   res.json({
        msg: 'DELETE',
        //productoEliminado,
        productoEliminado_
   })

}




module.exports = {
   postProducto,
   putProducto,
   deleteProducto,
   getProductos,
   getProductoPorId,
   getProductosMayorV,
   getProductosAgotados
}
