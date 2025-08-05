import { Component, input } from '@angular/core';

@Component({
  selector: 'app-document-icon',
  standalone: true,
  imports: [],
  template: `<svg
    [attr.width]="width()"
    [attr.height]="height()"
    [attr.class]="style()"
    viewBox="0 0 19 23"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6 14.5H13M6 17.5H9.5M16.5 1.5H2.5C2.23478 1.5 1.98043 1.60536 1.79289 1.79289C1.60536 1.98043 1.5 2.23478 1.5 2.5V20.5C1.5 20.7652 1.60536 21.0196 1.79289 21.2071C1.98043 21.3946 2.23478 21.5 2.5 21.5H16.5C16.7652 21.5 17.0196 21.3946 17.2071 21.2071C17.3946 21.0196 17.5 20.7652 17.5 20.5V2.5C17.5 2.23478 17.3946 1.98043 17.2071 1.79289C17.0196 1.60536 16.7652 1.5 16.5 1.5Z"
      stroke="white"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M12.5 6L8.5 10L6.5 8"
      stroke="white"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>`,
})
export class DocumentIcon {
  style = input<string>();
  width = input<string>();
  height = input<string>();
}
