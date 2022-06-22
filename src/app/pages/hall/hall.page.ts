import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-hall',
  templateUrl: './hall.page.html',
  styleUrls: ['./hall.page.scss'],
})
export class HallPage implements OnInit {

  @ViewChild(IonSlides) slides: IonSlides;
  rush='rush';
  normal='normal';
  constructor() { }

  ngOnInit() {
  }

}
