import { Injectable } from '@angular/core';
import {
  ToastController,
  ModalController,
  AlertController,
  LoadingController,
  PickerController,
  ActionSheetController
} from '@ionic/angular';
import { User } from 'src/app/interfaces/user.model';


@Injectable({
  providedIn: 'root'
})
export class BasicService {

  constructor(
    private actionSheetCtrl: ActionSheetController,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private pikerCtrl: PickerController,
    private modalCtrl: ModalController
  ) {

  }

  public setUserOnSession(data: User) {
    sessionStorage.user = data.username;
    sessionStorage.email = data.email;
    sessionStorage.id = data.id;
    }

  public nullUserOnSession() {
    sessionStorage.user = null;
    sessionStorage.email = null;
    sessionStorage.id = null;
  }

  public getUserOnSession() {
    return {
      userName: sessionStorage.userName,
      email: sessionStorage.email,
      id: sessionStorage.id,
      password: null,
      confirmPassword: null
    }
  }

  public getNums(min, max) {
    const arr = [];

    for(let i = min; i <= max; i++) {
      arr.push({ description: i, id: i });
    }

    return arr;
  }

  public checkField(fields: any[]) {
    let flag = true;

    fields.forEach(element => {
      if(element.length <= 0) {
        flag = false;
      }
    });

    return flag;
  }

  public async modal(component) {
    const modal = await this.modalCtrl.create({
      component
    });

    await modal.present();
  }

  public async picker(name , colum, buttons) {
    const aux = [];

    colum.forEach(element => {
      aux.push({ text: element.description, value: element.id });
    });

    const piker = await this.pikerCtrl.create({
      columns: [{ name, options: aux }],
      buttons,

    });

    await piker .present();
  }

  public async actionSheet(header, buttons: any[]) {
    const actionSheet = await this.actionSheetCtrl.create({
      header,
      buttons
    });

    await actionSheet.present();
  }

  public async loading(message: string, duration: number) {
    const loading = await this.loadingCtrl.create({
      message,
      duration
    });

    await loading.present();
  }

  public async toast(message: string, duration: number, position) {
    const toast = await this.toastCtrl.create({
      message,
      duration,
      position
    });
    await toast.present();
  }

  public async alert(header: string, message: string, buttons: any[]) {
    const alert = await this.alertCtrl.create({
      header,
      message,
      buttons
    });

    await alert.present();
  }

  public async alertWithInputs(header: string, message: string, inputs: any[],  buttons: any[]) {
    const alert = await this.alertCtrl.create({
      header,
      message,
      inputs,
      buttons
    });

    await alert.present();
  }
}
