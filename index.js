var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeNorth = new Image();
var pipeSouth = new Image();

bird.src = "bird.png";
bg.src = "bg.png";
fg.src = "fg.png";
pipeNorth.src = "pipeNorth.png";
pipeSouth.src = "pipeSouth.png";

var gap = 85;
var constant;

var bX = 10;
var bY = 150;

var gravity = 1.8;

var score = 0;

document.addEventListener("keydown",moveUp);

function moveUp(){
    bY -= 28;
}


var pipe = [];

pipe[0] = {
    x : cvs.width,
    y : 0
};
function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return 0;
}

function draw(){
    var prevHigh = getCookie('highscore')
    if (prevHigh == 0){
        setCookie('highscore', 0, 10)
    }
    highscore = getCookie('highscore')
    ctx.drawImage(bg,0,0);
    
    
    for(var i = 0; i < pipe.length; i++){
        
        constant = pipeNorth.height+gap;
        ctx.drawImage(pipeNorth,pipe[i].x,pipe[i].y);
        ctx.drawImage(pipeSouth,pipe[i].x,pipe[i].y+constant);
             
        pipe[i].x--;
        
        if( pipe[i].x == 125 ){
            pipe.push({
                x : cvs.width,
                y : Math.floor(Math.random()*pipeNorth.height)-pipeNorth.height
            }); 
        }
        
        if( bX + bird.width >= pipe[i].x && bX <= pipe[i].x + pipeNorth.width && (bY <= pipe[i].y + pipeNorth.height || bY+bird.height >= pipe[i].y+constant) || bY + bird.height >=  cvs.height - fg.height){
            
            if (score > highscore){
                console.log(score > highscore)
                setCookie('highscore', score, 10)
            }
            highscore = getCookie('highscore')
            alert(`You current score is ${score} and highscore is ${highscore}`)
            location.reload()
            cancelAnimationFrame(req)
        }
        
        if(pipe[i].x == 5){
            score++;
        }
        
        
    }

    ctx.drawImage(fg,0,cvs.height - fg.height);
    
    ctx.drawImage(bird,bX,bY);
    
    bY += gravity;
    
    ctx.fillStyle = "#000";
    ctx.font = "20px Verdana";
    ctx.fillText("Score : "+score,10,cvs.height-20);
    
    req = requestAnimationFrame(draw);    
}

started = false
first = true
function startGame(){
    if (!started){
        started = true
    }
}

function checkGameStatus(){
    if (started){
        if (first){
            if (document.getElementsByClassName('StartButton')[0].style.display = "block"){
                document.getElementsByClassName('StartButton')[0].style.display = "none"
            }
            first = false
            draw()
        }
    }
}

document.addEventListener('DOMContentLoaded', function(){
    myVar = setInterval(checkGameStatus, 100)
})
