
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  var survivalTime = 0;
  
  monkey = createSprite(50,250,10,10);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.1;

  ground = createSprite(70,350,800,10);
  ground.velocityX = -3;
  ground.x = ground.width/2;
  
  FoodGroup = createGroup();
  obstacleGroup = createGroup();
  
}


function draw() {
  background(255);
  
  if(ground.x < 0) {
    ground.x = ground.width/2;
  }
  
  if(keyDown("space")) {
    monkey.velocityY = -12;
  }

  monkey.velocityY = monkey.velocityY + 0.5;
  monkey.collide(ground);
  
  spawnFood();
  spawnObstacle();
  drawSprites();
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: " + score,450,50);
  
  if(obstacleGroup.isTouching(monkey)) {
    ground.velocityX = 0;
    monkey.velocityY = 0;
    obstacleGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
  }
  stroke("black");
  textSize(20);
  fill("balck");
  survivalTime = Math.ceil(frameCount/frameRate()) 
  text("survival Time: " + survivalTime, 100,50);
  
}
function spawnFood() {
  if(frameCount % 80 === 0) {
    banana = createSprite(600,250,40,10);
    banana.addImage(bananaImage);
    banana.y = Math.round(random(120,200));
    banana.scale = 0.1;
    banana.velocityX = -3;
    banana.lifetime = 200;
    
    FoodGroup.add(banana);
  }
}

function spawnObstacle() {
  if(frameCount % 300 === 0) {
    obstacle = createSprite(800,300,10,40);
    obstacle.velocityX = -6;
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
    
    obstacleGroup.add(obstacle);
  }
}