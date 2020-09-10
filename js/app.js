
var pos = { x: 0.45, y: 0.55 };
var dest = { x:  0.5 + ((Math.random() * 0.2) - 0.1), y:  0.5 + ((Math.random() * 0.2) - 0.1) };
var dest = { x:  0.5, y:  0.5 };

var vel = { x: 0.0, y: 0.0 };

var moving = false;
var mousePos = { x: 0, y: 0 };
var prevPos = { x: 0, y: 0 };


// var buttonSize = window.innerWidth * 0.06;
// var buttonSizeX = window.innerWidth * 0.045;
var viewPortX = window.innerWidth ;
var viewPortY = window.innerHeight;

// console.log(buttonSize);
// butt.style.left  = buttonSizeX + 'px';

// butt.style.width  = buttonSize + 'px';
// butt.style.height = buttonSize + 'px';

var bannerCanvas = document.getElementById('bannerCanvas');
var ctx = bannerCanvas.getContext("2d");
  
updateCanvas(ctx,'odmund', 'eetgen');
// ctx.canvas.width = window.innerWidth;
// ctx.canvas.height = window.innerHeight;

// console.log(ctx.canvas.height + " " + ctx.canvas.width);
// ctx.fillStyle = '#F0F';
// ctx.fillRect(ctx.canvas.width * 0.2, ctx.canvas.height * 0.2, ctx.canvas.width * 0.6, ctx.canvas.height * 0.6);


// // ctx.font = "10em Arial";
// ctx.font = window.innerWidth * 0.009+"em Arial";

// ctx.fillStyle = '#FFF';

// ctx.fillText("Odmund", ctx.canvas.width * 0.22, ctx.canvas.height * 0.45);
// ctx.fillText("Eetgen", ctx.canvas.width * 0.22, ctx.canvas.height * 0.7);


const texture = new THREE.CanvasTexture(ctx.canvas);

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xffffff, 0);
document.body.appendChild(renderer.domElement);

var bannerSize =  window.innerWidth/ 20;

var bannerTexture = new THREE.Texture(ctx.cavas);

// var MX = 0.5;
// var MY = 0.5;
var uniforms = {
  texture1: { type: "t", value: texture },
  u_test: { value: 0 },
  u_time: { value: 0.0 },
  u_resolution: { value: new THREE.Vector2(bannerSize, bannerSize * (window.innerHeight / window.innerWidth)) },
  mx: { value: pos.x },
  my: { value: pos.y }
};

var shaderMaterial =
  new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: document.getElementById('vertexShader').textContent,
    fragmentShader: document.getElementById('fragmentShader').textContent
  });

// var geometry = new THREE.PlaneGeometry(bannerSize, bannerSize * (window.innerHeight / window.innerWidth), 50, 50);
camera.position.z =100 ;



// plane.width = planeWidthAtDistance
// plane.height = planeHeightAtDistance

var geometry = new THREE.PlaneGeometry(1, 1, 50, 50);



var plane = new THREE.Mesh(geometry, shaderMaterial);

updatePlane();
// plane.scale.x = bannerSize;
// plane.scale.y = bannerSize * (window.innerHeight / window.innerWidth);
// plane.translateX(1.1);
scene.add(plane);


// var wireframe = new THREE.WireframeGeometry( geometry );
// var line = new THREE.LineSegments( wireframe );
// line.material.depthTest = false;
// line.material.opacity = 0.25;
// line.material.transparent = true;
// line.scale.x = bannerSize;
// line.scale.y = bannerSize * (window.innerHeight / window.innerWidth);
// scene.add( line );

var boundingBox = new THREE.Box3().setFromObject(plane)
var size = boundingBox.getSize() 
// console.log(size)
// camera.position.z = size.y/1.9;

var delta = 0.;

stats = createStats();
// document.body.appendChild(stats.domElement);


function animate() {
  var acc = { x: 0, y: 0 };

  var force = { x: pos.x - dest.x, y: pos.y - dest.y };//subtractVectors(pos, dest);

  var length = distance(force, dest);
  force.x = force.x / length;
  force.y /= length;
  force.x *= (-1 * 0.03 * length);
  force.y *= (-1 * 0.03 * length);
  acc = add(acc, force);
  vel = add(vel, acc);
  vel = mult(vel, 0.92);
  pos = add(pos, vel);
  // texture.needsUpdate = true;

  shaderMaterial.uniforms.mx.value = pos.x;
  shaderMaterial.uniforms.my.value = pos.y;
  // shaderMaterial.uniforms.u_time.value =delta;

  // console.log(dest)

  requestAnimationFrame(animate);

  stats.update();


  renderer.render(scene, camera);
}
animate();

