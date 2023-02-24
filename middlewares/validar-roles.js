const { request, response } = require('express');

//Verificador si es admin
const esAdminRole = (req = request, res = response, next) => {
    //Si no viene el usuario
    if ( !req.usuario ) {
        return res.status(500).json({
            msg: 'Se require verificar el role sin validar el token primero'
        });
    }

    //Verificar que le rol sea ADMIN_ROLE
    const { rol, nombre } = req.usuario;
    if ( rol !== 'ADMIN_ROLE' ) {
        return res.status(500).json({
            msg: `${ nombre } no es Administrador - No tiene acceso a esta función`
        });
    }

    next();


}





module.exports = {

    esAdminRole
}