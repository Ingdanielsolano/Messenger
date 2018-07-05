import { IonicStorageModule } from '@ionic/storage'
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { RegisterPage } from '../pages/Register/Register';
import { TrayPage } from '../pages/tray/tray';
import { LoginPage } from '../pages/login/login';
import { ChatPage } from "../pages/chat/chat";
import { MessagePage } from "../pages/Messages/Message";
import { TabsPage } from '../pages/tabs/tabs';

import { AuthService } from '../pages/login/auth.service';
import { PersonApi } from '../providers/person-api';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpModule } from '@angular/http';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from "@ionic-native/file";
import { Camera } from "@ionic-native/camera";

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    TrayPage,
    ChatPage,
    LoginPage,
    RegisterPage,
    MessagePage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ChatPage,
    ContactPage,
    TrayPage,
    LoginPage,
    RegisterPage,
    MessagePage,
    TabsPage
  ],
  providers: [
    IonicStorageModule,
    StatusBar,
    SplashScreen,
    PersonApi,
    AuthService,
    FileTransfer,    
    FileTransferObject,
    File,
    Camera,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
