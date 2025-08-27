import { AsyncPipe, CommonModule, NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  inject,
  signal,
  type TemplateRef,
  viewChild,
} from '@angular/core';
import { KcSanitizePipe } from '@keycloakify/angular/lib/pipes/kc-sanitize';
import { USE_DEFAULT_CSS } from '@keycloakify/angular/lib/tokens/use-default-css';
import { ComponentReference } from '@keycloakify/angular/login/classes/component-reference';
import { PasswordWrapperComponent } from '../../components/password-wrapper/password-wrapper.component';
import { KcClassDirective } from '@keycloakify/angular/login/directives/kc-class';
import type { I18n } from '../../i18n';
import type { KcContext } from '../../KcContext';
import { LOGIN_CLASSES } from '@keycloakify/angular/login/tokens/classes';
import { LOGIN_I18N } from '@keycloakify/angular/login/tokens/i18n';
import { KC_LOGIN_CONTEXT } from '@keycloakify/angular/login/tokens/kc-context';
import type { ClassKey } from 'keycloakify/login/lib/kcClsx';
import { InfoIcon } from '../../../../src/app/media/icons/info-icon/info-icon';
import { IntuitoLogo } from '../../../../src/app/media/pictures/intuito-logo/intuito-logo';

@Component({
  selector: 'kc-login',
  templateUrl: 'login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [KcClassDirective, KcSanitizePipe, PasswordWrapperComponent, NgClass, CommonModule, InfoIcon, IntuitoLogo],
  providers: [
    {
      provide: ComponentReference,
      useExisting: forwardRef(() => LoginComponent),
    },
  ],
})
export class LoginComponent extends ComponentReference {
  isLoginLayout = true; // formulario a la izquierda, carousel a la derecha

  kcContext = inject<Extract<KcContext, { pageId: 'login.ftl' }>>(KC_LOGIN_CONTEXT);
  i18n = inject<I18n>(LOGIN_I18N);

  override doUseDefaultCss = inject<boolean>(USE_DEFAULT_CSS);
  override classes = inject<Partial<Record<ClassKey, string>>>(LOGIN_CLASSES);

  documentTitle: string | undefined;
  bodyClassName: string | undefined;

  displayRequiredFields = false;
  displayInfo =
    !!this.kcContext?.realm?.password &&
    !!this.kcContext?.realm?.registrationAllowed &&
    !this.kcContext?.registrationDisabled;
  displayMessage = !this.kcContext?.messagesPerField?.existsError('username', 'password');

  headerNode = viewChild<TemplateRef<HTMLElement>>('headerNode');
  infoNode = viewChild<TemplateRef<HTMLElement>>('infoNode');
  socialProvidersNode = viewChild<TemplateRef<HTMLElement>>('socialProvidersNode');

  isLoginButtonDisabled = signal(false);

  getLogoUrl(): string {
    return typeof window !== 'undefined' && window.location.href.includes('/realms/')
      ? './resources/img/titulo-appfirma.png'
      : '/src/login/assets/titulo-appfirma.png';
  }
}
