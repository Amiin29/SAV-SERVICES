import { Component, OnChanges, OnInit,SimpleChanges,Input } from '@angular/core';

@Component({
  selector: 'app-reception',
  templateUrl: './reception.component.html',
  styleUrls: ['./reception.component.css']
})
export class ReceptionComponent implements OnInit,OnChanges {
  @Input() inspec :any;
  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {



  }
  ngOnInit(): void {
    console.log ('******************')
    console.log(this.inspec)
  }

}