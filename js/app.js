
var pos = { x: 0.45, y: 0.55};
var dest  = { x: 0.5, y:0.5};
var vel  = { x: 0.0, y: 0.0};

var moving = false;
var mousePos = {x:0, y: 0};
var prevPos = {x:0, y: 0};

// bo.addEventListener("mousemove", myScript);

var bannerCanvas = document.getElementById('bannerCanvas');
var ctx = bannerCanvas.getContext("2d");
// ctx.font = "30px Arial";
// ctx.fillText("Hello World", 10, 50);
// const ctx = document.createElement('canvas').getContext('2d');
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;
// ctx.fillStyle = '#FFF';
// ctx.fillRect(ctx.canvas.width * 0.19, ctx.canvas.height* 0.19, ctx.canvas.width* 0.6, ctx.canvas.height* 0.6);

ctx.fillStyle = '#F0F';
ctx.fillRect(ctx.canvas.width * 0.2, ctx.canvas.height* 0.2, ctx.canvas.width* 0.6, ctx.canvas.height* 0.6);

// ctx.fillRect(0,0, ctx.canvas.width, ctx.canvas.height);

ctx.font = "14vw Arial";
ctx.fillStyle = '#FFF';

ctx.fillText("Odmund", ctx.canvas.width * 0.22, ctx.canvas.height*0.45);
ctx.fillText("Eetgen", ctx.canvas.width * 0.22, ctx.canvas.height*0.7);


const texture = new THREE.CanvasTexture(ctx.canvas);

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var bannerSize = 30;

var bannerTexture = new THREE.Texture(ctx.cavas);
// console.log(bannerTexture);

// var MX = 0.5;
// var MY = 0.5;
var uniforms = {
    texture1: { type: "t", value: texture },
    u_test: {value: 0},
    u_time: { value:0.0 },
    u_resolution: { value: new THREE.Vector2( bannerSize, bannerSize * (window.innerHeight / window.innerWidth)) },
    mx:{value:pos.x},
    my:{value:pos.y}
};

var shaderMaterial =
  new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader:   document.getElementById( 'vertexShader' ).textContent,
    fragmentShader: document.getElementById( 'fragmentShader' ).textContent
  });

var geometry = new THREE.PlaneGeometry( bannerSize, bannerSize * (window.innerHeight / window.innerWidth), 50, 50 );
// var material = new THREE.MeshBasicMaterial( { map: texture } );

var plane = new THREE.Mesh( geometry, shaderMaterial );
scene.add( plane );

var wireframe = new THREE.WireframeGeometry( geometry );
// 
var line = new THREE.LineSegments( wireframe );
line.material.depthTest = false;
line.material.opacity = 0.25;
line.material.transparent = true;


var curve = new THREE.EllipseCurve(
	0,  0,            // ax, aY
	10, 10,           // xRadius, yRadius
	0,  2 * Math.PI,  // aStartAngle, aEndAngle
	false,            // aClockwise
	0                 // aRotation
);

// var pointsC = curve.getPoints( 50 );
// var geometryC = new THREE.BufferGeometry().setFromPoints( pointsC );

// var materialC = new THREE.LineBasicMaterial( { color : 0xff0000 } );

// // Create the final object to add to the scene
// var ellipse = new THREE.Line( geometryC, materialC );
// var borderMat = new THREE.LineBasicMaterial({color: 0x0000ff,
//   linewidth: 10,
// 	linecap: 'round', //ignored by WebGLRenderer
//   linejoin:  'round' //ignored by WebGLRenderer});
// });
// scene.add(ellipse);

camera.position.z = 10;
var delta = 0.;

stats = createStats();
      document.body.appendChild( stats.domElement );
function animate() {
    if(prevPos.x != mousePos.x){ doThing()}
    var acc = {x:0, y:0};

    var force = {x:pos.x - dest.x, y: pos.y - dest.y};//subtractVectors(pos, dest);

    var length = distance(force, dest);
    // if(length > 0.1){
  force.x = force.x/ length;
  force.y/=length;
    force.x*=(-1 * 0.03 * length);
    force.y*=(-1 * 0.03 * length);
    acc = add(acc, force);
    vel = add(vel,acc);
    vel = mult(vel,0.955);
    pos = add(pos,vel);
    // }

// delta+=0.1;
    shaderMaterial.uniforms.mx.value = pos.x;
    shaderMaterial.uniforms.my.value = pos.y;
        requestAnimationFrame(animate);
// shaderMaterial.uniforms.u_test.value =Math.abs(Math.sin(delta));// 0.5 + Math.sin(delta) * 0.0005;
// shaderMaterial.uniforms.u_time.value =delta;
stats.update();

if (resizeRendererToDisplaySize(renderer)) {
  const canvas = renderer.domElement;
  camera.aspect = canvas.clientWidth / canvas.clientHeight;
  camera.updateProjectionMatrix();
}
        renderer.render(scene, camera);
    }
    animate();

function doThing(){

    dest.x = randRange(0.4,0.6);
    dest.y = randRange(0.4,0.6);
   
   console.log(dest)


}

function distance (start, end){

        return Math.sqrt( ((end.x - start.x ) * (end.x - start.x)) + ((end.y - start.y) * (end.y - start.y)) );
    

}


function add (start, end){

    return {x: start.x + end.x, y: start.y + end.y};


}

function mult (start, val){

    return {x: start.x * val, y: start.y * val};


}

function createStats() {
    var stats = new Stats();
    stats.setMode(0);

    // stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '100';
    stats.domElement.style.top = '1000';

    return stats;
  }

  function randRange(min, max) {
    return Math.random() * (max - min) + min;
  }
   window.onmousedown = doThing;

   window.addEventListener('mousemove', e => {
      dest.x = 0.5 + (  ( (e.x/window.innerWidth)  * 0.2) - 0.1);
      dest.y = 0.5 + (  ( (e.y/window.innerHeight) * 0.2) - 0.1);
      console.log(dest.x);

  });

  function addButton(){


  }

  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }