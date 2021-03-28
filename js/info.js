let onPhone = false;
var slideIndex = 1;

// device detection https://stackoverflow.com/questions/3514784/what-is-the-best-way-to-detect-a-mobile-device
if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) { 
    onPhone =true
    }

let currPage = document.getElementById('info');
let bannerCanvas = document.getElementById('bannerCanvas');
window.addEventListener("deviceorientation", handleOrientation, true);

var buttons = ['teachButton', 'homeButton','vaseButton', 'wcButton', 'acidButton', 'dwainButton', 'typeButton'];
for (i = 0; i < buttons.length; i++) {
  const butt = document.getElementById(buttons[i]);

  butt.addEventListener('mousedown', () => { buttonPressed(butt); });
}
window.onresize = resizeRendererToDisplaySize;
window.onorientationchange = resizeRendererToDisplaySize;
let silTog = document.getElementById('silTog');
let camTog = document.getElementById('camTog');
// silTog.addEventListener('change', toggleSilliness );
// camTog.addEventListener('change', toggleCamera );
// if(onPhone){
// let gyroTog = document.getElementById('gyroTog');
// let gyroSwitch = document.getElementById('switchGyro');
// gyroSwitch.style.display = 'inline';

// gyroTog.addEventListener('change', toggleGyro);
// }

var pos = { x: 0.45, y: 0.55 };
var dest = { x: 0.5 + ((Math.random() * 0.2) - 0.1), y: 0.5 + ((Math.random() * 0.2) - 0.1) };

var vel = { x: 0.0, y: 0.0 };
let mousePos = { x: 0, y: 0 };
let prevPos = { x: 0, y: 0 };


let moving = false;

let sensible = false;

let viewPortX = window.innerWidth;
let viewPortY = window.innerHeight;
let useGyro = true;
let useCam = false;


let ctx = bannerCanvas.getContext("2d");
ctx.canvas.width = viewPortX;
ctx.canvas.height = viewPortY;
const videoEl = document.getElementById('video');
const constraints = {
    video: true,
    audio: false
};
updateCanvas(ctx,    document.querySelector("#home").innerText, document.querySelector("#home").innerText);

let camera, scene, renderer, texture, textureCam, plane, shaderMaterial;

function initScene(){
 texture = new THREE.CanvasTexture(ctx.canvas);
 textureCam = new THREE.VideoTexture(videoEl);

 scene = new THREE.Scene();
 camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

 renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xffffff, 0);
renderer.setPixelRatio( window.devicePixelRatio );

document.body.appendChild(renderer.domElement);

var bannerSize = window.innerWidth / 20;

var uniforms = {
  texture1: { type: "t", value: texture },
    texture2: { type: "t", value: textureCam},
  u_test: { value: 0 },
  u_time: { value: 0.0 },
  u_resolution: { value: new THREE.Vector2(bannerSize, bannerSize * (window.innerHeight / window.innerWidth)) },
  mx: { value: pos.x },
  my: { value: pos.y },
  cam: {value: 0.0 }
};

 shaderMaterial =
  new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: document.getElementById('vertexShader').textContent,
    fragmentShader: document.getElementById('fragmentShader').textContent
  });

camera.position.z = 100;

let geometry;
if(onPhone){
  geometry = new THREE.PlaneGeometry(1, 1, 30, 30);
}else{
  geometry = new THREE.PlaneGeometry(1, 1, 50, 50);
}

plane = new THREE.Mesh(geometry, shaderMaterial);

updatePlane();
scene.add(plane);

}

// stats = createStats();
// document.body.appendChild(stats.domElement);


function animate() {
  var acc = { x: 0, y: 0 };

  var force = { x: pos.x - dest.x, y: pos.y - dest.y };

  var length = distance(force, dest);
  force.x = force.x / length;
  force.y /= length;
  force.x *= (-1 * 0.03 * length);
  force.y *= (-1 * 0.03 * length);
  acc = add(acc, force);
  vel = add(vel, acc);
  vel = mult(vel, 0.94);
  pos = add(pos, vel);

  shaderMaterial.uniforms.mx.value = pos.x;
  shaderMaterial.uniforms.my.value = pos.y;

  
  requestAnimationFrame(animate);

  renderer.render(scene, camera);
 

}
  // animate();


function distance(start, end) {

  return Math.sqrt(((end.x - start.x) * (end.x - start.x)) + ((end.y - start.y) * (end.y - start.y)));


}


function add(start, end) {

  return { x: start.x + end.x, y: start.y + end.y };


}

function mult(start, val) {

  return { x: start.x * val, y: start.y * val };


}

// function createStats() {
//   var stats = new Stats();
//   stats.setMode(0);

//   // stats.domElement.style.position = 'absolute';
//   stats.domElement.style.left = '100';
//   stats.domElement.style.top = '1000';

//   return stats;
// }

// function randRange(min, max) {
//   return Math.random() * (max - min) + min;
// }





function resizeRendererToDisplaySize() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  updatePlane();
  ctx.canvas.width = viewPortX;
  ctx.canvas.height = viewPortY;
  texture.needsUpdate = true;
  
  var buttonSize = window.innerWidth * 0.1;
  updateCanvas(ctx,    document.getElementById('home').innerText, document.getElementById('home').innerText);

}


