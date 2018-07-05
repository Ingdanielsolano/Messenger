import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController } from 'ionic-angular';
import { Usuario } from '../../Class/usuario';
import { PersonApi } from "../../providers/person-api";
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Camera, CameraOptions } from '@ionic-native/camera';


@Component({
  selector: 'page-Register',
  templateUrl: 'Register.html'
})
export class RegisterPage {

  usua: Usuario = new Usuario();
  public dato;
  Rpass: string;
  very: string;
  imageURI: any;
  imageFileName: any;

  constructor(public navCtrl: NavController,
    public PersonApi: PersonApi,
    private transfer: FileTransfer,
    private camera: Camera,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController) { }

  getImage() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }
    this.camera.getPicture(options).then((imageData) => {
      this.imageURI = imageData;
    }, (err) => {
      console.log(err);
      this.presentToast(err);
    })
  }



  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }


  Register() {
    if (this.usua.cedula != this.Rpass &&
      this.usua.nombre != "" &&
      this.usua.apellido != "" &&
      this.usua.usuario != "" &&
      this.usua.contrasena != "") {
      let loader = this.loadingCtrl.create({
        content: "Uploading..."
      });
      loader.present();
      const fileTransfer: FileTransferObject = this.transfer.create();

      let options: FileUploadOptions = {
        fileKey: 'ionicfile',
        fileName: 'ionicfile',
        chunkedMode: false,
        mimeType: "image/jpeg",
        headers: {}
      }
      console.log("into");
      fileTransfer.upload(this.imageURI, 'http://localhost:8080/person/uploadImage', options)
        .then((data) => {
          console.log(data + " Uploaded Successfully");
          this.imageFileName = "http://localhost:8080/images/ionicfile.jpg"
          loader.dismiss();
          this.presentToast("Image uploaded successfully");
        }, (err) => {
          console.log(err);
          loader.dismiss();
          this.presentToast(err);
        });

      this.PersonApi.registerPerson(this.usua)
        .subscribe(
          rt => console.log(rt),
          er => console.log(er),
          () => console.log()
        )



    } else {
      this.very = "Some field is wrong, please check.";
    }

  }
}
