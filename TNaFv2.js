let playable=true
let timer=false
let jumpscare=false
let door=false
let Cam=false
function mRnd(){return Math.floor(Math.random()*20+1) }
let power=100
let currentNight=0
let Bd=0
let Fx=0
let Fd=0
let Cd=0
let arrayTimeTags=["12pm","01am","02am","03am","04am","05am","06am"]
let currentTime=0
let gameOn=false

document.addEventListener("keydown", (event) => {
const key = event.key; // Get the key pressed
if (key === "Enter") {
console.log("Enter key was pressed!");
} else if (event.ctrlKey && key === "s") {
event.preventDefault(); // Prevent default browser behavior
console.log("Ctrl + S was pressed!");
}else if(key==="d"){
    checkAnima()
}else if(key==="a"){
    btnDoor()
}else if(key==="e"){
    btnNose()
}else if(key==="q" &&!gameOn){
    Start()
}else if(key==="m"){
    thunder()
}

});

//Audios:
async function soundInstance(audioToBePlayed){

  let newInstance=audioToBePlayed.cloneNode(true);
  newInstance.play()

}
//Importing all audios
const jumps=new Audio("assets/jumpscare.mp3")
const sixAM=new Audio("assets/fnaf6am.mp3")
const quirk=new Audio("assets/quirky-at-night.mp3")
const doorAnima=new Audio("assets/animatronic-in-door.mp3")
const musicBox=new Audio("assets/fnaf1MB.mp3")
const ambiance=new Audio("assets/fnafAmbience.mp3")
const doorClose=new Audio("assets/doorSlamFnaf.mp3")
const CamOpen=new Audio("assets/fnaf-camera.mp3")
const CamClose=new Audio("assets/camera-close.mp3")
const bonJs=new Audio("assets/faaah.mp3")
const chicJs=new Audio("assets/fnafJSChica.mp3")
const greg=new Audio("assets/gregory-what-the-fazballs.mp3")
const ring=new Audio("assets/fnafRingtone.mp3")
const thunder1=new Audio("assets/thunder-sfx.mp3")
const thunder2=new Audio("assets/thunder-shock.mp3")
const thunder3=new Audio("assets/thunder.mp3")

function updtPwr(){
    if(power>0){
    if(door){power--}
    power--
    document.getElementById("power").textContent=power
    }if(door&&power==0){
        btnDoor()
    }
}
function thunder(){
    // ToDo: add thunder sound
    Math.random() < 0.5 ? thunder1.play() : Math.random()< 0.5 ? thunder2.play() : thunder3.play();
    power+=3
    for(let i=0;i<animatronics.length;i++){
        if(animatronics[i].overcharged){animatronics[i].level--}
        else{animatronics[i].level+=2}
        if(Math.floor(Math.random()*100+1)<4){animaActions(animatronics[i])}
    }
}
//Animatronics
let animatronics = [
      { name: "Bonnie",atak:"ba",jumpscare:bonJs , position: 0, path: 5, level: Bd, defaultLvl: Bd, overcharged: false, canAtk: false, status: true, rooms: ["Stage", "Dining Area", "Parts & Services", "Supply Closet", "Corridor", "Security Door"] },
      { name: "Freddy", atak:"fa",jumpscare:greg,position: 0, path: 5, level: Fd, defaultLvl: Fd, overcharged: false, canAtk: false, status: true, rooms: ["Stage", "Dining Area", "Restrooms", "Kitchen", "Corridor", "Security Door"] },
      { name: "Foxy",atak:"fa2",jumpscare:jumps, position: 0, path: 4, level: Fx, defaultLvl: Fx, overcharged: false, canAtk: false, status: true, rooms: ["Pirate Cove 0", "Pirate Cove 1", "Pirate Cove 2", "Corridor", "Security Door"] },
      { name: "Chica",atak:"ca",jumpscare:chicJs, position: 0, path: 5, level: Cd, defaultLvl: Cd, overcharged: false, canAtk: false, status: true, rooms: ["Stage", "Dining Area", "Restrooms", "Kitchen", "Corridor", "Security Door"] }
]

function setAnimaLvl(arrayLvls){
    for(let i=0;i<animatronics.length;i++){
        animatronics[i].level=arrayLvls[i]
        animatronics[i].defaultLvl=arrayLvls[i]
        animatronics[i].position=0   
        document.getElementById(animatronics[i].atak).textContent="🟢"
        animatronics[i].overcharged=false
    }
}
let animaLvlPresets=[[0,0,0,0],[3,1,2,3],[7,3,6,4],[6,7,8,7],[13,12,8,15]]


