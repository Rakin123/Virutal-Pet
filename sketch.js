var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var fedTime;
var time = 12;
var pm = 0;

//create feed and lastFed variable here
var feed, lastFed;


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  createCanvas(1000,400);
  database = firebase.database();
  

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here

  feed = createButton("Feed the dog");
  feed.position(680, 95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  

}

function draw() {
  background(46,139,87);
  foodObj.display();

  //write code to read fedtime value from the database 
  fedTime = database.ref('FeedTime');
  fedTime.on("value",function(data){lastFed = data.val()})
 
  //write code to display text lastFed time here
  if(lastFed>=12){
    fill("white")
    text("Last Feed: "+ pm + "PM", 350,30)
  }else if(lastFed === 0){
    fill("white")
    text("Last Feed: "+ time +"AM", 350,30)
  }else{
    fill("white")
    text("Last Feed: "+ time + "AM", 350,30)
  }
 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);

  //write code here to update food stock and last fed time
  foodS = foodS - 1;
  database.ref('/').update({
   Food:foodS
  })

  time = time + 1

  database.ref('/').update({FeedTime:time})

  if(time === 24 ){
    time = 1;
    database.ref('/').update({FeedTime:time})
  }else if (time >12){
    pm = time-12;
    database.ref('/').update({FeedTime:time})
  }
}


//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
