var dog, happyDog, happyDog1, database, foodS, foodStock;

function preload() {
  happyDog = loadAnimation("dogImg.png");
  happyDog1 = loadAnimation("dogImg1.png");
}

function setup() {
  database = firebase.database();
	createCanvas(500, 500);
  dog = createSprite(250, 250, 50 ,50);
  dog.addAnimation("dog", happyDog);
  dog.addAnimation("dog1", happyDog1);
  dog.scale = 0.3;
  foodStock = database.ref("food");
  foodStock.on("value", readStock);
}


function draw() {  
  background(46, 139, 87);
  drawSprites();
  textAlign(CENTER);
  textSize(20);
  fill("orange");
  stroke("black");
  text(foodS, 250, 30);
  text("Use Up Arrow key to feed Drago", 250, 100);

  if (foodS === 0){
    if (mousePressedOver(dog)) {
      foodS = foodS + 20;
    }
}

  if (keyWentDown(UP_ARROW)) {
    if (foodS > 0) {
      foodS = foodS - 1
    }
    dog.changeAnimation("dog1", happyDog1);
    }
}

function readStock(data) {
  foodS = data.val();
  console.log(foodS);
}
