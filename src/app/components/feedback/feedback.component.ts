import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  maxCharacterLimit = 100;
  maxRowLimit = 1;
  constructor() { }

  ngOnInit() {
  }
  enforceLimits(event: any) {
    const element = event.target as HTMLParagraphElement;
    const input = element.innerText;

    // Check and enforce character limit
    if (input.length > this.maxCharacterLimit) {
      element.innerText = input.substring(0, this.maxCharacterLimit);
    }

    // Check and enforce row limit
    const rows = element.innerText.split('\n').length;
    if (rows > this.maxRowLimit) {
      const lines = element.innerText.split('\n');
      lines.splice(this.maxRowLimit, lines.length - this.maxRowLimit);
      element.innerText = lines.join('\n');
    }
  }

  checkKeyPress(event: KeyboardEvent) {
    // Prevent creating new lines by pressing Enter or Return
    if (event.key === 'Enter' || event.key === 'Return') {
      event.preventDefault();
    }
  
  }
}
