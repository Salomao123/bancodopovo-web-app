import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card-header',
  templateUrl: './card-header.component.html',
  styleUrls: ['./card-header.component.scss']
})
export class CardHeaderComponent implements OnInit {

  @Input()
  titulo: string;

  constructor() { }

  ngOnInit() {
  }

}
