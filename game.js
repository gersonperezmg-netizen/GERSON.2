let scene, camera, renderer, car;
let speed = 0.15;
let coins = 0;

const keys = { left:false, right:false, up:false };

init();
animate();

function init(){
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000010);

  camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
  camera.position.set(0,5,10);

  renderer = new THREE.WebGLRenderer({antialias:true});
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Luz
  const light = new THREE.PointLight(0x00ffff, 2, 100);
  light.position.set(0,10,0);
  scene.add(light);

  const ambient = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambient);

  // Piso mundo abierto
  const groundGeo = new THREE.PlaneGeometry(500,500);
  const groundMat = new THREE.MeshStandardMaterial({color:0x050505});
  const ground = new THREE.Mesh(groundGeo, groundMat);
  ground.rotation.x = -Math.PI/2;
  scene.add(ground);

  // Carro futurista
  const carGeo = new THREE.BoxGeometry(1,0.5,2);
  const carMat = new THREE.MeshStandardMaterial({color:0x00ffff, emissive:0x00ffff});
  car = new THREE.Mesh(carGeo, carMat);
  car.position.y = 0.3;
  scene.add(car);

  // Edificios
  for(let i=0;i<200;i++){
    const bGeo = new THREE.BoxGeometry(2,Math.random()*8+2,2);
    const bMat = new THREE.MeshStandardMaterial({color:0x111111, emissive:0x00ffff});
    const b = new THREE.Mesh(bGeo,bMat);
    b.position.set(
      (Math.random()-0.5)*400,
      b.geometry.parameters.height/2,
      (Math.random()-0.5)*400
    );
    scene.add(b);
  }

  // Eventos teclado
  document.addEventListener('keydown', e=>{
    if(e.key=="ArrowLeft") keys.left=true;
    if(e.key=="ArrowRight") keys.right=true;
    if(e.key=="ArrowUp") keys.up=true;
  });

  document.addEventListener('keyup', e=>{
    if(e.key=="ArrowLeft") keys.left=false;
    if(e.key=="ArrowRight") keys.right=false;
    if(e.key=="ArrowUp") keys.up=false;
  });

  // Botones móviles
  left.onclick = ()=> keys.left=true;
  right.onclick = ()=> keys.right=true;
  up.onclick = ()=> keys.up=true;

  left.ontouchend = right.ontouchend = up.ontouchend = ()=>{
    keys.left=false; keys.right=false; keys.up=false;
  };

  shopBtn.onclick = ()=> document.getElementById("shop").style.display="block";
}

function animate(){
  requestAnimationFrame(animate);

  if(keys.up){
    car.position.z -= speed;
    coins++;
    document.getElementById("coins").innerText = "💰 "+coins;
  }
  if(keys.left) car.rotation.y += 0.05;
  if(keys.right) car.rotation.y -= 0.05;

  camera.position.x = car.position.x;
  camera.position.z = car.position.z + 10;
  camera.lookAt(car.position);

  renderer.render(scene,camera);
}

// Tienda
function buySpeed(){
  if(coins>=10){
    coins-=10;
    speed+=0.05;
  }
}

function buyColor(){
  if(coins>=5){
    coins-=5;
    car.material.color.set(Math.random()*0xffffff);
  }
}

function closeShop(){
  document.getElementById("shop").style.display="none";
}
