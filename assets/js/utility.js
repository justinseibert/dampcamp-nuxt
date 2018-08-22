export default {
  random: function(min,max){
    return Math.floor(Math.random() * (max-min+1)) + min;
  },

  chance: function(percent=0.5){
    return (Math.random() <= percent) ? {
      bool:true,
      num:1
    } : {
      bool:false,
      num:-1
    };
  },

  fillEmptyArray: function(n){
    return Array.apply(null, Array(n)).map(Number.prototype.valueOf,0);
  },
}