function doThing() {

  dest.x = randRange(0.4, 0.6);
  dest.y = randRange(0.4, 0.6);



}

function distance(start, end) {

  return Math.sqrt(((end.x - start.x) * (end.x - start.x)) + ((end.y - start.y) * (end.y - start.y)));


}


function add(start, end) {

  return { x: start.x + end.x, y: start.y + end.y };


}

function mult(start, val) {

  return { x: start.x * val, y: start.y * val };


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



function addButton() {


}

function resizeRendererToDisplaySize() {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      // console.log('hi')
      // if()
      //   if(window.innerWidth >window.innerHeight){
      //   bannerSize = window.innerWidth / 20;
      // shaderMaterial.uniforms.u_resolution.value =[bannerSize, bannerSize * (window.innerHeight / window.innerWidth)];

      // plane.scale.x = bannerSize;
      // plane.scale.y = bannerSize * (window.innerHeight / window.innerWidth);
    // line.scale.x = bannerSize;
    // line.scale.y = bannerSize * (window.innerHeight / window.innerWidth);
//   }else{
//     bannerSize =window.innerHeight / 20;
//     shaderMaterial.uniforms.u_resolution.value =[bannerSize * (window.innerWidth / window.innerHeight),bannerSize];

//     plane.scale.y = bannerSize;
//     plane.scale.x = bannerSize * (window.innerWidth / window.innerHeight);
//     // line.scale.y = bannerSize;
//     // line.scale.x = bannerSize * (window.innerWidth / window.innerHeight);
// }
updatePlane();
updateCanvas(ctx, 'odmund', 'eetgen');
texture.needsUpdate = true;
boundingBox = new THREE.Box3().setFromObject(plane)
var size = boundingBox.getSize() 
console.log(size)
// camera.position.z = size.y/2;

var buttonSize = window.innerWidth * 0.1;
console.log(buttonSize)
// butt.style.width  = buttonSize + 'px';
// butt.style.height = buttonSize + 'px';
}

window.addEventListener('resize', resizeRendererToDisplaySize);
var topics = ['info', 'contact'];

for (i = 0; i < topics.length; i++){
// var but = document.getElementById('info');
let butt = document.getElementById(topics[i]);

butt.addEventListener('mousedown', () =>{centreCanvas(butt);});
}
function centreCanvas(but){
  dest.x = 0.5;
  dest.y = 0.5;
  // but.style.color = "red";
  var content = but.getElementsByTagName('p')[0];
  console.log(but)
  updateCanvas(ctx, but.id, content.textContent);
  texture.needsUpdate = true;

  console.log(dest)

}
// function updateCanvas(ctx, textA, textB){
  
//   ctx.canvas.width = viewPortX;
//   ctx.canvas.height = viewPortY;
  
//   ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
//   ctx.fillStyle = '#CEC';

//   ctx.fillRect(0, 0, ctx.canvas.width , ctx.canvas.height);
//   // ctx.fillStyle = '#CCF';

//   // ctx.fillRect(ctx.canvas.width * 0.05, ctx.canvas.height * 0.05, ctx.canvas.width * 0.9, ctx.canvas.height * 0.9);
//   // ctx.fillStyle = '#DDF';
//   ctx.fillStyle = '#fB9';

//   ctx.fillRect(ctx.canvas.width * 0.1, ctx.canvas.height * 0.1, ctx.canvas.width * 0.8, ctx.canvas.height * 0.8);
//   // ctx.fillStyle = '#EEF';
//   ctx.fillStyle = '#FFF';

//   ctx.fillRect(ctx.canvas.width * 0.15, ctx.canvas.height * 0.15, ctx.canvas.width * 0.7, ctx.canvas.height * 0.7);
  
//   ctx.fillStyle = '#fB9';
//   ctx.fillRect(ctx.canvas.width * 0.2, ctx.canvas.height * 0.2, ctx.canvas.width * 0.6, ctx.canvas.height * 0.6);
//  viewPortX
  
//   console.log( "fs :" + viewPortX * 0.022)
//   ctx.font = viewPortX * 0.009+"em Arial";
//   // ctx.font = viewPortX * 0.022+"vw Arial";
//   ctx.fillStyle = '#FFF';
  
//   ctx.fillText(textA, ctx.canvas.width * 0.22, ctx.canvas.height * 0.45);
//   ctx.fillText(textB, ctx.canvas.width * 0.22, ctx.canvas.height * 0.7);
   

// }
// document.onmousedown = function(){updateCanvas(ctx, 'Odmund', 'Eetgen')}
document.ontouchmove =  e => {
  dest.x = 0.5 + (((e.changedTouches[0].screenX / window.innerWidth) * 0.2) - 0.1);
  dest.y = 0.5 + (((e.changedTouches[0].screenY / window.innerHeight) * 0.2) - 0.1);
  // console.log(e.changedTouches[0].screenX)
  // dest.x = 0.5 + (((e.x / window.innerWidth) * 1.0) - 0.5);
  // dest.y = 0.5 + (((e.y / window.innerHeight) * 1.0) - 0.5);

};
window.addEventListener('mousemove', e => {
  dest.x = 0.5 + (((e.x / window.innerWidth) * 0.2) - 0.1);
  dest.y = 0.5 + (((e.y / window.innerHeight) * 0.2) - 0.1);
  let butt = document.getElementById('info');
  // butt.style.top =  e.y + "px";
  // butt.style["borderRadius"] =  e.x/10+ "px";

  // dest.x = 0.5 + (((e.x / window.innerWidth) * 1.0) - 0.5);
  // dest.y = 0.5 + (((e.y / window.innerHeight) * 1.0) - 0.5);

});


function updateCanvas(ctx, textA, textB){
  
  ctx.canvas.width = viewPortX;
  ctx.canvas.height = viewPortY;
  
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.fillStyle = '#FFF';

  ctx.fillRect(0, 0, ctx.canvas.width , ctx.canvas.height);
  // ctx.fillStyle = '#CCF';

  // ctx.fillRect(ctx.canvas.width * 0.05, ctx.canvas.height * 0.05, ctx.canvas.width * 0.9, ctx.canvas.height * 0.9);
  // ctx.fillStyle = '#DDF';
//   ctx.fillStyle = '#fB9';

//   ctx.fillRect(ctx.canvas.width * 0.1, ctx.canvas.height * 0.1, ctx.canvas.width * 0.8, ctx.canvas.height * 0.8);
//   // ctx.fillStyle = '#EEF';
//   ctx.fillStyle = '#FFF';

//   ctx.fillRect(ctx.canvas.width * 0.15, ctx.canvas.height * 0.15, ctx.canvas.width * 0.7, ctx.canvas.height * 0.7);
  
  ctx.fillStyle = '#fB9';
  ctx.fillRect(ctx.canvas.width * 0.05, ctx.canvas.height * 0.05, ctx.canvas.width * 0.9, ctx.canvas.height * 0.9);
  // ctx.fillStyle = '#468';
  // ctx.fillRect(ctx.canvas.width * 0.2, ctx.canvas.height * 0.1, ctx.canvas.width * 0.6, ctx.canvas.height * 0.8);
//  viewPortX
  
  console.log( "fs :" + viewPortX * 0.02)
  ctx.font = viewPortX * 0.01+"em Arial";
  document.body.style["fontSize"] = viewPortX * 0.01+"em Arial";

  // ctx.font = viewPortX * 0.022+"vw Arial";
  ctx.fillStyle = '#FFF';
  ctx.fillStyle = '#fca';

  ctx.fillText(textA, ctx.canvas.width * 0.2, ctx.canvas.height * 0.45);
  ctx.fillText(textB, ctx.canvas.width * 0.2, ctx.canvas.height * 0.7);
   

}

function updatePlane(){
  var cameraZ = camera.position.z;
  var planeZ = 0;
  var dist = cameraZ - planeZ;
  var aspect = window.innerWidth / window.innerHeight;
  var vFov = camera.fov * Math.PI / 180;
  var planeHeightAtDistance = 2 * Math.tan(vFov / 2) * dist;
  var planeWidthAtDistance = planeHeightAtDistance * aspect;
  plane.scale.y = planeHeightAtDistance;
  
  plane.scale.x = planeWidthAtDistance  ;

}