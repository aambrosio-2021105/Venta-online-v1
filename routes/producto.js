const { Router } = require('express');
const { check } = require('express-validator');

// Middlewares
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const {  esAdminRole } = require('../middlewares/validar-roles');

//Controllers
const { postProducto, putProducto, deleteProducto, getProductos,getProductosAgotados ,getProductoPorId ,getProductosMayorV} = require('../controllers/producto');

const { existeProductoPorId } = require('../helpers/db-validators');

const router = Router();

//Manejo de rutas

//Obtener todas las productos - publico
router.get('/', getProductos );

//obtener el dato agotado 
router.get('/agotado',getProductosAgotados);
//obtener el dato mayor vendido
router.get('/mostrarVenta',getProductosMayorV);
//Obtener un producto por id - publico
router.get('/:id', [
    check('id', 'No es un id de Mongo Válido').isMongoId(),
    check('id').custom( existeProductoPorId ),
    validarCampos
],  getProductoPorId);
 
// Crear producto - privada - cualquier persona con un token válido
router.post('/agregar', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], postProducto);

// Actuaizar producto - privada - cualquier persona con un token válido
router.put('/editar/:id', [
    validarJWT,
    check('id', 'No es un id de Mongo Válido').isMongoId(),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom( existeProductoPorId ),
    validarCampos
], putProducto);

//Borrar un producto - privado - Solo el admin puede eliminar una categoria (estado: false)
router.delete('/eliminar/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un id de Mongo Válido').isMongoId(),
    check('id').custom( existeProductoPorId ),
    validarCampos
], deleteProducto);



module.exports = router;