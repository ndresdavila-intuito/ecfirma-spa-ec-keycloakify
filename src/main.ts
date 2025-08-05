import { bootstrapApplication } from '@angular/platform-browser';
import { bootstrapKcApplication } from './kc.gen';
import { appConfig } from './app.config';

(async () => {
  if (window.kcContext === undefined) {
    const { NoContextComponent } = await import('./no-context.component');

    bootstrapApplication(NoContextComponent, appConfig);
    return;
  }

  bootstrapKcApplication({
    kcContext: window.kcContext,
    bootstrapApplication: ({ KcRootComponent, kcProvider }) =>
      bootstrapApplication(KcRootComponent, {
        ...appConfig,
        providers: [...appConfig.providers, kcProvider],
      }),
  });
})();
