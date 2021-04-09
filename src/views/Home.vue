<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <div>
      <el-button type="primary" size="mini">element</el-button>
    </div>
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'Home',
  components: {
    HelloWorld,
  },
};
</script>
