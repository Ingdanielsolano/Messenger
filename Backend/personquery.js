var connection = require('./connection');
var jwt = require('jsonwebtoken');
function MethodsDb(params) {
    this.searchAll = function (response) {
        connection.obtain(function (er, cn) {
            cn.query('select Cedula,Nombre,Apellido,Usuario from persona', function (error, result) {
                cn.release();
                if (error) {
                    response.send({ estado: 'Error' });
                } else {
                    response.send(result);
                }
            })
        })
    }
    this.searchId = function (cedula, response) {
        connection.obtain(function (er, cn) {
            cn.query('select Cedula,Nombre,Apellido,Usuario from persona where cedula=?', cedula, function (error, result) {
                cn.release();
                if (error) {
                    response.send({ estado: 'Error' });
                } else {
                    response.send(result);
                }
            })
        })
    }
    this.searchUser = function (user, response) {
        connection.obtain(function (er, cn) {
            cn.query('select Cedula,Nombre,Apellido,Usuario from persona where Usuario=?', user, function (error, result) {
                cn.release();
                if (error) {
                    response.send({ estado: 'Error' });
                } else {
                    response.send(result);
                }
            })
        })
    }
    this.insert = function (req,data, response) {
        var form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
            var oldpath = files.filetoupload.path;
            var newpath = './' + files.filetoupload.name;
            fs.copyFile(oldpath, newpath, function (err) {
                if (err) {
                    console.log(err)
                    response.send({ estado: 'Error' });
                } else {
                    connection.obtain(function (er, cn) {
                        cn.query(`INSERT INTO Persona (Cedula,Nombre,Apellido,Usuario,Contrasena) VALUES('${data.cedula}','${data.nombre}','${data.apellido}','${data.usuario}',MD5('${data.contrasena}'));`, function (error, result) {
                            cn.release();
                            if (error) {
                                response.send({ estado: 'Error' });
                            } else {
                                response.send({ estado: 'Ok' });
                            }
                        })
                    })
                }
            });
        });

    }
    this.update = function (data, response) {
        connection.obtain(function (er, cn) {
            cn.query(`update persona set Nombre='${data.nombre}', Apellido='${data.apellido}',Contrasena=MD5('${data.contrasena}') where Cedula='${data.cedula}';`, function (error, result) {
                cn.release();
                if (error) {
                    response.send({ estado: 'Error' });
                } else {
                    response.send({ estado: 'Ok' });
                }
            })
        })
    }
    this.login = function (data, response) {
        connection.obtain(function (er, cn) {
            cn.query(`select * from persona where Usuario='${data.usuario}' and Contrasena=MD5('${data.contrasena}')`, function (error, result) {
                cn.release();
                if (error) {
                    response.send({ estado: 'Error' });
                } else {
                    if (result.length == 0) {
                        response.send(false);
                    } else {
                        var token = jwt.sign({ user: data.usuario }, 'secreto', { expiresIn: '120s' });
                        response.send(token);
                    }
                }
            })
        })
    }
}

module.exports = new MethodsDb();