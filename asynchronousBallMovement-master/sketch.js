var doggy;
var foodStock;
var foodS = 56;
var datbase;


function preload(){
dogNImage = loadImage("DogN.png");
dogHImage = loadImage("DogH.png");

}

function setup(){  
  datbase = firebase.database();
  
  
  createCanvas(2000,2000); 
  doggy = createSprite(1000,1000,10,10);
  doggy.addImage(dogNImage);

  foodStock= datbase.ref('Food');
  foodStock.on("value", readStock);

}


function draw(){
  background(46, 139, 87);
  if(foodS!== undefined){
   if(keyDown(UP_ARROW)){
    doggy.addImage(dogHImage);
    writeStock(foodS);
    console.log(datbase);
  } else{
    doggy.addImage(dogNImage);
  }
  }

  
  drawSprites();
  fill("yellow");
  textSize(100);
  stroke(2);
  text ("Food Stock: "+ readStock.data,500,200);
}

function readStock(data){
  Food=data.val();
}


function writeStock(x){
  if(x<=0){
    x = 0;
  }
  else{
    x = x-1;
  }
  datbase.ref('/').update({
    Food:x
  })
}
