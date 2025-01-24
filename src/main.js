import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router/index';
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import { definePreset } from '@primevue/themes';

const app = createApp(App);

app.use(router);
app.use(PrimeVue, {
  theme: {
    preset: definePreset(Aura, {
      semantic: {
        primary: {
          50: '{gray.50}',
          100: '{gray.100}',
          200: '{gray.200}',
          300: '{gray.300}',
          400: '{gray.400}',
          500: '{gray.500}',
          600: '{gray.600}',
          700: '{gray.700}',
          800: '{gray.800}',
          900: '{gray.900}',
          950: '{gray.950}',
        },
      },
    }),
    options: {
      prefix: 'p',
      darkModeSelector: '.dark',
      cssLayer: {
        name: 'primevue',
        order: 'tailwind-base, primevue, tailwind-utilities',
      },
    },
  },
});

app.mount('#app');
