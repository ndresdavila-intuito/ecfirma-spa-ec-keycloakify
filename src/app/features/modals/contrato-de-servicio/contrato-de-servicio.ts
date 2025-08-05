import { Component, input, output, InputSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalContainer } from '../../../ui/components/shared/modal-container/modal-container';
import { DocumentIcon } from '../../../media/icons/document-icon/document-icon';

@Component({
  selector: 'modal-contrato-servicio',
  standalone: true,
  imports: [CommonModule, ModalContainer, DocumentIcon],
  templateUrl: './contrato-de-servicio.html',
})
export class ContratoDeServicio {
  onAccepted = output();
  isOpen: InputSignal<boolean> = input.required();
  width: InputSignal<string> = input('636px');
  height: InputSignal<string> = input('auto');
  maximizable: InputSignal<boolean> = input(false);

  aceptar = () => {
    this.onAccepted.emit();
  };
}
