<template>
  <div>
    <ol>
      <li><a href="/vue2">Vue2 editor</a></li>
      <li><a href="/quill">Quill editor</a></li>
      <li><a href="/toast">Toast editor</a></li>
      <li><a href="/tiptap">Tiptap editor</a></li>
    </ol>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
};
</script>

<style>
  li a{
    color: #181818;
  }
</style>
