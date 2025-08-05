import { Component, input } from '@angular/core';

@Component({
  selector: 'app-verificar-correo',
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
      opacity="0.3"
      d="M62.5 25V37.75C61.4688 37.5938 60.4375 37.5 59.375 37.5C48.3437 37.5 39.2812 45.6562 37.75 56.25H12.5V25L37.5 40.625L62.5 25ZM62.5 18.75H12.5L37.5 34.375L62.5 18.75Z"
      fill="#2464EC"
    />
    <path
      d="M37.75 56.25H12.5V25L37.5 40.625L62.5 25V37.75C64.7188 38.0625 66.8125 38.7188 68.75 39.625V18.75C68.75 15.3125 65.9375 12.5 62.5 12.5H12.5C9.0625 12.5 6.28125 15.3125 6.28125 18.75L6.25 56.25C6.25 59.6875 9.0625 62.5 12.5 62.5H37.75C37.5938 61.4688 37.5 60.4375 37.5 59.375C37.5 58.3125 37.5938 57.2812 37.75 56.25ZM62.5 18.75L37.5 34.375L12.5 18.75H62.5ZM54.1875 68.75L43.125 57.6875L47.5312 53.2812L54.1562 59.9062L67.4062 46.6562L71.875 51.0625L54.1875 68.75Z"
      fill="#2464EC"
    />
  </svg>`,
})
export class VerificarCorreoIcon {
  style = input<string>();
  width = input<string>();
  height = input<string>();
}
