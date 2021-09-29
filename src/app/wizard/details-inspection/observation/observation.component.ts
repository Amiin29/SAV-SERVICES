import { Component, OnInit,Input,SimpleChanges,OnChanges } from '@angular/core';

@Component({
  selector: 'app-observation',
  templateUrl: './observation.component.html',
  styleUrls: ['./observation.component.css']
})
export class ObservationComponent implements OnInit,OnChanges {
  @Input() inspec :any;
   constructor() { }
   ngOnChanges(changes: SimpleChanges): void {
  
   }
 
   ngOnInit(): void {
   
   }
 
 }