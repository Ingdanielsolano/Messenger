import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { TrayPage } from '../tray/tray';



@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = TrayPage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;

  constructor() {    
  }
}
