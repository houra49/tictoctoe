import { Component, Input, OnInit } from '@angular/core';
import { SquareEnum } from './squareEnum';

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.css']
})
export class SquareComponent implements OnInit {
  @Input() public piece: SquareEnum = SquareEnum.Empty;
  @Input() public row! : Number;
  @Input() public col! : Number;

  constructor() { }

  ngOnInit(): void {
  }

}
