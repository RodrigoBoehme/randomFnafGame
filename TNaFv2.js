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
let arrayTimeTags=["12:00 PM","01:00 AM","02:00 AM","03:00 AM","4:00 AM","5:00 AM","6:00 AM"]
let currentTime=0
let gameOn=false
let fuseDoor=true
let emergencyfuse=true
let spareFuses=0
let changingFuses=false

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
}else if(key==="s"){
    btnFuse()
}

});

//Audios:
async function soundInstance(audioToBePlayed){

  let newInstance=audioToBePlayed.cloneNode(true);
  newInstance.play()

}
//Importing all audios
const jumps=new Audio("assets/jumpscare.mp3")
const jumps2=new Audio("assets/jumps2.mp3")     
const sixAM=new Audio("assets/fnaf6am.mp3")
const quirk=new Audio("assets/quirky-at-night.mp3")
const doorAnima=new Audio("assets/animatronic-in-door.mp3")
const musicBox=new Audio("assets/fnaf1MB.mp3")
const ambiance=new Audio("assets/fnafAmbience.mp3")
const doorClose=new Audio("assets/doorSlamFnaf.mp3")
const CamOpen=new Audio("assets/fnaf-camera.mp3")
const CamClose=new Audio("assets/camera-close.mp3")
const bonJs=new Audio("assets/faaah.mp3")
const bonJs2=new Audio("assets/bonnie-ar-jumpscare.mp3")
const chicJs=new Audio("assets/fnafJSChica.mp3")
const greg=new Audio("assets/gregory-what-the-fazballs.mp3")
const ring=new Audio("assets/fnafRingtone.mp3")
const thunder1=new Audio("assets/thunder-sfx.mp3")
const overchargeAnima=new Audio("assets/thunder-shock.mp3")
const thunder3=new Audio("assets/thunder.mp3")
const pizza=new Audio("assets/pizza.mp3")
const fuseStart=new Audio("assets/error-fnaf.mp3")
const fuseFnsh=new Audio("assets/fnaf-light.mp3")
const boop=new Audio("assets/fnaf-boop.mp3")
const running=new Audio("assets/fnaf-running.mp3")
const laugh=new Audio("assets/fnaf-freddys-laugh.mp3")
const teleport=new Audio("assets/tp.mp3")
const shortFx=new Audio("assets/foxy-jumpscare-short.mp3")
const chicJs2=new Audio("assets/chica-pizza-sound.mp3")
const thunder2=new Audio("assets/thunder-sounds.mp3")
const thunder4=new Audio("assets/thunder1.mp3")

function updtTimeDisplay(){
    document.getElementById("power").textContent=power
}

function updtPwr(){
    if(power>0){
    if(door){power--}
    power--
    updtTimeDisplay()
    }if(door&&power==0){
        btnDoor()
    }
}

