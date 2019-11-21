import { Injectable } from '@angular/core';

declare let toastr;

export class Message {
  $key: number;
  content: string;
  style: string;
  dismissed: boolean = false;

  constructor(content: string, key: number, style?: string) {
    this.content = content;
    this.$key = key;
    this.style = style || 'info';
  }
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  constructor() {
    toastr.options.closeButton = true;
    toastr.options.progressBar = true;
  }

  sendMessage(type: string, { title, message }) {
    return toastr[type](message, title);
  }
}
