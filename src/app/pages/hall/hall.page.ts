import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  username: string | number;
  constructor(private link: ActivatedRoute) { }

  ngOnInit() {
    this.username= this.link.snapshot.params.user;
    console.log(this.username);
  }

}
