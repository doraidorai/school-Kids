import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  events:any=[];
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getEvents().subscribe(
      (response) => { this.events = response.events }
    );
  }

}
