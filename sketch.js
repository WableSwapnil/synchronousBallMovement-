var hypnoticBall, database;
var height;


function setup(){
  database = firebase.database();
  console.log(database);
  createCanvas(500,500);

  hypnoticBall = createSprite(250,250,10,10);
  hypnoticBall.shapeColor = "red";


  var hypnoticBallPosition = database.ref('balloon/height');
  hypnoticBallPosition.on("value", readPosition, showError);
}

function draw(){
  if(height.x!=undefined){
    console.log(height.x)
  background("white");
  
    if(keyDown(LEFT_ARROW)){
      writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
      writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
      writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
      writePosition(0,+1);
    }
    drawSprites();
  
  }
}

function writePosition(x,y){
  database.ref('balloon/height').set({
    'x': height.x + x ,
    'y': height.y + y
  })
}

function readPosition(data){
  height = data.val();
  console.log(height.x);
  hypnoticBall.x = height.x;
  hypnoticBall.y = height.y;
}

function showError(){
  console.log("Error in writing to the database");
}
