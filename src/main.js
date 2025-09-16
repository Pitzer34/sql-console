import { createApp } from 'vue';
import './assets/styles/style.css';
import App from './App.vue';
import router from './router/index';
import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import Tooltip from 'primevue/tooltip';
import Aura from '@primevue/themes/aura';
import { definePreset } from '@primevue/themes';
import { Icon } from '@iconify/vue';

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
      darkModeSelector: '.dark',
    },
  },
});
app.use(ToastService);
app.directive('tooltip', Tooltip);

const pinia = createPinia();
app.use(pinia);

app.component('Iconify', Icon);

app.mount('#app');
