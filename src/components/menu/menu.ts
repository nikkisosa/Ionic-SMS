import { Component } from '@angular/core';
import { NavController,MenuController,AlertController } from 'ionic-angular';
import { HomePage } from "../../pages/home/home";
@Component({
  selector: 'menu',
  templateUrl: 'menu.html'
})
export class MenuComponent {

  text: string;

  constructor(private navCtrl:NavController,private menuCtrl:MenuController,private alertCtrl:AlertController) {
  }

  menu(route)
  {
    switch (route) {
      case "otp":
        this.navCtrl.push(HomePage);
        this.menuCtrl.close();
        break;
      case "about":
        this._alert("About","SMS Tester","github:nikkisosa\nfacebook:@nikkisosa9510\nversion:1.0");
        break;
      default:
        this._alert();
        break;
    }
  }

  _alert(Title = "Development", Subtitle = "", Message = "Under development")
  {
    let alert = this.alertCtrl.create({
      title:Title,
      subTitle: Subtitle,
      message: Message,
      buttons: [{
        text: 'Ok',
        handler: () => {
        }
      }],
      enableBackdropDismiss: false
    });
    alert.present();
  }

}
