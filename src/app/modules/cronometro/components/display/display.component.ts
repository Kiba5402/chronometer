import { Component, OnInit } from '@angular/core';
import { CronoServiceService } from '../../service/crono-service.service'; 

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {

  constructor(
    public cronoServ: CronoServiceService
  ) {

  }

  ngOnInit(): void {
  }

}
