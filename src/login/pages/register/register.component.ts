import { AsyncPipe, NgClass, NgComponentOutlet, CommonModule } from '@angular/common';
import { WritableSignal } from '@angular/core';
import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  inject,
  input,
  signal,
  type TemplateRef,
  Type,
  viewChild,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { KcSanitizePipe } from '@keycloakify/angular/lib/pipes/kc-sanitize';
import { USE_DEFAULT_CSS } from '@keycloakify/angular/lib/tokens/use-default-css';
import { ComponentReference } from '@keycloakify/angular/login/classes/component-reference';
import { UserProfileFormFieldsComponent } from '../../components/user-profile-form-fields/user-profile-form-fields.component';
import { KcClassDirective } from '@keycloakify/angular/login/directives/kc-class';
import type { I18n } from '../../i18n';
import type { KcContext } from '../../KcContext';
import { UserProfileFormService } from '@keycloakify/angular/login/services/user-profile-form';
import { LOGIN_CLASSES } from '@keycloakify/angular/login/tokens/classes';
import { LOGIN_I18N } from '@keycloakify/angular/login/tokens/i18n';
import { KC_LOGIN_CONTEXT } from '@keycloakify/angular/login/tokens/kc-context';
import type { ClassKey } from 'keycloakify/login/lib/kcClsx';
import { map } from 'rxjs';
import { TerminosyCondiciones } from '../../../app/features/modals/terminos-y-condiciones/terminos-y-condiciones';
import { ContratoDeServicio } from '../../../app/features/modals/contrato-de-servicio/contrato-de-servicio';
import { TratamientoDeDatos } from '../../../app/features/modals/tratamiento-de-datos/tratamiento-de-datos';
import { ChangeDetectorRef } from '@angular/core';
import { IntuitoLogo } from '../../../../src/app/media/pictures/intuito-logo/intuito-logo';

@Component({
  selector: 'kc-register',
  templateUrl: 'register.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    KcClassDirective,
    KcSanitizePipe,
    UserProfileFormFieldsComponent,
    CommonModule,
    TerminosyCondiciones,
    ContratoDeServicio,
    TratamientoDeDatos,
    IntuitoLogo,
  ],
  providers: [
    {
      provide: ComponentReference,
      useExisting: forwardRef(() => RegisterComponent),
    },
  ],
})
export class RegisterComponent extends ComponentReference {
  kcContext = inject<Extract<KcContext, { pageId: 'register.ftl' }>>(KC_LOGIN_CONTEXT);
  i18n = inject<I18n>(LOGIN_I18N);

  override doUseDefaultCss = inject<boolean>(USE_DEFAULT_CSS);
  override classes = inject<Partial<Record<ClassKey, string>>>(LOGIN_CLASSES);

  #userProfileFormService = inject(UserProfileFormService);
  private cdr = inject(ChangeDetectorRef);

  documentTitle: string | undefined;
  bodyClassName: string | undefined;

  displayRequiredFields = false;
  displayInfo = false;
  displayMessage: boolean = !this.kcContext?.messagesPerField?.existsError('global');

  headerNode = viewChild<TemplateRef<HTMLElement>>('headerNode');
  infoNode = viewChild<TemplateRef<HTMLElement>>('infoNode');
  socialProvidersNode = viewChild<TemplateRef<HTMLElement>>('socialProvidersNode');

  showTerminosModal = signal(false);
  showContratoModal = signal(false);
  showTratamientoModal = signal(false);

  aceptarTerminos = () => {
    this.showTerminosModal.set(false);
    this.cdr.detectChanges();
  };

  aceptarContrato = () => {
    this.showContratoModal.set(false);
    this.cdr.detectChanges();
  };

  aceptarTratamiento = () => {
    this.showTratamientoModal.set(false);
    this.cdr.detectChanges();
  };

  isFormSubmittable = toSignal(this.#userProfileFormService.formState$.pipe(map((s) => s.isFormSubmittable)), {
    initialValue: false,
  });

  areTermsAccepted = signal(false);
  userProfileFormFields = () => UserProfileFormFieldsComponent;

  onCallback() {
    (document.getElementById('kc-register-form') as HTMLFormElement).submit();
  }

  getLogoUrl(): string {
    return typeof window !== 'undefined' && window.location.href.includes('/realms/')
      ? './resources/img/intuito-logo.png'
      : '/src/login/assets/intuito-logo.png';
  }
}
