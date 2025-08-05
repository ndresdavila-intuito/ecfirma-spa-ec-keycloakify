import { Component, input } from '@angular/core';

@Component({
  selector: 'app-check-icon',
  standalone: true,
  imports: [],
  template: `<svg
    [attr.width]="width()"
    [attr.height]="height()"
    [attr.class]="style()"
    viewBox="0 0 75 75"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M37.5 70.3125C55.6218 70.3125 70.3125 55.6218 70.3125 37.5C70.3125 19.3782 55.6218 4.6875 37.5 4.6875C19.3782 4.6875 4.6875 19.3782 4.6875 37.5C4.6875 55.6218 19.3782 70.3125 37.5 70.3125Z"
      fill="#2464EC"
    />
    <path
      d="M54.0625 22.8125L32.8125 44.0625L24.0625 35.3125L19.6875 39.6875L32.8125 52.8125L58.4375 27.1875L54.0625 22.8125Z"
      fill="#BDD1F9"
    />
  </svg>`,
})
export class CheckIcon {
  style = input<string>();
  width = input<string>();
  height = input<string>();
}
