import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class ButtonComponent implements OnInit {
  @Input() btnProps = {
    type: 'button',
    title: 'button',
    color: '',
    class: '',
    disableIf: true
  };

  colorClass: string = 'btn btn-';

  ngOnInit(): void {
    
    if (this.btnProps.color !== undefined) {
      this.colorClass += this.btnProps.color;
    } else {
      if (this.btnProps.class != '') {
        this.colorClass += this.btnProps.class;
      }
      this.colorClass = ' btn btn-primary';
      
    }
  }
}
