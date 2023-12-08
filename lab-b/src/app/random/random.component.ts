import { Component, Input } from '@angular/core';
import { RandomService } from '../random.service';

@Component({
  selector: 'app-random',
  templateUrl: './random.component.html',
  styleUrls: ['./random.component.css']
})
export class RandomComponent {
  randomNumber!: number;
  @Input() max = 10;
  constructor(private randomService: RandomService) { }
  btnClick() {
    this.randomNumber = this.randomService.randomNumber(this.max);
  }
  isSmallerThanHalf(): boolean {
    return this.randomNumber < (this.max / 2);
  }
}
