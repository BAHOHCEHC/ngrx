import { Component, Input, OnInit } from '@angular/core';
import { BackEndErrorsInterface } from 'src/app/shared/types/backEndErrors.interface';

@Component({
  selector: 'app-backendErrorMessages',
  templateUrl: './backendErrorMessages.component.html',
  styleUrls: ['./backendErrorMessages.component.scss']
})
export class BackendErrorMessagesComponent implements OnInit {
  @Input('backEndErrors') backEndErrorsProps: BackEndErrorsInterface;

  errorMessages: string[];

  constructor() { }

  ngOnInit(): void {
    this.errorMessages = Object.keys(this.backEndErrorsProps).map((name: string) => {
      const messages = this.backEndErrorsProps[name].join(', ');

      return `${name} ${messages}`;
    })
  }

}
