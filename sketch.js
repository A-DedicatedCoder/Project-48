var bg,bgImg;
var boy,boyImg;
var canvas;
var invisibleground;
var mask,maskImage;
var sanitizer,sanitizerImage;
var virus,virusImage;
var gameState = "Play";
var score = 0;
var maskgroup;
var sanitizergroup,virusgroup;
var restart,restartImg;
var boygameoverImg;
var gameover,gameoverImg;

function preload(){

bgImg = loadImage("bg.jpg");
boyImg = loadAnimation("boy4.png","boy5.png","boy6.png","boy8.png");
maskImage = loadImage("mask.png");
sanitizerImage = loadImage("sanitizer.png");
virusImage = loadImage("virus.png");
maskgroup = new Group();
sanitizergroup = new Group();
virusgroup = new Group(); 
restartImg = loadImage("restart.png");
boygameoverImg = loadAnimation("boy4.png","boy4.png");
gameoverImg = loadImage("gameover.png");
}




function setup() {

canvas = createCanvas(windowWidth,windowHeight);

bg = createSprite(windowWidth/2,windowHeight/2,windowWidth,windowHeight);
bg.addImage("background",bgImg);
bg.scale = 2.5;

boy = createSprite(500,280,20,50);
boy.addAnimation("running",boyImg);
boy.addAnimation("gameover",boygameoverImg);
boy.scale = 0.8;
boy.setCollider("rectangle",0,0,boy.width-15,boy.height-5);

invisibleground = createSprite(300,windowHeight-50,windowWidth,20);
invisibleground.visible = false;

restart = createSprite(windowWidth/2,windowHeight/2,30,50);
restart.addImage("restart",restartImg);
restart.visible = false;
restart.scale = 0.3;

gameover = createSprite(windowWidth/2,windowHeight/2-150,20,50);
gameover.addImage("gameOver",gameoverImg);
gameover.visible = false;
gameover.scale = 0.3;

}

function draw() {
  background("white");

  if(gameState==="Play"){
    bg.velocityX = 2.5;
    boy.velocityX = 3;
    if(bg.x>windowWidth/2){
      bg.x = 0;
       }
    
      if(boy.x>windowWidth/2){
        boy.x = 0;
      }
    
     if(keyDown("SPACE")&&boy.y>500){
       boy.velocityY = -22;
     }
     
     boy.velocityY = boy.velocityY+1;
     spawnMasks();
     spawnSanitizers();
     spawnVirus();
     
     if(maskgroup.isTouching(boy)){
       score = score + 2;
       maskgroup.destroyEach();
     }

     if(sanitizergroup.isTouching(boy)){
      score = score + 5;
      sanitizergroup.destroyEach();
    }
     

     if(virusgroup.isTouching(boy)){
       gameState = "End";
     }
  }
  
  if(gameState==="End"){
  bg.velocityX = 0;
  boy.velocityY = 0;
  boy.velocityX = 0;
  maskgroup.setVelocityEach(0);
  sanitizergroup.setVelocityEach(0);
  virusgroup.setVelocityEach(0);
  maskgroup.setLifetimeEach(-1);
  sanitizergroup.setLifetimeEach(-1);
  virusgroup.setLifetimeEach(-1);
  virusgroup.setColliderEach("rectangle",0,0,virus.width-15,virus.height-5);
  gameover.visible = true;
  restart.visible = true;
  boy.changeAnimation("gameover",boygameoverImg);
  }

  if(score>25){
    boy.velocityX = 5;
  }
  if(score>50){
    boy.velocityX = 7;
  }

  if(mousePressedOver(restart)){
    gameState = "Play";
    score = 0;
    restart.visible = false;
    gameover.visible = false;
    boy.changeAnimation("running",boyImg);
  }

 boy.collide(invisibleground);
 
  drawSprites();
  fill("red");
  textSize(30);
  text("Score: "+score,700,55);
}
function spawnMasks(){

if(frameCount%100===0){
mask = createSprite(400,300,20,40);
mask.addImage("mask",maskImage);
mask.scale = 0.2;
mask.y = Math.round(random(500,300));
mask.velocityX = -2;
mask.lifetime = 110;
maskgroup.add(mask);
}
}

function spawnSanitizers(){
  if(frameCount%150===0){
    sanitizer = createSprite(400,250,20,40);
    sanitizer.addImage("sanitizer",sanitizerImage);
    sanitizer.scale = 0.2;
    sanitizer.y = Math.round(random(520,260));
    sanitizer.velocityX = -4;
    sanitizer.lifetime = 110; 
    sanitizergroup.add(sanitizer);
}
}
function spawnVirus(){
  if(frameCount%500===0){
    virus = createSprite(350,250,20,40);
    virus.addImage("virus",virusImage);
    virus.scale = 0.15;
    virus.y = Math.round(random(550,280));
    virus.velocityX = -3;
    virus.lifetime = 110; 
    virusgroup.add(virus);
    
}
}
