import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-mini-card',
  templateUrl: './mini-card.component.html',
  styleUrls: ['./mini-card.component.css']
})
export class MiniCardComponent {
  @Input() icon: string;
  @Input() title: string;
  @Input() color: string;
  @Input() gender: string;
  @Input() ageRange: string;
  @Input() itemCount: number;
  @Input() avgPricePaid: number;

  constructor() { }

}
