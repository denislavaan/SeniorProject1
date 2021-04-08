import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Message } from 'src/app/NgModels/message';
import { MessageService } from 'src/app/NgServices/message.service';

@Component({
  selector: 'app-connection-messages',
  templateUrl: './connection-messages.component.html',
  styleUrls: ['./connection-messages.component.css']
})
export class ConnectionMessagesComponent implements OnInit {
@ViewChild('messageForm') messageForm: NgForm;
 @Input() messages: Message[];
 @Input() username: string;
 messageContent: string;
  

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
     
  }

sendMessage() {
  this.messageService.sendMessage(this.username, this.messageContent).subscribe(message => {
    this.messages.push(message); 
    this.messageForm.reset();
  })
}

}
