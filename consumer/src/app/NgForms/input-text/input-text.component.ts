import { Component, Input, OnInit, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.css']
})
export class InputTextComponent implements ControlValueAccessor { 
  //Defines an interface that acts as a bridge between the Angular forms API and a native element in the DOM.
@Input() label: string;
@Input() type = 'text';

 
  constructor(@Self() public ngControl: NgControl) {  //A base class that all FormControl-based directives extend. It binds a FormControl object to a DOM element.
    this.ngControl.valueAccessor = this;
  }
  writeValue(obj: any): void {
  
  }
  registerOnChange(fn: any): void {
  }

  registerOnTouched(fn: any): void {
    
  }

  ngOnInit(): void {
  }

}
