var monkeyImg,bananaImg,rock1,rock2;
var monkey,ground,invisibleGround;
var bGroup,oGroup;
var banana,obstacle;
var score=0;
var gameState="START";

function preload(){

  monkeyImg=loadAnimation('monkey1.png','monkey2.png','monkey3.png');
  bananaImg=loadImage('banana.png');
  rock1=loadImage('rock1.png');
  rock2=loadImage('rock2.png');

}

function setup() {

  createCanvas(600, 400);
  ground=createSprite(300,390,600,20);
  ground.visible=true;
  ground.shapeColor="brown";

  invisibleGround=createSprite(304,400,565,20);
  invisibleGround.visible=false;

  monkey=createSprite(80,360,1,1);
  monkey.addAnimation('c',monkeyImg);
  monkey.scale=0.7;
  monkey.setCollider("circle",0,0,45);
  
  bGroup=new Group();
  oGroup=new Group();

}

function draw() {
  background(220);
  // ---------------------------------
  if(gameState==="START"){
    textSize(20);
    text("PRESS SPACE TO START",200,200);
    monkey.visible=false;
  }
  // -----------------------------------
  if(gameState==="START"&&keyWentDown("space")){
    gameState="PLAY"
  }
  // -----------------------------------
  if(gameState==="PLAY"){
    monkey.visible=true;
   if(keyWentDown("space")&&monkey.y>=358.5){
    monkey.velocityY=-14;
   }
   monkey.velocityY+=0.5;
  createObstacle();
  createBananas();
  monkey.collide(invisibleGround);
  if(monkey.isTouching(oGroup)){
    gameState="OVER";
  }
  if(monkey.isTouching(bGroup)){
    bGroup.destroyEach();
    score++;
  }
// -----------------------------------
  }
  if(gameState==="OVER"){
    oGroup.setVelocityXEach(0);
    bGroup.setVelocityXEach(0);
    monkey.velocityY=0;
    oGroup.setLifetimeEach(-1);
    bGroup.setLifetimeEach(-1);
    monkey.visible=false;
    text("PRESS R TO RESTART",200,200)
 }
//  -----------------------------------
  if(gameState==="OVER"&&keyWentDown("r")){
   gameState="START";
   score=0;
  }
  // ----------------------------------
  textSize(20);
  text("SCROE : "+score,40,50);
  drawSprites();
}

// creating obstacles
function createObstacle(){
  if(frameCount%110===0){
     obstacle=createSprite(600,370,1,1);
     obstacle.velocityX=-3;
     obstacle.scale=0.08;
     obstacle.lifetime=600/3;
     oGroup.add(obstacle);
     var n=Math.round(random(1,3));
     switch(n){
       case 1:obstacle.addImage(rock1);
       break
       case 2:obstacle.addImage(rock2);
       break
       default:break;
     }
  }
}

// creating bananas
function createBananas(){
  if(frameCount%130===0){
  var a =random(100,200);
  banana=createSprite(600,a,1,1);
  banana.addImage(bananaImg)
  banana.velocityX=-3;
  banana.scale=0.3;
  banana.lifetime=600/3;
  bGroup.add(banana);
  }
}