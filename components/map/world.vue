<template>
  <section id="_map" class="window map-body" ref="_map"
    :class="view.map ? '' : 'column'"
    >

    <map-location
      v-if="view.location"
    ></map-location>
<!--
    <nav-direction-arrows
      v-if="view.controls"
      :class="view.map ? 'above-interactive' : 'visible'"
    ></direction-arrows>

    <nav-project-title></project-title>
 -->
    <div id="_trail" ref="_trail" class="trail"
      v-on:scroll.passive="handleScroll()"
      v-bind:style="{ transform: trail.transform }"
    >

      <map-island
        :island="island"
      ></map-island>

      <map-landmarks
        v-for="(m, i) in landmarks"
        :key="i"
        :style="{
          top: m.top + 'px',
          left: m.left + 'px',
        }"
      ></map-landmarks>
      <!-- :class="active.index == i ? 'active' : ''" -->

    </div>

  </section>
</template>

<script>
  import geom from '~/assets/js/geometry';
  import util from '~/assets/js/utility';

  import MapIsland from '~/components/map/island';
  import MapLocation from '~/components/map/location';
  import MapLandmarks from '~/components/map/landmark';

  export default {
    components: {
      MapIsland,
      MapLocation,
      MapLandmarks
    },

    props: [
      'portfolio'
    ],

    data() {
      return {
        doc: {
          width: 0,
          height: 0,
          center: {},
          scroll: 0,
          direction: 1,
        },
        view: {
          location: true,
          controls: false,
          map: true,
          bio: false,
        },
        island: {
          trail: {
            amplitude: 0,
            shift: 0,
            period: 0,
          },
          mountains: [],
          landmark_count: 0,
          distance: 300,
        },
        landmarks: [],
        trail: {
          fade: null,
          transform: 'translate3d(0,0,0)',
          current: null,
          index: 0,
          direction: 0,
        },
      }
    },

    methods: {
      handleScroll: function(){
        window.requestAnimationFrame(function() {
          this.calculateCenter();
          // if (this.view.map){
          //   this.calculateFade();
          // }
        }.bind(this));
      },

      handleResize: function(){
        window.requestAnimationFrame(function() {
            this.calculateDimensions();
        }.bind(this));
      },

      calculateDimensions: function(){
        console.log('fn calculateDimensions');
        this.doc.width = window.innerWidth;
        this.doc.height = window.innerHeight;
        this.doc.center = geom.point(this.doc.width/2, this.doc.height/2);
        // if (!init){
        //   // this.calculateCurves();
        this.handleScroll();
        // }
      },

      calculateCenter: function(){
        // console.log('fn: calculateCenter');
        let scrollY = this.$refs._trail.scrollTop + this.doc.center.y;
        let offset = this.doc.center.x - geom.sinX(scrollY, this.island.trail);
        this.trail.transform = 'translate3d('+ offset +'px,0,0)';
      },

      calculateCurves: function(curve='all'){
        // console.log('fn calculateCurves');
        if (curve == 'all' || curve == 'path'){
          this.island.trail = {
            amplitude: this.doc.width/5,
            shift: this.doc.center.x,
            period: 0.003
          };
        }

        // if (curve == 'all' || curve == 'fade'){
        //   this.trail.fade = {
        //     amplitude: 1,
        //     period: Math.PI / this.doc.height,
        //   };
        // }
      },

      // calculateFade: function(){
      //   // console.log('fn: calculateFade');
      //   let min = this.$refs._trail.scrollTop,
      //       max = this.$refs._trail.scrollTop + this.doc.height;
      //   for (i in this.landmark){
      //     let y = this.landmark[i].top;
      //     if (y > min && y < max && geom.sinX(max-y, this.trail.fade) >= 0.95){
      //       this.active.index = i;
      //       this.active.title = this.portfolio[i].title;
      //     }
      //   }
      // },

      generateLandmarks: function(){
        this.island.landmark_count = this.portfolio.length-1;

        for (let i = 0; i < this.portfolio.length; i++){
          let y = i*this.island.distance + this.doc.center.y;
          let x = geom.sinX(y,this.island.trail);

          let landmark = {
            index: i,
            left: x,
            top: y,
            class: 'hidden',
            active: false,
          }

          this.landmarks.push(landmark);
          this.island.mountains.push(geom.point(x,y));

          let peaks = util.random(1,2);
          let offset = this.island.distance;

          for (let j = 0; j < peaks; j++){
            let x_offset = util.random(offset/2,offset) * util.chance(0.5).num;
            let y_offset = util.random(offset/2,offset) * util.chance(0.5).num;
            console.log(x_offset);
            this.island.mountains.push(geom.point(x+x_offset,y+y_offset));
          }

        }
      },

    },

    mounted() {
      this.calculateDimensions();
      this.calculateCurves();
      this.generateLandmarks();

      if (!('ontouchstart' in window) || this.doc.width > 768) {
        this.view.controls = true;
      }

      window.addEventListener('resize', function(){
        this.handleResize();
      }.bind(this));
    }
  }
</script>

<style lang="scss">
  .trail {
    width: 400%;
    height: 100%;
    overflow-x:hidden;
    overflow-y: scroll;
  }
</style>
