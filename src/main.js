// 引入 Vue
import { createApp } from 'vue';
// 引入 CSS樣式 Tailwind
import './style.css';
// 引入 Vue主元件
import App from './App.vue';
// 引入 VueRouter
import router from './router/index';
// 引入 Pinia
import { createPinia } from 'pinia';
// 引入 UI庫 PrimeVue
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import { definePreset } from '@primevue/themes';
// 引入 Vee-Validate
import { Field, Form, ErrorMessage, defineRule, configure } from 'vee-validate';
import { localize, setLocale } from '@vee-validate/i18n';
import { all } from '@vee-validate/rules';

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

const pinia = createPinia();
app.use(pinia);

// 使用 Object.keys 將 AllRules 轉為陣列，使用 forEach 迴圈將驗證規則加入 VeeValidate
Object.entries(all).forEach(([name, rule]) => {
  defineRule(name, rule);
});

// 將當前 VeeValidate 的語系設定為繁體中文
configure({
  //generateMessage: localize({ zh_TW: zhTW }),
  validateOnInput: true,
});
setLocale('zh_TW');

// 掛載 VeeValidate 元件
app.component('VField', Field);
app.component('VForm', Form);
app.component('ErrorMessage', ErrorMessage);

app.mount('#app');
