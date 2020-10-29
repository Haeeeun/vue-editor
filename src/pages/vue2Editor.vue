<template>
  <div>
    <vue-editor v-model="content"></vue-editor>
    <div>{{content}}</div>
    <div v-html="content"></div>
  </div>
</template>

<script>
  import { VueEditor } from "vue2-editor";
  
  export default {
    name: 'App',
    components: { VueEditor },
    data(){
      return{
        content: '',
      }
    }
  };
</script>

<style>

</style>
