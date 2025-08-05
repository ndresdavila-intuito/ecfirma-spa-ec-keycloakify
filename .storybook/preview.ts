import 'zone.js';
import { type Preview, moduleMetadata } from '@analogjs/storybook-angular';
import { provideAnimations } from '@angular/platform-browser/animations';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    moduleMetadata({
      providers: [provideAnimations()],
    }),
  ],
};

export default preview;
