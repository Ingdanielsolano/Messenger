var socket = io.connect('http://localhost:8081', {
    'forceNew': true
});

var session = {
    sender: 'a',
    addressee: '1'
}

socket.emit('started', session);

socket.on('messages', function (data) {        
    if (data!=[] && data.length > 0) {        
        console.log('renders if');
        document.getElementById('title').innerHTML = data[0].sender;
        render(data);
    }else{
        console.log('renders else');
        data={
            destinatario:'No messages',
            cuerpo:''            
        }
    }
});

function render(data) {
    console.log('inside render');    
    var html = data.map(function (data, index) {
        return (`<div>
                    <strong>${data.destinatario}</strong>:
                    <em>${data.cuerpo}</em>
                </div>`)
    }).join(" ");

    document.getElementById('messages').innerHTML = html;
};

function addMessage(e) {
    var payload = {
        sender: document.getElementById('sender').value,
        addressee: document.getElementById('addressee').value,
        bodytext: document.getElementById('bodytext').value
    };
    console.log(payload);
    socket.emit('new message', payload);
    socket.emit('started', session);
    return false;
};