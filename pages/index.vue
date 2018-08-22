<template>
  <map-world :portfolio="portfolio"></map-world>
</template>

<script>
  import axios from 'axios';
  import MapWorld from '~/components/map/world';

  export default {
    components: {
      MapWorld
    },

    data() {
      return {
        portfolio: [],
      }
    },

    asyncData() {
      const one_day = 60*60*24;
      const config_options = {
        responseType: 'json',
        headers: {
          'Cache-Control': `max-age=${one_day}`
        }
      }

      return axios.get(process.env.RESUME_DATA_URL, config_options)
        .then((resp) => {
          return { portfolio: resp.data.portfolio };
        })
        .catch((err) => {
          console.log(err);
          return;
        });

    }

  }
</script>
