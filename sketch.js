var tower,tower_image;
var door,doorI,doorGroup;
var climber,climberI,climberGroup;
var ghost,ghostImage;
var iblock,iblockGroup;
var spooky;

gameState="play"


function preload(){
tower_image=loadImage("tower.png")
doorI=loadImage("door.png")
climberI=loadImage("climber.png")
ghostImage=loadImage("ghost-standing.png")
spooky=loadSound("spooky.wav")
}

function setup(){
createCanvas(600,600)
spooky.play() 
tower=createSprite(300,300,600,600)
tower.addImage(tower_image)
tower.velocityY=2;
  
ghost=createSprite(300,300,10,10)
ghost.addImage(ghostImage)
ghost.scale=0.4;
  
doorGroup=createGroup()
climberGroup=createGroup()
iblockGroup=createGroup()
}

function draw(){
  background("black")
  if(gameState==="play"){

  

  
if(tower.y>400){
  tower.y=300;
}
  
if(keyDown("space")){
  ghost.velocityY=-5;
}  
ghost.velocityY=ghost.velocityY+0.5
  
if(keyDown("right")){
  ghost.x=ghost.x+3;
}  
 if(keyDown("left")){
  ghost.x=ghost.x-3;
} 
camera.x = ghost.x
camera.y = ghost.y
  
    spawnDoor()
    
if(climberGroup.isTouching(ghost)) {
  ghost.velocityY=0;
} 
  
if(iblockGroup.isTouching(ghost) || ghost.y > 600){
ghost.destroy();
 gameState = "end"
}
   
  
  


  drawSprites()
  }
  if(gameState==="end"){
  stroke("yellow");
    fill("yellow");
    textSize(50);
    text("Game Over", 150,100)
}
}


function spawnDoor(){
if(frameCount%200===0){

  door=createSprite(300,0,10,10)
  door.x=Math.round(random(100,500))
  door.addImage(doorI)
  door.velocityY=2;
  door.lifetime=300;
  
  doorGroup.add(door)
  
  climber=createSprite(door.x,door.y+50,10,10)
  climber.addImage(climberI)
  climber.velocityY=2;
  climber.lifetime=300;
  
  climberGroup.add(climber)
  
  
  iblock=createSprite(climber.x,climber.y,climber.width,10)
  iblock.debug=true;
  iblock.velocityY=2;
  iblockGroup.add(iblock)
}
}