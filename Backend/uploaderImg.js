var formidable = require('formidable');
var fs = require('fs');


function Upload() {
    this.saveImage = function (response) {
        var form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
            console.log(files);
            var oldpath = files.filetoupload.path;
            var newpath = './' + files.filetoupload.name;
            fs.copyFile(oldpath, newpath, function (err) {
                if (err) {
                    console.log(err)
                    response.send({estado:'Error'});
                }else{
                    response.send({estado:'Ok'});
                }                
            });
        });
    }
}
module.exports= new Upload();