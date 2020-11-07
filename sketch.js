var dog, happyDog, happyDog1, database, foodS, foodStock;
var addFood, feed;
var fedTime, lastFed;
var foodObj;

function preload() {
  happyDog = loadAnimation("dogImg.png");
  happyDog1 = loadAnimation("dogImg1.png");
}

function setup() {
  database = firebase.database();
	createCanvas(1000, 500);
  dog = createSprite(250, 250, 50 ,50);
  dog.addAnimation("dog", happyDog);
  dog.addAnimation("dog1", happyDog1);
  dog.scale = 0.3;
  foodStock = database.ref("food");
  foodStock.on("value", readStock, writeStock);
  fedTime = database.ref('FeedTime');
  fedTime.on("value", function(data) {
    lastFed = data.val();
  });
  foodObj = new Food();
}


function draw() {  
  background(46, 139, 87);
  foodObj.display();
  drawSprites();
  textAlign(CENTER);
  textSize(20);
  fill("orange");
  stroke("black");
  text(foodS, 100, 30);
  // text("Use Up Arrow key to feed Drago", 250, 100);
  

  fill(255, 255, 254);
  textSize(15);
  if (lastFed >= 12) {
    text("Last Feed : 12 AM", 350, 30);
  }else if (lastFed === 0) {
    text("Last Feed : " + lastFed % 12 + "PM", 350, 30);
  }else {
    text("Last Feed : " + lastFed + "AM", 350, 30);
  }

  feed = createButton("Feed the Dog");
  feed.position(700, 95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800, 95);
  addFood.mousePressed(addFoods);

  if (foodS === 0){
    if (mousePressedOver(dog)) {
      foodS = foodS + 20;
    }
}

    if (foodS <= 0) {
      dog.changeAnimation("dog", happyDog);
    }
} 

function readStock(data) {
  foodS = data.val();
  console.log(foodS);
}

function feedDog() {
  dog.changeAnimation("dog1", happyDog1);
  foodObj.deductFood(foodS = foodS - 1);
  database.ref('/').update({
    food: foodObj.getFoodStock(),
    FeedTime: hour() 
  })
}

function addFoods() {
  foodObj.updateFoodStock(foodS = foodS + 1);
  database.ref('/').update({
    food: foodS
  })
}
function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  } 
  database.ref('/').update({
    food:x
  })
}