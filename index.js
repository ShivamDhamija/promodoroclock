var timeDiv=document.getElementById("timeDiv");
var session=document.getElementById("session");
var sessionTime=document.getElementById("sessionTime");
var breakTime=document.getElementById("breakTime");

var s_min_btn=document.getElementById("s_min");
var s_add_btn=document.getElementById("s_add");

var b_min_btn=document.getElementById("b_min");
var b_add_btn=document.getElementById("b_add");

var start_btn=document.getElementById("start");
var pause_btn=document.getElementById("pause");
var reset_btn=document.getElementById("reset");

var startTime=20;
var restTime=5;

var sessionNo=1;

var minTime=secTime;
var secTime=0;

var id;

var pause_click=false;
var pause_min;
var pause_sec;

var breakTimeClick=false;

s_add_btn.addEventListener("click",function(){
 startTime++;
 sessionTime.innerText=startTime+" min";
});
s_min_btn.addEventListener("click",function(){
    if(startTime>1)
startTime--;
sessionTime.innerText=startTime+" min";
});
b_add_btn.addEventListener("click",function(){
restTime++;
breakTime.innerText=restTime+" min";
});
b_min_btn.addEventListener("click",function(){
    if(restTime>1)
restTime--;
breakTime.innerText=restTime+" min";
});

start_btn.addEventListener("click",function(){
    
    s_add_btn.disabled=true;
    s_min_btn.disabled=true;
    b_add_btn.disabled=true;
    b_min_btn.disabled=true;

  sessionTimeDisplay();
    
    
    
})

function sessionTimeDisplay(min=startTime,sec=0)
{ 
    breakTimeClick=false;
    session.innerText="Session "+sessionNo;
    
    id= setInterval(function(){
        if(min===0&&sec<0)
        {  
            clearInterval(id);
            breakTimeClick=true;
            session.innerText="Break"
            sessionNo++;
            breakTimeDisplay();
        }
        else if(sec<0)
        {
            sec=59;
            min--;
            Display(min,sec);
        }
        else
        Display(min,sec);
        minTime=min;
        secTime=sec;
        sec--;
        
    },1000);


}

function breakTimeDisplay( min =restTime,sec=0)
{

    id= setInterval(function(){
      
        if(min===0&&sec<0)
        { 
            clearInterval(id);
            sessionTimeDisplay();
        }
        else if(sec<0)
        {
            sec=59;
            min--;
            Display(min,sec);
        }
        else
        Display(min,sec);
         minTime=min;
        secTime=sec;
        sec--;
        
    },1000);


}

function Display(min ,sec){
    if(min>9&&sec>9)
    timeDiv.innerText=min+" : "+sec;
    else if(min>9&&sec<10)
    timeDiv.innerText=min+" : 0"+sec;
    else if(min<10&&sec>9)
    timeDiv.innerText="0"+min+" : "+sec;
    else
    timeDiv.innerText="0"+min+" : 0"+sec;

}

pause_btn.addEventListener("click",function(){
    
    
   if(pause_click)
   {
       pause_btn.innerText="pause";
       pause_click=false;
       console.log(breakTimeClick);
       if(breakTimeClick)
        breakTimeDisplay(pause_min,pause_sec);
       else
        sessionTimeDisplay(pause_min,pause_sec);   
   }
   else
    {
        pause_btn.innerText="Resume";
        pause_min=minTime;
        pause_sec=secTime;
        clearInterval(id);
        pause_click=true;
    } 
})
reset_btn.addEventListener("click",function(){
    
    s_add_btn.disabled=false;
    s_min_btn.disabled=false;
    b_add_btn.disabled=false;
    b_min_btn.disabled=false;

    timeDiv.innerText="";
    sessionNo=1;
   clearInterval(id);
})