function setTimer(){
    currentTime++    
    document.getElementById("time").textContent=arrayTimeTags[currentTime]

}
//Main Game:



  
function Start(){
    gameOn=true
    setAnimaLvl(animaLvlPresets[currentNight])

    document.getElementById("animatronics").style.backgroundColor="#1c421c"
    
    power=100
    if(currentNight==0){
    quirk.play()
    }
    jumpscare=false
    // i=0
    console.clear()
    document.getElementById("Starter").hidden="true"
    currentTime=0
    document.getElementById("time").textContent=arrayTimeTags[currentTime]
    // const timer1=setInterval(() =>  {console.log("Iteration: " + i);i++;}, 200);
    
    function endTimers(){
        gameOn=false
        
        // musicBox.play()
        // clearTimeout(timer1)//Timer
        // clearTimeout(timer2)//Timer for stopping game
        clearTimeout(game)//Timer for end game
        clearTimeout(Fweddy)
        clearTimeout(foxYarr)
        clearTimeout(Chinken)
        clearTimeout(Bnuy)
        clearTimeout(ambianSound)
        clearTimeout(storm)
        clearTimeout(Pwr)
        clearTimeout(timeChanger)
        document.getElementById("Starter").hidden=false
        return
    }

    //const timer2=setInterval(()=>{if(mRnd()>=15){endTimers()};},1500)
    // Add animatronic timers
    // ex:. const Freddy=setInterval(()=>{animatronics[1]},4010)
    const Fweddy=setInterval(()=>{if(animaActions(animatronics[1])){endTimers()}},4150)
    const Bnuy=setInterval(()=>{if(animaActions(animatronics[0])){endTimers()}},3940)
    const Chinken=setInterval(()=>{if(animaActions(animatronics[3])){endTimers()}},4210)
    const foxYarr=setInterval(()=>{if(animaActions(animatronics[2])){endTimers()}},4010)
    const Pwr=setInterval(()=>{updtPwr()},2400)
    const ambianSound=setInterval(()=>{if(mRnd()>10){ambiance.play()}},10000)
    const storm=setInterval(()=>{ if(Math.floor(Math.random()*100+1)<=(Math.floor(Math.random()*10+1)+currentNight*2)){thunder()}},1234)
    const timeChanger=setInterval(()=>{setTimer()},30000)

    // ToDo make a way to lose?


    





    const game=setTimeout(()=>{//Ends the game Win condition
        
        //ToDo, end all timers here
        //clearTimeout(timer1);
        //clearTimeout(timer2)//Timer for stopping game
        if(currentNight<animaLvlPresets.length-2){
        currentNight++
        }
        endTimers()
        sixAM.play()

    
    },180000)//Time to end in ms      
}
//Button functions

async function btnNose(){
    ring.play()
}

//Function for closing the door
async function btnDoor(){
    if(gameOn){
    
    if(!door &&power>0){
        document.getElementById("btnDoor").style.background="Green"
        soundInstance(doorClose)

        door=true
            //ToDo Door Logic
            
    }else{
        document.getElementById("btnDoor").style.background="grey"
        door=false
    }
  }
}

//Function to check animatronics position
function checkAnima(){
    if(gameOn){
    if(!Cam &&power>0){
    power--
    soundInstance(CamOpen)
    Cam=true
    // for(let i=0;i<animatronics.length;i++){
    //     let state=""
    //     if(animatronics[i].overcharged){state="⚫"}
    //     else if(animatronics[i].canAtk){state="🔴"}
    //     else{state="🟢"}
    //     document.getElementById(animaStatus[i]).textContent=state
    //     }

        for(let a = 0; a < animatronics.length; a++) {
            
            console.log(animatronics[a].name + " " + animatronics[a].rooms[animatronics[a].position]);
            if(!animatronics[a].overcharged){
            document.getElementById(animaPosition[a]).textContent=animatronics[a].rooms[animatronics[a].position]
            }else{
            document.getElementById(animaPosition[a]).textContent="Searching..."
            }
        }
          
    setTimeout(()=>{
        Cam=false
        soundInstance(CamClose)
        for(let a = 0; a < animatronics.length; a++){
            console.log(animatronics[a].name + " " + animatronics[a].rooms[animatronics[a].position]);
            document.getElementById(animaPosition[a]).textContent="Loading..."
        
    }},1500)
    }
  }
}
 
function animaActions(animatronic){
    
    if(!animatronic.overcharged){
    // if(animatronic.level>=mRnd()){
        if(animatronic.level>25){
            animatronic.overcharged=true
            document.getElementById(animatronic.atak).textContent="⚫"
            return false
        }
        if(animatronic.position>=animatronic.path&&!door&&animatronic.canAtk){ //Animatronic at door and door open
            if(!jumpscare){
                jumpscare=true
                animatronic.jumpscare.play()
                document.getElementById("animatronics").style.backgroundColor="rgb(51, 17, 23)"
                return true

                //ToDo Jumpscare?
            }

        }else if(animatronic.position>=animatronic.path&&mRnd()<16&&animatronic.canAtk){ //Animatronic at door but not open
            animatronic.position=1

            
        }
        else if(animatronic.level>=mRnd()){
            
        if(animatronic.position>=animatronic.path){
            animatronic.canAtk=true
            document.getElementById(animatronic.atak).textContent="🔴"
            doorAnima.play()

        }else if(animatronic.position<animatronic.path&&mRnd()>=4){
            animatronic.position++
        }else if(animatronic.position>1&&mRnd()>=18){
            animatronic.position--
        }
    }
    if(animatronic.position<animatronic.path){
        animatronic.canAtk=false
        document.getElementById(animatronic.atak).textContent="🟢"
    }
    }else{
        if(animatronic.level<=animatronic.defaultLvl){
            animatronic.overcharged=false
        }else{
            animatronic.level--
        }
    }
    return false

}

// let Bd=0,Fd=0,Fx=0,Cd=0//PlaceHolder Values

let animaPosition=["BnP","FrP","FxP","ChP"]
  