import './main.css';
import { getDefaultPageComponent, type KcPage } from '@keycloakify/angular/login';
import { UserProfileFormFieldsComponent } from '@keycloakify/angular/login/components/user-profile-form-fields';
import { TemplateComponent } from './template/template.component';
import type { ClassKey } from 'keycloakify/login';
import type { KcContext } from './KcContext';

// Define las clases específicas
export const classes = {
  kcHtmlClass: '',
  kcBodyClass: '',
} satisfies { [key in ClassKey]?: string };

export const doUseDefaultCss = true;
export const doMakeUserConfirmPassword = true;

export async function getKcPage(pageId: KcContext['pageId']): Promise<KcPage> {
  switch (pageId) {
    case 'login.ftl':
      return {
        PageComponent: (await import('./pages/login/login.component')).LoginComponent,
        TemplateComponent,
        UserProfileFormFieldsComponent,
        doMakeUserConfirmPassword,
        doUseDefaultCss,
        classes,
      };
    case 'register.ftl':
      return {
        PageComponent: (await import('./pages/register/register.component')).RegisterComponent,
        TemplateComponent,
        UserProfileFormFieldsComponent,
        doMakeUserConfirmPassword,
        doUseDefaultCss,
        classes,
      };
    case 'login-otp.ftl':
      return {
        PageComponent: (await import('./pages/login-otp/login-otp.component')).LoginOtpComponent,
        TemplateComponent,
        UserProfileFormFieldsComponent,
        doMakeUserConfirmPassword,
        doUseDefaultCss,
        classes,
      };
    case 'info.ftl':
      return {
        PageComponent: (await import('./pages/info/info.component')).InfoComponent,
        TemplateComponent,
        UserProfileFormFieldsComponent,
        doMakeUserConfirmPassword,
        doUseDefaultCss,
        classes,
      };
    default:
      return {
        PageComponent: await getDefaultPageComponent(pageId),
        TemplateComponent,
        UserProfileFormFieldsComponent,
        doMakeUserConfirmPassword,
        doUseDefaultCss,
        classes,
      };
  }
}
