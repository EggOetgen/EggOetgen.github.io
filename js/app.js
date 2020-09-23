
window.onload=function(){ setTimeout(function(){ 		window.scrollTo(0, 1); 	}, 0);  console.log('consider yourself scrolled');}

var pos = { x: 0.45, y: 0.55 };
var dest = { x: 0.5 + ((Math.random() * 0.2) - 0.1), y: 0.5 + ((Math.random() * 0.2) - 0.1) };
// var dest = { x: 0.5, y: 0.5 };

var vel = { x: 0.0, y: 0.0 };

let moving = false;
let mousePos = { x: 0, y: 0 };
let prevPos = { x: 0, y: 0 };
let sensible = false;

let viewPortX = window.innerWidth;
let viewPortY = window.innerHeight;
let currPage = document.getElementById('home');


var bannerCanvas = document.getElementById('bannerCanvas');
var ctx = bannerCanvas.getContext("2d");
ctx.canvas.width = viewPortX;
ctx.canvas.height = viewPortY;

updateCanvas(ctx,    currPage.innerText, currPage.innerText);

const texture = new THREE.CanvasTexture(ctx.canvas);

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xffffff, 0);
document.body.appendChild(renderer.domElement);
// document.querySelector('#gameCanvas').appendChild(renderer.domElement);

var bannerSize = window.innerWidth / 20;

var bannerTexture = new THREE.Texture(ctx.cavas);

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
camera.position.z = 100;



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

  updatePlane();
  ctx.canvas.width = viewPortX;
  ctx.canvas.height = viewPortY;
  updateCanvas(ctx,    currPage.innerText, currPage.innerText);
  texture.needsUpdate = true;
  boundingBox = new THREE.Box3().setFromObject(plane)
  var size = boundingBox.getSize()

  var buttonSize = window.innerWidth * 0.1;
  
}

window.addEventListener('resize', resizeRendererToDisplaySize);
var buttons = ['infoButton', 'homeButton','instaButton', 'emailButton'];
// var pages = ['home',  'info']

for (i = 0; i < buttons.length; i++) {
  // var but = document.getElementById('info');
  let butt = document.getElementById(buttons[i]);

  butt.addEventListener('mousedown', () => { centreCanvas(butt); });
}
// let tog = document.getElementById('sillyToggle');

// tog.addEventListener('mousedown', toggleSilliness );
let tog = document.getElementById('silTog');

tog.addEventListener('change', toggleSilliness );
function toggleSilliness(){
  dest.x = 0.5;
  dest.y = 0.5;
  sensible = !sensible;
 
  var el = document.getElementById('mainContent');

  
  if (sensible) {
    el.style.color = 'rgba(35, 0, 7, 1.0 )'
  } else{

    el.style.color  = 'rgba(0, 0, 0, 0.0 )'
}

updateCanvas(ctx,    currPage.innerText, currPage.innerText);

    texture.needsUpdate = true;

}
function centreCanvas(but) {
  dest.x = 0.5;
  dest.y = 0.5;
  const findPage = (element) => element == but.id;
  // currPage = but.id
  let pageID = buttons.findIndex(findPage);
  // currPage = pageID;



  //  var content = but.getElementsByTagName('p')[0];
    let contentArray = document.getElementsByClassName('mainContentText')
    for (i = 0; i < contentArray.length; i++) {
        contentArray[i].style.display = 'none';
    }

    currPage = document.getElementById(but.id.replace('Button', ''));

    var content =  currPage.innerText;
    currPage.style.display = 'inline';
    texture.needsUpdate = true;

  updateCanvas(ctx, content, content);
  

}

