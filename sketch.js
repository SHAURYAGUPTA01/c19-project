var path,car,oppCar1,oppCar2,obstacle1,obstacle2;
var pathImg,carImg,oppCar1Img,oppCar2Img,obstacle1Img,obstacle2Img;
var oppCar1G,oppCar2G,obstacle1G,obstacle2G;
var PLAY = 1;
var END = 0;
var gameState=1;
var distance = 0;

function preload(){
 pathImg = loadImage("road.png");
 carImg = loadImage("car.png");
 oppCar1Img = loadImage("car1.png");
 oppCar2Img = loadImage("car2.png");
 obstacle1Img = loadImage("obstacle1.png");
 obstacle2Img = loadImage("obstacle2.png");
}
function setup() {
  createCanvas(windowWidth,windowHeight);

  path = createSprite(width-650,height-70);
  path.addImage("myPath",pathImg);
  path.velocityY = 4 + 2 * 0.5;

  car = createSprite(width/2,height-70);
  car.addImage("myCar",carImg);
  car.scale = 0.3;

  oppCar1G = new Group();
  oppCar2G = new Group();
  obstacle1G = new Group();
  obstacle2G = new Group();

  car.setCollider("rectangle",0,0,300,450);
  car.debug = false;
}

function draw() {
  background(0);
 
  if(gameState===PLAY){
    distance = distance + Math.round(getFrameRate()/50);
    car.x = mouseX;
    spawncar1();
    spawncar2();
    spawnObstacle1();
    spawnObstacle2();
   if(car.isTouching(oppCar1G) || car.isTouching(oppCar2G) || car.isTouching(obstacle1G) || car.isTouching(obstacle2G)){
     gameState = END;
     oppCar1G.destroyEach();
     oppCar2G.destroyEach();
     obstacle1G.destroyEach();
     obstacle2G.destroyEach();
     
   }
  }
  drawSprites();
if(gameState === END){
  fill("red");
  stroke("yellow");
  strokeWeight(6);
  textSize(40);
  text("GAME OVER",width-800,height/2);
  textSize(20);
  text("PRESS UP ARROW TO RESTART THE GAME",width-850,height-250);
  if(keyDown("up")){
    restart();
  }
}
  if(path.y > 400){
    path.y = height/2;
  }
   
    distance += 1;
    fill("blue");
    stroke("yellow");
    strokeWeight(6);
    textSize(20);
    text("DISTANCE :" + distance,80,50);
}

function restart(){
  gameState = PLAY;
  distance = 0;
  
}

function spawncar1(){
  if(frameCount % 300 === 0){
   oppCar1 = createSprite( Math.round(random(50,width-50)),40,10,50);
   oppCar1.addImage("myOppcar1",oppCar1Img);
   oppCar1.velocityY = 4 + 2 * 0.05;
   oppCar1.scale = 0.3;
   oppCar1.lifetime = 600;
   oppCar1G.add(oppCar1);
  }
}

function spawncar2(){
  if(frameCount % 250 === 0){
   oppCar2 = createSprite( Math.round(random(50,width-50)),40,10,50);
   oppCar2.addImage("myOppcar2",oppCar2Img);
   oppCar2.velocityY = 4 + 2 * 0.05;
   oppCar2.scale = 0.2;
   oppCar2.lifetime = 600;
   oppCar2G.add(oppCar2);
  }
}

function spawnObstacle1(){
  if(frameCount % 350 === 0){
   obstacle1 = createSprite( Math.round(random(50,width-50)),40,10,50);
   obstacle1.addImage("myObstacle1",obstacle1Img);
   obstacle1.velocityY = 4 + 2 * 0.05;
   obstacle1.scale = 0.2;
   obstacle1.lifetime = 600;
   obstacle1G.add(obstacle1);
  }
}

function spawnObstacle2(){
  if(frameCount % 450 === 0){
   obstacle2 = createSprite( Math.round(random(50,width-50)),40,10,50);
   obstacle2.addImage("myObstacle2",obstacle2Img);
   obstacle2.velocityY = 4 + 2 * 0.05;
   obstacle2.scale = 0.4;
   obstacle2.lifetime = 600;
   obstacle2G.add(obstacle2);
  }
}