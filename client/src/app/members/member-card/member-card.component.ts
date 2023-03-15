import { ViewEncapsulation } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { Members } from 'src/app/_models/member';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css'],
  //encapsulation:ViewEncapsulation.
})
export class MemberCardComponent implements OnInit {
  @Input() member: Members | undefined;


  constructor() { }

  ngOnInit(): void {
  }

}
