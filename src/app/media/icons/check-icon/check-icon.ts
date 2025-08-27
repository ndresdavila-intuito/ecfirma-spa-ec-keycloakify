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
    <!-- Círculo: borde blanco, sin relleno -->
    <circle
      cx="37.5"
      cy="37.5"
      r="32.8125"
      stroke="white"
      stroke-width="4"
      fill="none"
    />
    <!-- Visto: blanco -->
    <path
      d="M54.0625 22.8125L32.8125 44.0625L24.0625 35.3125L19.6875 39.6875L32.8125 52.8125L58.4375 27.1875L54.0625 22.8125Z"
      fill="white"
    />
  </svg>`,
})
export class CheckIcon {
  style = input<string>();
  width = input<string>();
  height = input<string>();
}
