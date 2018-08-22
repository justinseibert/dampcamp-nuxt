export default {
  /** return a <point> object
  * @param {number} x: x-coordinate
  * @param {number} y: y-coordinate
  */
  point: function(x,y){
    return {
      x: x,
      y: y
    }
  },

  /** the difference between a and b with directional output
  * @param {number} a
  * @param {number} b
  */
  delta: function(a,b){
    return b-a;
  },

  /** the absolute distance/length between a and b
  * @param {number} a
  * @param {number} b
  */
  distance: function(a,b){
    return Math.abs(b-a);
  },

  /** the direction from a to b
  * @param {number} a
  * @param {number} b
  */
  direction: function(a,b){
    return Math.sign(b-a);
  },

  /** Convert radian to degree
  * @param {number} radian: a radian value
  */
  degree: function(radian){
    return radian * (180 / Math.PI);
  },

  /** Convert degree to radian
  * @param {number} degree: a degree value
  */
  radian: function(degree){
    return degree * (Math.PI / 180);
  },

  /** determine hypotenuse length of triangle
  * @param {number} a: length of side a
  * @param {number} b: length of side b
  */
  hypotenuse: function(a,b){
    return Math.sqrt(a*a + b*b);
  },

  /** Law of Sines: Solve for angle 'B' or side 'b'
  * @param {number} a: length of side a
  * @param {number} A: radian angle A
  * @param {number|boolean} b: length of side b or false if TBD
  * @param {number|boolean} B: radian angle B or false if TBD
  */
  lawofsines: function(a,A,b,B){
    if(b == false){
      var side = Math.sin(B) * (a / Math.sin(A));
      return side;
    } else if (B == false){
      // console.log(a,A,b);
      var angle = Math.asin( (Math.sin(A)/a) * b );
      return angle;
    } else {
      console.log('yo lawofsines is broke');
    }
  },

  lawofcosines: function(a,A,b){
    return Math.sqrt(b*b + a*a - (2*a*b)*Math.cos(A) );
  },

  /** Determine if a point is inside a circle
  * @param {object<point>} p: the point
  * @param {object<point>} c: the center point of the circle
  * @param {number} r: the radius of the circle
  */
  pointInsideCircle: function(p,c,r){
    let dx = c.x - p.x;
    let dy = c.y - p.y;
    let hit = (r*r) / ((dx*dx) + (dy*dy));
    if ( hit > 1 ){
      return true;
    } else {
      return false;
    }
  },

  sinX: function(x, args){
    args = args || {};
    args.amplitude = args.amplitude || 1;
    args.period = args.period || 1;
    args.phase = args.phase || 0;
    args.shift = args.shift || 0;
    return args.amplitude * Math.sin(args.period*x - args.phase) + args.shift;
  },

}