function lightning(){
        document.body.style.background="linear-gradient("+Math.random()*360+"deg, rgb(222, 255, 133), rgb(46,46,46))"
    setTimeout(()=>{
        document.body.style.background="rgb(46, 46, 46)"
    },200)
}
function thunder(){
    // ToDo: add thunder sound
    let thunder101=Math.random() 
        if(thunder101<0.25){soundInstance(thunder1)}
        else if(thunder101<0.5){soundInstance(thunder2)}
        else if(thunder101<0.75) {soundInstance(thunder3)}
        else {soundInstance(thunder4)}
    
        
    if(Math.random()>0.6){power+=3}
    updtTimeDisplay()
    if(Math.floor(Math.random()*100<(currentNight*20)+10)){
        for(let i=0;i<animatronics.length;i++){
            if(animatronics[i].overcharged){animatronics[i].level--}
            else{animatronics[i].level++}
            if(Math.floor(Math.random()*100+1)<4*currentNight){if(animaActions(animatronics[i])){return true}}
        }
    }
    lightning()

    if(door){
        if(Math.floor(Math.random()*100+1)<5){
            if(fuseDoor){
            document.getElementById("fuseState").textContent="🟡"
            fuseDoor=false
            }else{
            document.getElementById("fuseState").textContent="⚫"
            emergencyfuse=false
            }
        }
    }
    if(Math.floor(Math.random()*100+1)<3){
        btnDoor()
    }

    return false
}
//Animatronics
let animatronics = [
      { name: "Bonnie",atak:"ba",jumpscare:bonJs,jumpscare2:bonJs2,chancWlkSnd:0.2,walkin: teleport, position: 0, path: 5, level: Bd, defaultLvl: Bd, overcharged: false, canAtk: false, status: true, rooms: ["Stage", "Dining Area", "Parts & Services", "Supply Closet", "Corridor", "Security Door"] },
      { name: "Freddy", atak:"fa",jumpscare:greg,jumpscare2:jumps2,chancWlkSnd:1,walkin:laugh,position: 0, path: 5, level: Fd, defaultLvl: Fd, overcharged: false, canAtk: false, status: true, rooms: ["Stage", "Dining Area", "Restrooms", "Kitchen", "Corridor", "Security Door"] },
      { name: "Foxy",atak:"fa2",jumpscare:jumps,jumpscare2:shortFx,chancWlkSnd:0.9,walkin:running,position: 0, path: 4, level: Fx, defaultLvl: Fx, overcharged: false, canAtk: false, status: true, rooms: ["Pirate Cove", "Pirate Cove", "Dining Area", "Corridor", "Security Door"] },
      { name: "Chica",atak:"ca",jumpscare:chicJs, jumpscare2:chicJs2,chancWlkSnd:0.5,walkin: pizza,position: 0, path: 5, level: Cd, defaultLvl: Cd, overcharged: false, canAtk: false, status: true, rooms: ["Stage", "Dining Area", "Restrooms", "Kitchen", "Corridor", "Security Door"] }
]

function setAnimaLvl(arrayLvls){
    for(let i=0;i<animatronics.length;i++){
        animatronics[i].level=arrayLvls[i]
        animatronics[i].defaultLvl=arrayLvls[i]
        animatronics[i].position=0   
        document.getElementById(animatronics[i].atak).textContent="🟢"
        animatronics[i].overcharged=false
        document.getElementById(animaPosition[i]).textContent="Loading..."
    }
}
let animaLvlPresets=[[0,0,0,0],[3,1,2,3],[7,3,6,4],[6,7,8,7],[13,12,8,15]]


function setTimer(){
    currentTime++    
    document.getElementById("time").textContent=arrayTimeTags[currentTime]

}
//Main Game:



  
function Start(){
    // setup door
    spareFuses=3
    document.getElementById("fuseBtn").style.background="#grey"
    fuseDoor=true
    emergencyfuse=true
    //defines game is on(activate buttons and whatnot and some other miscelaneous changes)
    gameOn=true
    setAnimaLvl(animaLvlPresets[currentNight])
    document.getElementById("fuseState").textContent="🟢"
    document.getElementById("animatronics").style.backgroundColor="#1c421c"
    
    power=100
    updtTimeDisplay()
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
        clearTimeout(letsLevelEmUp)
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
    const Pwr=setInterval(()=>{updtPwr()},3300)
    const ambianSound=setInterval(()=>{if(mRnd()>10){ambiance.play()}},15000)
    const storm=setInterval(()=>{ if(Math.floor(Math.random()*100+1)<=(Math.floor(Math.random()*10+1)+currentNight*2)){if(thunder()){endTimers()}}},1234)
    const timeChanger=setInterval(()=>{setTimer()},50000)
    const letsLevelEmUp=setTimeout(()=>{for(let i=0;i<animatronics.length;i++){animatronics[i].level+=2}},120000)

    // ToDo make a way to lose?


    





    const game=setTimeout(()=>{//Ends the game Win condition
        
        //ToDo, end all timers here
        //clearTimeout(timer1);
        //clearTimeout(timer2)//Timer for stopping game
        if(currentNight<animaLvlPresets.length-1){
        currentNight++
        }
        document.getElementById("Starter").textContent="You Win!!!!!!!!!!"
        
        setTimeout(()=>{document.getElementById("Starter").textContent="Continue? Night: "+(currentNight+1)},4000)
        if(door){btnDoor()}
        endTimers()
        sixAM.play()
        document.getElementById("animatronics").style.backgroundColor="#fff"

    
    },300000)//Time to end in ms      
}
//Button functions

