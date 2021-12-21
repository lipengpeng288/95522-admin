<template>
    <!-- 投连产品价格公布 -->
  <div class="container">
      this is api page
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
export default class InvestAccount extends Vue {}
</script>
<style lang="scss" scoped>
    .container{
        padding: 20px 16px;
    }
</style>
