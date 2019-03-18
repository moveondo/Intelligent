import Vue from 'vue';
import locale from 'element-ui/lib/locale';
import VueI18n from 'vue-i18n';

import messages from './langs';

Vue.use(VueI18n)
//从localStorage中拿到用户的语言选择，如果没有，那默认中文
let language = localStorage.getItem('storageLanguage')

if (!language) {
  language = 'en'
  localStorage.setItem('storageLanguage', 'en')
}

console.log(`locale is ${language}`)
const i18n = new VueI18n({
  locale: language,
  messages,
})

locale.i18n((key, value) => i18n.t(key, value)) //为了实现element插件的多语言切换

export default i18n;
