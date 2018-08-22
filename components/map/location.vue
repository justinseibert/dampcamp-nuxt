<template>
  <div class="location-control">
    <div class="location point"></div>
    <div class="location pulse"></div>
  </div>
</template>

<style lang="scss" scoped>
  $axis-point-radius: 30px;

  .location-control {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    z-index: z(location);
    .location {
      left: calc(50% - #{$axis-point-radius / 2 });
      top: calc(50% - #{$axis-point-radius / 2 });
      position: absolute;
      width: $axis-point-radius;
      height: $axis-point-radius;
      border-radius: 50%;
      animation-duration: 1600ms;
      animation-timing-function: ease-in-out;
      animation-iteration-count: infinite;
      &.point {
        background: color(blue);
        border: $axis-point-radius/5 solid color(white);
        box-shadow: 0 0 20px -6px color(wool);
        transform: scale3d(1.15,1.15,1.15);
        animation-name: location-animation;
        z-index: 1;
      }
      &.pulse {
        box-shadow: 0 0 8px 5px color(blue);
        transform: scale3d(0.1,0.1,0.1);
        opacity: 0;
        animation-name: location-pulse-animation;
        z-index: 0;
      }
    }
  }

  @keyframes location-pulse-animation {
    0 {
      transform: scale3d(0,0,0);
      opacity: 0;
    }
    30% {
      opacity: 0.6;
    }
    100% {
      transform: scale3d(2,2,2);
      opacity: 0;
    }
  }
  @keyframes location-animation {
    0 {
      transform: scale3d(1.15,1.15,1.15);
    }
    40% {
      transform: scale3d(1,1,1);
    }
    100% {
      transform: scale3d(1.15,1.15,1.15);
    }
  }
</style>
