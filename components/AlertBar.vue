<template>
  <div>
    <div id="_alertBar" class="alert-bar" v-if="messages.length > 0">
      <div class="alert"
        v-for="item of messages"
        :key="item.id"
        :class="item.class"
        >
        {{ item.message }}
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        id_counter: 0,
        messages: [],
      }
    },

    created() {
      this.$root.$on('alert-notification', this.notify);
    },

    destroyed() {
      this.$root.$off('alert-notification', this.notify);
    },

    methods: {

      add: function(data){
        data.id = data.id || this.id_counter++;
        data.duration = data.duration || 3000;
        data.class = data.class || '';

        this.messages.push(data);
        return data;
      },

      remove: function(id){
        let messages = this.messages.filter((m) => m.id != id);
        this.messages = messages;
      },

      notify: function(data){
        data = this.add(data);

        let timer = window.setTimeout(function(){
          this.remove(data.id);
          window.clearTimeout(timer);
        }.bind(this), data.duration);
      },

    }

  }
</script>

<style lang="scss" scoped>
  .alert-bar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    text-align: center;
    font-size: 0.75em;
    margin: 0;
    overflow: hidden;
    z-index: z(alert);
    .alert {
      padding: space(light);
      background: color(ash);
      color: color(white);
      &.success {
        background: color(blue);
      }
      &.failure {
        background: color(red);
      }
    }
  }
</style>
