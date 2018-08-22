<template>
  <div class="landmark">
    <div class="x-mark">
      <svg-close class="button-hover"></svg-close>
    </div>
  </div>
</template>

<script>
  import SvgClose from '~/components/svg/close';

  export default {
    components: {
      SvgClose
    },
  }
</script>

<style lang="scss">
  .landmark-background {
    background-image: url('/img/usgs/715.png');
    background-color: color(sand);
    background-size: 120px;
    background-position: center;
    border-radius: 50%;
    border: 3px solid color(night);
  }
  .landmark {
    width: 50px;
    height: 50px;
    margin: -25px;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    opacity: 1;
    z-index: 1;
    @extend .landmark-background;
    transition: all 300ms;
    &.active {
      width: 80px;
      height: 80px;
      margin: -40px;
    }
    .x-mark {
      position: absolute;
      width: 100%;
      height: 100%;
      cursor: pointer;
    }
  }
</style>
