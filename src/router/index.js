import Vue from 'vue'
import Router from 'vue-router'
import vue2Editor from '../pages/vue2Editor'
import toastEditor from '../pages/toastEditor'
import quill from '../pages/quillEditor'
import tiptap from '../pages/tiptapEditor'

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/vue2',
      name: 'vue2Editor',
      component: vue2Editor
    },
    {
      path: '/toast',
      name: 'toastEditor',
      component: toastEditor
    },
    {
      path: '/quill',
      name: 'quill',
      component: quill
    },
    {
      path: '/tiptap',
      name: 'tiptap',
      component: tiptap
    }
  ]
})