document.ontouchmove = e => {
  dest.x = 0.5 + (((e.changedTouches[0].screenX / window.innerWidth) * 0.2) - 0.1);
  dest.y = 0.5 + (((e.changedTouches[0].screenY / window.innerHeight) * 0.2) - 0.1);
  // dest.x = 0.5 + (((e.x / window.innerWidth) * 1.0) - 0.5);
  // dest.y = 0.5 + (((e.y / window.innerHeight) * 1.0) - 0.5);

};
window.addEventListener('mousemove', e => {
  dest.x = 0.5 + (((e.x / window.innerWidth) * 0.2) - 0.1);
  dest.y = 0.5 + (((e.y / window.innerHeight) * 0.2) - 0.1);
  // let butt = document.getElementById('info');
  // butt.style.top =  e.y + "px";
  // butt.style["borderRadius"] =  e.x/10+ "px";

  // dest.x = 0.5 + (((e.x / window.innerWidth) * 1.0) - 0.5);
  // dest.y = 0.5 + (((e.y / window.innerHeight) * 1.0) - 0.5);

});


function updateCanvas(ctx, textA, textB) {

  // ctx.textAlign = "center";


ctx.font =window.getComputedStyle(currPage).getPropertyValue('font-size') + " Arial";// currPage.style['fontSize']  + " Arial";
let lines = getLines(ctx, textA, ctx.canvas.width * 0.55);

// console.log(ctx)
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.fillStyle = '#F5F5F5';

  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  
  ctx.fillStyle = '#EFFDFC';

  
  ctx.lineWidth = 2;

  ctx.strokeRect(ctx.canvas.width * 0.05, ctx.canvas.height * 0.05, ctx.canvas.width * 0.9, ctx.canvas.height * 0.9);
  // ctx.fillStyle = '#EBFAFA';

  ctx.fillRect(ctx.canvas.width * 0.1, ctx.canvas.height * 0.1, ctx.canvas.width * 0.804, ctx.canvas.height * 0.805);



  console.log(ctx.font);


  // document.body.style["fontSize"] = viewPortX * 0.01 + "em Arial";
  ctx.fillStyle = '#F00';


  // ctx.font = viewPortX * 0.022+"vw Arial";
  if (!sensible) {

    ctx.fillStyle = '#000';
    // ctx.fillStyle = '#fca';
    const textX = ctx.canvas.width * 0.2;
    const numLines = lines.length;
    
    let lineSpace; 
    if(ctx.canvas.width  > ctx.canvas.height){
    lineSpace = ctx.canvas.height/numLines;
    }else{
      lineSpace = ctx.canvas.width/numLines;;

    }
    console.log(0.5 / lineSpace)
    const textY =( ctx.canvas.height *( 0.2 + (0.25 / (numLines ))));
    
   
for(i = 0; i < lines.length; i++){

  if(window.innerWidth < 768){
    console.log('big')

      ctx.fillText(lines[i], textX, textY + (i * lineSpace/2));
   } else{
     console.log('smol')
   ctx.fillText(lines[i], textX, textY + (i * lineSpace));
   }

}
    // ctx.fillText(lines[0], ctx.canvas.width * 0.2, ctx.canvas.height * 0.45);
    // ctx.fillText(textB, ctx.canvas  .width * 0.2, ctx.canvas.height * 0.7);
  }

}

function updatePlane() {
  var cameraZ = camera.position.z;
  var planeZ = 0;
  var dist = cameraZ - planeZ;
  var aspect = window.innerWidth / window.innerHeight;
  var vFov = camera.fov * Math.PI / 180;
  var planeHeightAtDistance = 2 * Math.tan(vFov / 2) * dist;
  var planeWidthAtDistance = planeHeightAtDistance * aspect;
  plane.scale.y = planeHeightAtDistance;

  plane.scale.x = planeWidthAtDistance;

}

function getLines(ctx, text, maxWidth) {
  //https://stackoverflow.com/questions/2936112/text-wrap-in-a-canvas-element
  var words = text.split(" ");
  var lines = [];
  var currentLine = words[0];

  for (var i = 1; i < words.length; i++) {
      var word = words[i];
      var width = ctx.measureText(currentLine + " " + word).width;
      if (width < maxWidth) {
          currentLine += " " + word;
      } else {
          lines.push(currentLine);
          currentLine = word;
      }
  }
  lines.push(currentLine);
  return lines;
}