function toggleGyro(){
  useGyro = !useGyro;
}


function toggleCamera(){
  if(useCam){
    shaderMaterial.uniforms.cam.value = 0;
    videoEl.srcObject.getTracks()[0].stop();
  }else{
    shaderMaterial.uniforms.cam.value = 1;
    getWebcam(); 
  }
  
  useCam = !useCam;
}



function buttonPressed(but) {
  dest.x = 0.5;
  dest.y = 0.5;
 slideIndex = 1;
  const contentArray = document.getElementsByClassName('mainContentContent')
    for (i = 0; i < contentArray.length; i++) {
        contentArray[i].style.display = 'none';
    }

 currPage = document.getElementById(but.id.replace('Button', ''));
 currPageInfo = document.getElementById(but.id.replace('Button', 'Info'));
 currPageHead = document.getElementById(but.id.replace('Button', 'Head'));

//   var content =  currPage.innerText;
  currPage.style.display = 'inline'; 
   currPageInfo.style.display = 'inline-block';
   currPageHead.style.display = 'inline-block';

  texture.needsUpdate = true;

//   updateCanvas(ctx, content, content);
  

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
  // dest.x = 0.5 + (((e.x / window.innerWidth) * 1.0) - 0.5);
  // dest.y = 0.5 + (((e.y / window.innerHeight) * 1.0) - 0.5);
});


function updateCanvas(ctx, textA, textB) {

  ctx.font =window.getComputedStyle(document.getElementById('home')).getPropertyValue('font-size') + " Arial";
  if(!onPhone)
   lines = getLines(ctx, "Some Stuff I've Done", ctx.canvas.width * 0.55);
else
 lines = getLines(ctx, "Stuff I've Done", ctx.canvas.width * 0.55);

  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  ctx.fillStyle = '#F5F5F5';
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  
  ctx.fillStyle = '#EFFDFC';
  // ctx.lineWidth = 2;
  ctx.strokeRect(ctx.canvas.width * 0.05, ctx.canvas.height * 0.05, ctx.canvas.width * 0.9, ctx.canvas.height * 0.9);
//   ctx.fillRect(ctx.canvas.width * 0.1, ctx.canvas.height * 0.1, ctx.canvas.width * 0.804, ctx.canvas.height * 0.805);

  ctx.fillStyle = '#F00';

    ctx.fillStyle = '#EFFDFC';
    if(!onPhone)
     textX = ctx.canvas.width * 0.4;
     else
     textX = ctx.canvas.width * 0.2;

    const numLines = lines.length;
    
    let lineSpace; 
    let landscape = false;
    if(ctx.canvas.width  > ctx.canvas.height){
      lineSpace = ctx.canvas.height/numLines;
      landscape = true;
    }else{
      lineSpace = ctx.canvas.width/numLines;;
    }
  if(!onPhone)
     textY =( ctx.canvas.height *( 0.25 + (0.25 / (numLines ))));
    else
     textY =( ctx.canvas.height *( 0.15 + (0.25 / (numLines ))));

   
    for(i = 0; i < lines.length; i++){
      if(window.innerWidth > 768 || landscape){
        // console.log('big')
        ctx.fillText(lines[i], textX, textY + (i * lineSpace/2));
      } else{
        //  console.log('smol')
        ctx.fillText(lines[i], textX, textY + (i * lineSpace/1.2));
      }
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

function handleOrientation(event) {
  var absolute = event.absolute;
  var alpha    = event.alpha;
  var beta     = event.beta;
  var gamma    = event.gamma;
  beta -= 90;
  if(useGyro){
   if(ctx.canvas.width  > ctx.canvas.height){
      dest.x = 0.5 + (((beta/ 180) * 0.4));
      dest.y = 0.5 + (((gamma / 90) * 0.4));
    }else{
      dest.y = 0.5 + (((beta/ 180) * 0.4));
      dest.x = 0.5 + (((gamma / 90) * 0.4));
    }  
  }
}

function getWebcam() {
    return navigator.mediaDevices.getUserMedia(constraints)
        .then(stream => {
            videoEl.srcObject = stream;
           
            mediaRecorder = new MediaRecorder(stream);
            
            return new Promise((resolve, reject) => {
                videoEl.onloadedmetadata = (e) => {
                    videoEl.style.width =viewPortX;// `${videoEl.clientWidth}px`;
                    videoEl.style.height = viewPortY;//`${videoEl.clientHeight}px`;
                    videoEl.width = viewPortX;//videoEl.clientWidth;
                    videoEl.height = viewPortY;//videoEl.clientHeight;
                
                    videoEl.play();

                    resolve(videoEl);
                };
            });
        });
}
Promise.all([
    initScene()
]).then(() => {
  animate();
});


showSlides(slideIndex, 0, 6);

// Next/previous controls
function plusSlides(n, start, total) {
  showSlides(slideIndex += n, start, total);
}

// Thumbnail image controls
function currentSlide(n, start, total) {
  showSlides(slideIndex = n, start, total);
}

function showSlides(n, start,total) {
    // slideIndex+=start;
  var i;
  var slides = document.getElementsByClassName("mySlides");
  if (n > total ) {slideIndex = 1}
  if (n < 1) {slideIndex = total}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  slides[start+slideIndex-1].style.display = "inline-block";
}