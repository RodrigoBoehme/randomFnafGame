
let playable=true
let timer=false
let jumpscare=false
let door=false
let Cam=false
function mRnd(){return Math.floor(Math.random()*20+1) }
Bd=0
Fd=0
Fx=0
Cd=0



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




//Animatronics
let animatronics = [
      { name: "Bonnie",atak:"ba",jumpscare:bonJs , position: 0, path: 5, level: Bd, defaultLvl: Bd, overcharged: false, canAtk: false, status: true, rooms: ["Stage", "Dining Area", "Parts & Services", "Supply Closet", "Corridor", "Security Door"] },
      { name: "Freddy", atak:"fa",jumpscare:greg,position: 0, path: 5, level: Fd, defaultLvl: Fd, overcharged: false, canAtk: false, status: true, rooms: ["Stage", "Dining Area", "Restrooms", "Kitchen", "Corridor", "Security Door"] },
      { name: "Foxy",atak:"fa2",jumpscare:jumps, position: 0, path: 4, level: Fx, defaultLvl: Fx, overcharged: false, canAtk: false, status: true, rooms: ["Pirate Cove", "Pirate Cove", "Pirate Cove", "Corridor", "Security Door"] },
      { name: "Chica",atak:"ca",jumpscare:chicJs, position: 0, path: 5, level: Cd, defaultLvl: Cd, overcharged: false, canAtk: false, status: true, rooms: ["Stage", "Dining Area", "Restrooms", "Kitchen", "Corridor", "Security Door"] }
]

//Main Game:



  
export function Start(){
    for(let i=0;i<animatronics.length;i++){
        animatronics[i].level=20
        animatronics[i].defaultLvl=20
        animatronics[i].position=0
        
    }
    quirk.play()
    jumpscare=false
    // i=0
    console.clear()
    document.getElementById("Starter").hidden="true"
    // const timer1=setInterval(() =>  {console.log("Iteration: " + i);i++;}, 200);
    
    function endTimers(){
        // musicBox.play()
        // clearTimeout(timer1)//Timer
        // clearTimeout(timer2)//Timer for stopping game
        clearTimeout(game)//Timer for end game
        clearTimeout(Fweddy)
        clearTimeout(Bonnoe)
        clearTimeout(Foxyaar)
        clearTimeout(ChicaBloopers)
        clearTimeout(ambianSound)
        document.getElementById("Starter").hidden=false
        return
    }

    //const timer2=setInterval(()=>{if(mRnd()>=15){endTimers()};},1500)
    // Add animatronic timers
    // ex:. const Freddy=setInterval(()=>{animatronics[1]},4010)
    const Fweddy=setInterval(()=>{if(animaActions(animatronics[1])){endTimers()}},650)
    const Bonnoe=setInterval(()=>{if(animaActions(animatronics[0])){endTimers()}},570)
    const Foxyaar=setInterval(()=>{if(animaActions(animatronics[2])){endTimers()}},590)
    const ChicaBloopers=setInterval(()=>{if(animaActions(animatronics[3])){endTimers()}},610)
    const ambianSound=setInterval(()=>{if(mRnd()>10){ambiance.play()}},10000)

    // ToDo make a way to lose?


    





    const game=setTimeout(()=>{//Ends the game Win condition
        
        //ToDo, end all timers here
        //clearTimeout(timer1);
        //clearTimeout(timer2)//Timer for stopping game

        endTimers()
        sixAM.play()

    
    },180000)//Time to end in ms      
}
//Button functions

export function btnNose(){
    ring.play()
}

//Function for closing the door
export function btnDoor(){
    if(!door){
        document.getElementById("btnDoor").style.background="Green"
        soundInstance(doorClose)

        door=true
        setTimeout(()=>{
            //ToDo Door Logic
            document.getElementById("btnDoor").style.background="grey"
            door=false
        },5000)
    }
}
//Function to check animatronics position
export function checkAnima(){
    if(!Cam){
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
            document.getElementById(animaPosition[a]).textContent=animatronics[a].rooms[animatronics[a].position]
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

function animaActions(animatronic){
    if(animatronic.position<animatronic.path){
        animatronic.canAtk=false
        document.getElementById(animatronic.atak).textContent="🟢"
    }
    if(animatronic.level<=mRnd()){
        if(animatronic.position>=animatronic.path&&mRnd()<15&&!door&&animatronic.canAtk){ //Animatronic at door and door open
            if(!jumpscare){
                jumpscare=true
                animatronic.jumpscare.play()
                return true

                //ToDo Jumpscare?
            }
        }else if(animatronic.position>=animatronic.path&&mRnd()<16&&animatronic.canAtk){ //Animatronic at door but not open
            animatronic.position=1

            
        }
        else if(animatronic.position>=animatronic.path){
            animatronic.canAtk=true
            document.getElementById(animatronic.atak).textContent="🔴"
            doorAnima.play()

        }else if(animatronic.position<animatronic.path&&mRnd()>=4){
            animatronic.position++
        }else if(animatronic.position>1&&mRnd()>=18){
            animatronic.position--
        }
    }
    return false

}

// let Bd=0,Fd=0,Fx=0,Cd=0//PlaceHolder Values

let animaPosition=["BnP","FrP","FxP","ChP"]
let animaStatus=["ba","fa","fa2","ca"]
  