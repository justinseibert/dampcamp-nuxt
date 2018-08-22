<template>
    <canvas id="_canvas" ref="_canvas"></canvas>
</template>

<script>
  import axios from 'axios';
  import geom from '~/assets/js/geometry';

  export default {
    props: [
      'island',
    ],

    data() {
      return {
        ctx: null,
        canvas: {
          elem: null,
          dpi: 1,
          width: 0,
          height: 0,
        },
        distance: 300,
      }
    },

    mounted() {
      this.$nextTick(function(){
        this.initializeCanvas();
        this.loadImages();
      }.bind(this))
    },

    methods: {
      initializeCanvas: function(){
        let canvas = this.canvas.elem = this.$refs._canvas;
        this.ctx = canvas.getContext('2d');

        let h = this.island.landmark_count*this.distance + window.innerHeight;
        let w = window.innerWidth*1.5;

        canvas.width = this.canvas.width = w*this.canvas.dpi;
        canvas.height = this.canvas.height = h*this.canvas.dpi;
        canvas.style.width = w + 'px';
        canvas.style.height = h + 'px';
        console.log(h,w);

        this.ctx.scale(this.canvas.dpi,this.canvas.dpi);
        this.ctx.save();
      },

      loadImages: function(){
        const images = [
          '/img/usgs/507b.png',
          '/img/usgs/706d.png',
          '/img/usgs/706c.png',
          '/img/usgs/706b.png',
          '/img/usgs/706a.png',
        ];
        const config_options = {
          responseType: 'blob'
        };
        const imagesLoaded = () => {
          images_loaded++;

          if (images_loaded == images.length){
            $this.drawMountains(textures);
            $this.drawTrail();
          }
        };

        let textures = [];
        let images_loaded = 0;
        let $this = this;

        for (let i = 0; i < images.length; i++){
          axios.get(images[i], config_options)
            .then((resp) => {
              let img = new Image();
              img.onload = function(){
                textures[i] = img;
                imagesLoaded();
              }
              img.src = window.URL.createObjectURL(resp.data);
            })

            .catch((err) => {
              textures[i] = false;
              imagesLoaded();
            });
        }
      },

      drawMountains: function(textures){
        // console.log('fn: drawMountains');
        let radius = 200;
        let lightness = 35;
        let increment = (60 - lightness) / textures.length;
        let color = 'hsla(228, 100%, 76%, 0.5)';

        for (let i = 0; i < textures.length; i++){
          if (i > 0){
            this.sampleContour(radius, 'stroke');
          } else {
            this.sampleContour(radius, 'fill', color);
          }

          if (textures[i]){
            this.sampleContour(radius, textures[i]);
          } else {
            if (i > 0){
              color = `hsl(151, 71%, ${lightness + increment*i}%)`;
            }
            this.sampleContour(radius, 'fill', color);
          }

          radius = radius * 0.8;
        }
      },

      sampleContour: function(current_radius,image,color=null){
        // console.log('fn: sampleContour');
        let ctx = this.ctx;
        ctx.restore();
        ctx.globalAlpha = 1;
        ctx.strokeStyle = '#222';
        let x = 0,
            y = 0,
            step = current_radius;
        while (y < this.canvas.height){
          x = 0;
          y += step;
          while(x < this.canvas.width){
            x += step;
            let sample_point = geom.point(x,y);
            if (this.sampleMountains(sample_point,current_radius)){
              if (image == 'stroke'){
                ctx.lineWidth = 4;
                ctx.strokeStyle = '#222';
                ctx.strokeRect(x-current_radius/2,y-current_radius/2,current_radius,current_radius)
                ctx.beginPath();
                ctx.lineWidth = 24;
                ctx.moveTo(x-current_radius/2-2,y-current_radius/2);
                ctx.lineTo(x+current_radius/2+2,y-current_radius/2);
                ctx.stroke();
              } else if (image == 'fill'){
                ctx.globalAlpha = 1;
                ctx.fillStyle = color;
                ctx.fillRect(x-current_radius/2-1,y-current_radius/2-1,current_radius+2,current_radius+2)
                ctx.globalAlpha = 0.2;
                ctx.fillStyle = color;
                ctx.fillRect(x-current_radius/2-1,y-current_radius/2-1,current_radius+2,current_radius+2)
              } else {
                ctx.fillStyle = ctx.createPattern(image, 'repeat');
                ctx.fillRect(x-current_radius/2-1,y-current_radius/2-1,current_radius+2,current_radius+2)
              }
            }
          }
        }
      },

      sampleMountains: function(p,r){
        for (let i = 0; i < this.island.mountains.length; i++){
          let c = this.island.mountains[i];
          if (geom.pointInsideCircle(p,c,r)){
            return c;
          }
        }
        return false;
      },

      drawTrail: function(){
        this.ctx.strokeStyle = '#222';
        this.ctx.lineWidth = 3;
        this.ctx.setLineDash([6,6]);
        this.ctx.lineCap = 'butt';

        let resolution = 50;
        let y = window.innerHeight/2;
        let end = this.island.landmark_count*this.distance + y - resolution;

        this.ctx.beginPath();
        this.ctx.moveTo(geom.sinX(y,this.island.trail), y);
        while (y <= end){
          y += resolution;
          this.ctx.lineTo(geom.sinX(y,this.island.trail), y);
        }
        this.ctx.stroke();
      },

    },

  }
</script>
