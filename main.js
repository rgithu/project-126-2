song1="";
song2="";

scorerightwrist = "" ; 
scoreleftwrist = "" ; 

leftwristX = 0;
leftwristY = 0;

rightwristX = 0;
rightwristY = 0;

function preload(){
    song1 = loadSound('music.mp3');
    song2 = loadSound('music2.mp3');
}


function setup(){
    canvas = createCanvas(500,400);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    posenet = ml5.poseNet(video , modelLoaded);
    posenet.on('pose',gotPoses);
}

function modelLoaded(){
    console.log("poseNet is initialized");
}


function gotPoses(results){
    if(results.length>0){
console.log(results);

leftwristX = results[0].pose.leftWrist.x;
leftwristY = results[0].pose.leftWrist.y;
console.log("leftwristX = "+leftwristX+" , leftwristY = "+leftwristY);

rightwristX = results[0].pose.rightWrist.x;
rightwristY = results[0].pose.rightWrist.y;
console.log("rightwristX = "+rightwristX+ " , rightwristY = "+rightwristY);
    }
}

function draw(){
    image(video , 0 , 0 ,500,400);
    fill("#03fcf0");
    stroke("#03fcf0");

   if(scorerightwrist > 0.1){
      circle(rightwristX , rightwristY , 20);
      if(rightwristY > 0 && rightwristY <= 100){
        document.getElementById("speed").innerHTML = "Speed = 0.5x";
        song.rate(0.5);
      }
      else if(rightwristY >100 && rightwristY <= 200){
        document.getElementById("speed").innerHTML = "Speed = 1x";
        song.rate(1);
      }
      else if(rightwristY >200 && rightwristY <= 300){
        document.getElementById("speed").innerHTML = "Speed = 1.5x";
        song.rate(1.5);
      }
      else if(rightwristY > 300 && rightwristY<= 400){
        document.getElementById("speed").innerHTML = "Speed = 2x";
        song.rate(2);
      }
      else if(rightwristY >400){
        document.getElementById("speed").innerHTML = "Speed = 2.5x";
        song.rate(2.5);
      }
   }


    if(scoreleftwrist > 0.1){
        circle(leftwristX,leftwristY,20);
        inleftwristY = Number(leftwristY);
        new_leftwristY = floor(inleftwristY*2);
        leftwristY_divide_1000 = new_leftwristY/1000;
        document.getElementById("Volume").innerHTML = "Volume = " +leftwristY_divide_1000;
        song.setVolume(leftwristY_divide_1000);
    }

}