async function btnNose(){
    Math.random() <0.1 ? ring.play(): boop.play();
}

//Function for closing the door
async function btnDoor(){
    if(gameOn){
    
    if(!door &&power>0&&(fuseDoor||emergencyfuse)){
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
// Function to change fuses (aka, fix the door)
function btnFuse(){
    if(gameOn&&spareFuses>0&&!changingFuses){
        fuseStart.play()
        changingFuses=true
        if(!fuseDoor&&!emergencyfuse&&spareFuses>1){
            setTimeout(()=>{
            fuseDoor=true
            emergencyfuse=true
            spareFuses-=2
            fuseFnsh.play()
            document.getElementById("fuseState").textContent="🟢"
            },7000)

        }else if(!fuseDoor&&!emergencyfuse&&spareFuses>0){
            setTimeout(()=>{
            fuseDoor=true
            spareFuses--
            fuseFnsh.play()
            document.getElementById("fuseState").textContent="🟢"
            },3000)
        }else if(!fuseDoor&&emergencyfuse&&spareFuses>0){
            setTimeout(()=>{
            fuseDoor=true
            fuseFnsh.play()
            spareFuses--
            document.getElementById("fuseState").textContent="🟢"
            },3000)
        }else if(!emergencyfuse&&spareFuses>0){
            setTimeout(()=>{
            emergencyfuse=true
            spareFuses--
            fuseFnsh.play()
            document.getElementById("fuseState").textContent="🟡"
            },4000)
        }else if(!emergencyfuse&&spareFuses==0){
            document.getElementById("fuseBtn").style.background="#2f2f2f"
        }

    }
}

//Function to check animatronics position
function checkAnima(){
    if(gameOn){
    if(!Cam &&power>0){
    power--
    updtTimeDisplay()
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
            if(Math.random()<0.05*currentNight){
            document.getElementById(animaPosition[a]).textContent="IT'S ME"
            }else if(!animatronics[a].overcharged){
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
        if(animatronic.level>20+(currentNight*2)){
            animatronic.overcharged=true
            overchargeAnima.play()
            document.getElementById(animatronic.atak).textContent="⚫"
            return false
        }
        if(animatronic.position>=animatronic.path&&!door&&animatronic.canAtk){ //Animatronic at door and door open
            if(!jumpscare){
                jumpscare=true
                 Math.random()<0.5 ? animatronic.jumpscare2.play():animatronic.jumpscare.play()
                document.getElementById("animatronics").style.backgroundColor="rgb(51, 17, 23)"
                return true

                //ToDo Jumpscare?
            }

        }else if(animatronic.position>=animatronic.path&&mRnd()<16&&animatronic.canAtk){ //Animatronic at door but not open
            animatronic.position=1
            power--

            
        }
        else if(animatronic.level>=mRnd()){
            
        if(animatronic.position>=animatronic.path){
            animatronic.canAtk=true
            document.getElementById(animatronic.atak).textContent="🔴"
            doorAnima.play()

        }else if(animatronic.position<animatronic.path&&mRnd()>=4){
            animatronic.position++
           if(Math.random()<animatronic.chancWlkSnd) animatronic.walkin.play()
        }else if(animatronic.position>1&&mRnd()>=18){
            animatronic.position--
        }
    }
    if(animatronic.position<animatronic.path){
        animatronic.canAtk=false
        document.getElementById(animatronic.atak).textContent="🟢"
    }
    }else{
        if(animatronic.level<=animatronic.defaultLvl+currentNight){
            animatronic.overcharged=false
        }else{
            animatronic.level-=3
        }
    }
    return false

}

// let Bd=0,Fd=0,Fx=0,Cd=0//PlaceHolder Values

let animaPosition=["BnP","FrP","FxP","ChP"]
  