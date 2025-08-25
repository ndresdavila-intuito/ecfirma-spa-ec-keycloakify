import { CommonModule, NgClass } from '@angular/common';
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
import { LinkIcon } from '../../../../src/app/media/icons/link-icon/link-icon';
import { IntuitoLogo } from '../../../../src/app/media/pictures/intuito-logo/intuito-logo';

@Component({
  selector: 'kc-login',
  templateUrl: 'login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    KcClassDirective,
    KcSanitizePipe,
    PasswordWrapperComponent,
    NgClass,
    CommonModule,
    InfoIcon,
    LinkIcon,
    IntuitoLogo,
  ],
  providers: [
    {
      provide: ComponentReference,
      useExisting: forwardRef(() => LoginComponent),
    },
  ],
})
export class LoginComponent extends ComponentReference {
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

  // ===============================
  // Cifrado RSA: clave pública dinámica
  // ===============================
  private publicKey: string | null = null;

  constructor() {
    super();
    this.fetchPublicKey(); // Traer clave pública al iniciar
  }

  private async fetchPublicKey() {
    try {
      const resp = await fetch('http://localhost:5000/api/crypto/public-key');
      if (!resp.ok) throw new Error('Error al obtener clave pública');
      const data = await resp.json();
      this.publicKey = data.publicKey;
      console.log('✅ Clave pública obtenida');
    } catch (err) {
      console.error('❌ No se pudo obtener la clave pública:', err);
    }
  }

  private str2ab(pem: string): ArrayBuffer {
    const b64 = pem.replace(/-----.*?-----/g, '').replace(/\s/g, '');
    const binary = atob(b64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return bytes.buffer;
  }

  private async encryptPayloadRSA(payload: object): Promise<string> {
    if (!this.publicKey) throw new Error('Clave pública no cargada');

    const encoder = new TextEncoder();
    const data = encoder.encode(JSON.stringify(payload));

    const key = await window.crypto.subtle.importKey(
      'spki',
      this.str2ab(this.publicKey),
      { name: 'RSA-OAEP', hash: 'SHA-256' },
      false,
      ['encrypt'],
    );

    const encrypted = await window.crypto.subtle.encrypt({ name: 'RSA-OAEP' }, key, data);
    return btoa(String.fromCharCode(...new Uint8Array(encrypted)));
  }

  // ===============================
  // Interceptar submit del login
  // ===============================
  async handleLogin(event: Event) {
    event.preventDefault();
    this.isLoginButtonDisabled.set(true);

    // Esperar a que la clave esté cargada
    if (!this.publicKey) await this.fetchPublicKey();

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const payload: Record<string, unknown> = {};
    formData.forEach((value, key) => {
      payload[key] = value;
    });

    try {
      const encryptedData = await this.encryptPayloadRSA(payload);

      const response = await fetch('http://localhost:5000/api/crypto/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ datosEncriptados: encryptedData }), // Coincidir con DTO de backend
      });

      if (!response.ok) throw new Error(await response.text());

      const result = await response.json();
      console.log('Login OK:', result);

      window.location.href = '/';
    } catch (err) {
      console.error(err);
      this.isLoginButtonDisabled.set(false);
    }
  }

  getLogoUrl(): string {
    return typeof window !== 'undefined' && window.location.href.includes('/realms/')
      ? './resources/img/titulo-appfirma.png'
      : '/src/login/assets/titulo-appfirma.png';
  }
}
