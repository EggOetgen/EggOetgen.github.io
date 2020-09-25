
window.onload=function(){ setTimeout(function(){ 		window.scrollTo(0, 1); 	}, 0);  console.log('consider yourself scrolled');}

var pos = { x: 0.45, y: 0.55 };
var dest = { x: 0.5 + ((Math.random() * 0.2) - 0.1), y: 0.5 + ((Math.random() * 0.2) - 0.1) };
// var dest = { x: 0.5, y: 0.5 };

var vel = { x: 0.0, y: 0.0 };
let onPhone = false;

// device detection https://stackoverflow.com/questions/3514784/what-is-the-best-way-to-detect-a-mobile-device
if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) { 
    onPhone =true
    }
let moving = false;
let mousePos = { x: 0, y: 0 };
let prevPos = { x: 0, y: 0 };
let sensible = false;

let viewPortX = window.innerWidth;
let viewPortY = window.innerHeight;
let currPage = document.getElementById('home');
let useGyro = true;

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
if(onPhone){
var geometry = new THREE.PlaneGeometry(1, 1, 30, 30);
}else{
  var geometry = new THREE.PlaneGeometry(1, 1, 50, 50);

}


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
  vel = mult(vel, 0.94);
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
  texture.needsUpdate = true;
  boundingBox = new THREE.Box3().setFromObject(plane)
  var size = boundingBox.getSize()

  var buttonSize = window.innerWidth * 0.1;
    updateCanvas(ctx,    currPage.innerText, currPage.innerText);

}

window.addEventListener('resize', resizeRendererToDisplaySize);
var buttons = ['infoButton', 'homeButton','instaButton', 'emailButton', 'soundcloudButton'];
// var pages = ['home',  'info']

for (i = 0; i < buttons.length; i++) {
  // var but = document.getElementById('info');
  let butt = document.getElementById(buttons[i]);

  butt.addEventListener('mousedown', () => { centreCanvas(butt); });
}
// let tog = document.getElementById('sillyToggle');

// tog.addEventListener('mousedown', toggleSilliness );
let silTog = document.getElementById('silTog');
var isMobile = false; //initiate as false

if(onPhone){
  let gyroTog = document.getElementById('gyroTog');
let gyroSwitch = document.getElementById('switchGyro');
gyroSwitch.style.display = 'inline';

gyroTog.addEventListener('change', toggleGyro);
    }

function toggleGyro(){

  useGyro = !useGyro;
}


silTog.addEventListener('change', toggleSilliness );

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
    let landscape = false;
    if(ctx.canvas.width  > ctx.canvas.height){
    lineSpace = ctx.canvas.height/numLines;
    landscape = true;
    }else{
      lineSpace = ctx.canvas.width/numLines;;

    }
    console.log(0.5 / lineSpace)
    const textY =( ctx.canvas.height *( 0.2 + (0.25 / (numLines ))));
    
   
for(i = 0; i < lines.length; i++){
  console.log(window.innerWidth )

  if(window.innerWidth > 768 || landscape){
    console.log('big')

      ctx.fillText(lines[i], textX, textY + (i * lineSpace/2));
   } else{
     console.log('smol')
   ctx.fillText(lines[i], textX, textY + (i * lineSpace/1.2));
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

window.addEventListener("deviceorientation", handleOrientation, true);
function handleOrientation(event) {
  var absolute = event.absolute;
  var alpha    = event.alpha;
  var beta     = event.beta;
  var gamma    = event.gamma;
  beta -= 90;
  if(useGyro){
  // currPage.style['backgroundColor'] = 'pink';
   if(ctx.canvas.width  > ctx.canvas.height){
    dest.x = 0.5 + (((beta/ 180) * 0.4));
  dest.y = 0.5 + (((gamma / 90) * 0.4));
    }else{
     dest.y = 0.5 + (((beta/ 180) * 0.4));
  dest.x = 0.5 + (((gamma / 90) * 0.4));

    }
  
  }
}

