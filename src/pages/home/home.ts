import { Component, ViewChild, NgZone } from '@angular/core';
import { NavController, Platform,MenuController  } from 'ionic-angular';
import { AndroidPermissions } from '@ionic-native/android-permissions';
declare var SMS: any;
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('onArriveSms') onArriveSms;
  private receive_otp:any;
  private code:any;
  private watcher:boolean = false;
  private logs = [];
  private indexOne:number;
  private indexTwo:number;
  constructor(public navCtrl: NavController, public androidPermissions: AndroidPermissions, public platform: Platform,private ngzone:NgZone,private menuCtrl: MenuController) {

  }

  menus()
  {
    this.menuCtrl.open();
  }

  console(data)
  {
    this.logs.push({"output":data});
  }

  ionViewWillEnter() {

    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.READ_SMS).then(
      success => this.console('Permission granted'),
      err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_SMS)
    );

    this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.READ_SMS]);
  }

  ionViewDidEnter() {
    this.otp_reader();
  }


  startWatch()
  {
    if (SMS) SMS.startWatch(() => {
      this.console('Watching started');
    }, Error => {
      this.console('Failed to start watching');
    });
  }

  stopWatch()
  {
    if (SMS) SMS.stopWatch(() => {
      this.console('Watching stopped');
    }, Error => {
      this.console('Failed to stop watching');
    });
  }

  watchSwitch()
  {
    if(this.watcher == true)
    {
      this.watcher = false;
      this.stopWatch();
     
    }
    else if(this.watcher == false)
    {
      this.watcher = true;
      this.startWatch();
      this.otp_reader();
    }
  }

  otp_reader()
  {
    this.platform.ready().then((readySource) => {

      if (this.watcher == true) {
        
        document.addEventListener('onSMSArrive', (e: any) => {
          var sms = e.data;
          if (sms.address == this.code) {
            this.ngzone.run(() => {
              this.receive_otp = "";
              this.receive_otp = sms.body.substr(this.indexOne, this.indexTwo);
              this.console("Receive new otp");
            })

          }
          else {
            this.ngzone.run(()=>{
              this.console("Receive new sms from other no#");
            })
          }

        });
      }
      else {
        this.console("Enable watcher to read incoming sms");
      }
    });
  }

}
