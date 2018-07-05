var express = require('express');
var server = require('http').Server(app);
var app = express();
var io = require('socket.io').listen(8081);
var bodyparser = require('body-parser');
var connection = require('./connection');
var data;
var cors = require('cors');
var routes = require('./routes');
var expressjwt = require('express-jwt');
var formidable=require('formidable');

app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());
app.use(cors());
app.use(expressjwt({
        secret: 'secreto'
    })
    .unless({
        path: [
            '/person/login',
            '/person/',
            '/upload/'
        ]
    }));
routes.configure(app);

connection.start();
io.on('connection', function (socket) {
    socket.on('started', function (data) {
        Tray(data);
    })
    socket.on('chatting', function (data) {
        Chat(data);
    })
    socket.on('new message', function (data) {
        connection.obtain(function (er, cn) {
            cn.query(`call incrementador((select cedula from persona where Usuario='${data.sender}'),(select cedula from persona where Usuario='${data.addressee}'),'${data.bodytext}')`, function (error, result) {
                if (error) {
                    socket.emit('messages', 'The connection is having problems');
                } else {                    
                    Chat(data);
                }
            })
        })
    })
});

function Chat(data) {
    console.log('Somebody has started to chat with ' + data.sender + ' and ' + data.addressee);
    connection.obtain(function (er, cn) {
        cn.query(`Select * from mensaje inner join persona p on p.Cedula=remitente where remitente=(select cedula from persona where Usuario='${data.sender}') and destinatario=(select cedula from persona where Usuario='${data.addressee}') or remitente=(select cedula from persona where Usuario='${data.addressee}') and destinatario=(select cedula from persona where Usuario='${data.sender}') order by id asc;`, function (error, result) {            
            cn.release();
            if (error) {
                socket.emit('chats', 'The connection is having problems');
            } else {
                io.sockets.emit('chats', result);
            }
        })
    })
}

function Tray(data) {
    var remits = [];
    var remits2 = [];
    var remits3 = [];
    var envis = [];
    var envis2 = [];
    var envis3 = [];
    var total = [];
    var guard = true;
    console.log('Somebody has started to chat with ' + data.sender);
    connection.obtain(function (er, cn) {
        cn.query(`select Id,remitente,destinatario,cuerpo,Usuario from mensaje inner join persona p on p.Cedula=remitente where destinatario=(select cedula from persona where Usuario='${data.sender}') order by id desc;`, function (error, result) {
            if (error) {
                console.log(error);
                socket.emit('messages', 'The connection is having problems');
            } else {
                remits = result;
                for (i = 0; i < remits.length; i++) {
                    remits2[i] = remits[i];
                    for (j = 0; j < remits2.length; j++) {
                        if (i != j) {
                            if (remits[i].remitente == remits2[j].remitente) {
                                guard = false;
                            }
                        }
                    }
                    if (guard == true) {
                        remits3.push(remits2[i]);
                    } else {
                        guard = true;
                    }
                }

            }
        });
        cn.query(`select Id,remitente,destinatario,cuerpo,Usuario from mensaje inner join persona p on p.Cedula=destinatario where remitente=(select cedula from persona where Usuario='${data.sender}') order by id desc;`, function (error, result) {
            if (error) {
                socket.emit('messages', 'The connection is having problems');
            } else {
                envis = result;
                for (i = 0; i < envis.length; i++) {
                    envis2[i] = envis[i];
                    for (j = 0; j < envis2.length; j++) {
                        if (i != j) {
                            if (envis[i].destinatario == envis2[j].destinatario) {
                                guard = false;
                            }
                        }
                    }
                    if (guard == true) {
                        envis3.push(envis2[i]);
                    } else {
                        guard = true;
                    }
                }
                if (envis3.length < remits3.length) {

                    for (i = 0; i < envis3.length; i++) {

                        for (j = 0; j < remits3.length; j++) {

                            if (envis3[i] != null && remits3[j] != null) {

                                if (remits3[j].remitente == envis3[i].destinatario) {
                                    if (envis3[i].Id < remits3[j].Id) {
                                        envis3[i] = null;
                                    } else {
                                        remits3[j] = null;
                                    }
                                } else {

                                }
                            }
                        }
                    }
                } else {

                    for (i = 0; i < remits3.length; i++) {
                        for (j = 0; j < envis3.length; j++) {
                            if (envis3[j] != null && remits3[i] != null) {
                                if (remits3[i].remitente == envis3[j].destinatario) {
                                    if (remits3[i].Id < envis3[j].Id) {
                                        remits3[i] = null;
                                    } else {
                                        envis3[j] = null;
                                    }
                                }

                            }
                        }
                    }
                }
                for (var i = 0; i < remits3.length; i++) {
                    if (remits3[i] != null) {
                        total.push(remits3[i]);
                    }
                }
                for (var i = 0; i < envis3.length; i++) {
                    if (envis3[i] != null) {
                        total.push(envis3[i]);
                    }
                }
                io.sockets.emit('messages'+data.sender, total);
            }
        });
    })

}



var server = app.listen(8080, function () {
    console.log('Escuchando en el puerto', server.address().port);
})