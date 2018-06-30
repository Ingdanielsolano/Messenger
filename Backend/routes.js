var dtperson= require('./personquery');

function http() {
    this.configure=function(app) {
        app.get('/person',function(request,response){
            dtperson.searchAll(response);
        })
        app.get('/person/:cedula/',function(request,response) {
            dtperson.searchId(request.params.cedula,response);            
        })
        app.get('/person/:user/',function(request,response) {
            dtperson.searchUser(request.params.id,response);            
        })
        app.post('/person/',function (request,response) {               
            dtperson.insert(request.body,response);
        })
        app.put('/person/',function(request,response) {
            dtperson.update(request.body,response);
        })
        app.post('/person/login',function (request,response) {         
            dtperson.login(request.body,response);
        })
    }
}

module.exports =new http();