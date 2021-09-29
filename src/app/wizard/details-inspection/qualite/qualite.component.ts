import { Component, OnInit,OnChanges,Input,SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-qualite',
  templateUrl: './qualite.component.html',
  styleUrls: ['./qualite.component.css']
})
export class QualiteComponent implements OnInit,OnChanges  {
  @Input() inspec :any;
  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
   

  }

  ngOnInit(): void {
   
  }

}