<template>
  <div>
    <editor v-model="content"></editor>
    <div style="margin-top:40px">{{content}}</div>
  </div>
</template>

<script>
  import 'tui-editor/dist/tui-editor.css';
  import 'tui-editor/dist/tui-editor-contents.css';
  import 'codemirror/lib/codemirror.css';
  import { Editor } from '@toast-ui/vue-editor'
  
    export default {
      name: "toastEditor",
      data(){
          return{
            content: ''
          }
      },
      updated(){
      
      },
      components: {
          'editor': Editor
      }
    }
</script>

<style scoped>

</style>
