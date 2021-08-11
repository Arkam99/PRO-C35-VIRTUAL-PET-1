var dog, happyDog, database, foodS, foodStock;
var happyDogImg, hungryDogImg;
var milk = 0;
function preload()
{
	happyDogImg = loadImage("images/dogImg.png");
  hungryDogImg = loadImage("images/dogImg1.png");
}

function setup() {
	createCanvas(500 ,500);
  dog = createSprite(250,250,1,1);
  dog.addImage(happyDogImg);
  dog.scale=0.1;

  database = firebase.database();

  foodStock = database.ref('Food');
  foodStock.on("value",redStock);

}


function draw() {  
background(46, 139, 87); 
fill("white");
text("note : Press UP_ARROW key to Feed Drag Milk!",100,10);

if(keyWentDown(UP_ARROW)){
  writeStock(milk);
  //console.log(hungryDogImg);
  dog.addImage(hungryDogImg);
  milk=milk-1;
}


drawSprites();
 text("Food Remaining : "+milk,200,200);

}
function redStock(data){
  milk=data.val();
}
function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x+1;
  }
  database.ref('/').update({
    Food:x
  })
}

