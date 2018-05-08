import { Component, ViewChild, NgZone } from '@angular/core';
import { NavController, Platform  } from 'ionic-angular';
import { AndroidPermissions } from '@ionic-native/android-permissions';
declare var SMS: any;
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('onArriveSms') onArriveSms;
  receive_otp:any;
  code:any;
  constructor(public navCtrl: NavController, public androidPermissions: AndroidPermissions, public platform: Platform,private ngzone:NgZone) {

  }

  ionViewWillEnter() {

    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.READ_SMS).then(
      success => console.log('Permission granted'),
      err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_SMS)
    );

    this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.READ_SMS]);
  }

  ionViewDidEnter() {

    this.platform.ready().then((readySource) => {

      if (SMS) SMS.startWatch(() => {
        alert('watching started');
      }, Error => {
        alert('failed to start watching');
      });

      document.addEventListener('onSMSArrive', (e: any) => {
        var sms = e.data;
        if(sms.address == this.code)
        {
          this.ngzone.run(() => { 
            this.receive_otp = "";
            this.receive_otp = sms.body.substr(0, 6);
          })
          //this.stopWatch();
        }
        
      });

    });
  }

  stopWatch()
  {
    if (SMS) SMS.stopWatch(function () {
      console.log('watching', 'watching stopped');
    }, function () {
      console.log('failed to stop watching');
    });
  }

}
