import { Component, input, InputSignal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-container',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-container.html',
})
export class ModalContainer {
  isOpen: InputSignal<boolean> = input.required();
}
