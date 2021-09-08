import '@/assets/styles/style.scss'
import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import 'prismjs/themes/prism-coy.css';
import 'typeface-roboto/index.css';
import '/public/CSS/bootstrap.css'

import Button from "primevue/button";
import Password from "primevue/password";
import Dialog from "primevue/dialog";
import InputText from 'primevue/inputtext';

import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Card from 'primevue/card';
import ConfirmDialog from 'primevue/confirmdialog';
import ConfirmationService from 'primevue/confirmationservice';

const app = createApp(App);

app.use(PrimeVue)
    .use(store)
    .use(router)
    .use(ToastService)
    .use(ConfirmationService);

app.component('InputText', InputText);
app.component('Button', Button);
app.component('Password', Password);
app.component('Dialog', Dialog);
app.component('DataTable', DataTable);
app.component('Column', Column);
app.component('Card', Card);
app.component('ConfirmDialog', ConfirmDialog);

app.mount('#app')
