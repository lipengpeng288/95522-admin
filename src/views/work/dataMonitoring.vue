<template>
  <div class="container">
      this is data monitoring page
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
// import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

@Options({
  components: {
    // HelloWorld,
  },
})
export default class DataMonitoring extends Vue {}
</script>
<style lang="scss" scoped>
    .container{
        padding: 20px 16px;
    }
</style>
