import Vue from 'vue'
import commentsStore from './store/commentsStore'
import 'vue2-datepicker/index.css';

import App from './views/app.vue'

const app = new Vue({
    el: '#app',
    components: { App },
    store: commentsStore
});

// Логика может привести Вас от пункта А к пункту Б, а воображение — куда угодно.
// Альберт Эйнштейн
