import { Component, Input, OnInit } from '@angular/core';
import { Connection } from 'src/app/NgModels/connection';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {
  @Input() connection: Connection;

  constructor() { }

  ngOnInit(): void {
  }

}
