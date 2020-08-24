
var pos = { x: 0.45, y: 0.55 };
var dest = { x: 0.5, y: 0.5 };
var vel = { x: 0.0, y: 0.0 };

var moving = false;
var mousePos = { x: 0, y: 0 };
var prevPos = { x: 0, y: 0 };

var butt = document.getElementById('but');

// bo.addEventListener("mousemove", myScript);
let mouseDown = false;
document.onmousedown = function () { mouseDown = true }
document.onmouseup = function () { mouseDown = false }

document.onmousemove = function (e) {
  if (mouseDown) {
    let posX = (e.clientX / window.innerWidth) * 100;
    let posY = (e.clientY / window.innerHeight) * 100;
    // posX -=10;


    // butt.style.left = posX + "%"
    // butt.style.top = posY + "%"
  }
};

var bannerCanvas = document.getElementById('bannerCanvas');
var ctx = bannerCanvas.getContext("2d");

ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

console.log(ctx.canvas.height + " " + ctx.canvas.width);
ctx.fillStyle = '#F0F';
ctx.fillRect(ctx.canvas.width * 0.2, ctx.canvas.height * 0.2, ctx.canvas.width * 0.6, ctx.canvas.height * 0.6);


ctx.font = "10em Arial";
ctx.fillStyle = '#FFF';

ctx.fillText("Odmund", ctx.canvas.width * 0.22, ctx.canvas.height * 0.45);
ctx.fillText("Eetgen", ctx.canvas.width * 0.22, ctx.canvas.height * 0.7);


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

var geometry = new THREE.PlaneGeometry(1, 1, 50, 50);


var plane = new THREE.Mesh(geometry, shaderMaterial);

plane.scale.x = bannerSize;
plane.scale.y = bannerSize * (window.innerHeight / window.innerWidth);

scene.add(plane);


camera.position.z = 20;
var delta = 0.;

stats = createStats();
document.body.appendChild(stats.domElement);


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
  vel = mult(vel, 0.9);
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

window.addEventListener('mousemove', e => {
  dest.x = 0.5 + (((e.x / window.innerWidth) * 0.2) - 0.1);
  dest.y = 0.5 + (((e.y / window.innerHeight) * 0.2) - 0.1);

});

function addButton() {


}

function resizeRendererToDisplaySize() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
    // console.log('hi')
    // if()
    if(window.innerWidth >window.innerHeight){
    bannerSize =window.innerWidth / 20;
  shaderMaterial.uniforms.u_resolution.value =[bannerSize, bannerSize * (window.innerHeight / window.innerWidth)];

  plane.scale.x = bannerSize;
  plane.scale.y = bannerSize * (window.innerHeight / window.innerWidth);
}else{
  bannerSize =window.innerHeight / 20;
  shaderMaterial.uniforms.u_resolution.value =[bannerSize * (window.innerWidth / window.innerHeight),bannerSize];

  plane.scale.y = bannerSize;
  plane.scale.x = bannerSize * (window.innerWidth / window.innerHeight);
}
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
ctx.fillStyle = '#F0F';
ctx.fillRect(ctx.canvas.width * 0.2, ctx.canvas.height * 0.2, ctx.canvas.width * 0.6, ctx.canvas.height * 0.6);


ctx.font = window.innerWidth * 0.009+"em Arial";
ctx.fillStyle = '#FFF';

ctx.fillText("Odmund", ctx.canvas.width * 0.22, ctx.canvas.height * 0.45);
ctx.fillText("Eetgen", ctx.canvas.width * 0.22, ctx.canvas.height * 0.7);
  texture.needsUpdate = true;


}

window.addEventListener('resize', resizeRendererToDisplaySize);
but.addEventListener('mousedown', function () {
  dest.x = 0.5;
  dest.y = 0.5;

  but.style.color = "red";
  // console.log(dest)
});
