let playable=true
let timer=false
let jumpscare=false
let door=false
function mRnd(){return Math.floor(Math.random()*20+1) }

//Audios:

const jumps=new Audio("assets/jumpscare.mp3")
const sixAM=new Audio("assets/fnaf6am.mp3")
const quirk=new Audio("assets/quirky-at-night.mp3")
const doorAnima=new Audio("assets/animatronic-in-door.mp3")
const musicBox=new Audio("assets/fnaf1_MusicBox.mp3")
const ambiance=new Audio("assets/fnafAmbience.mp3")
const doorClose=new Audio("assets/doorSlamFnaf.mp3")


//Main Game:

function btnDoor(){
    if(!door){
        document.getElementById("btnDoor").style.background="Green"

        door=true
        setTimeout(()=>{
            //ToDo Door Logic
            document.getElementById("btnDoor").style.background="grey"
            door=false
        },4000)
    }
}
  
function Start(){
    i=0
    console.clear()
    document.getElementById("Starter").hidden="true"
    const timer1=setInterval(() =>  {console.log("Iteration: " + i);i++;}, 200);
    
    function endTimers(){
        musicBox.play()
        clearTimeout(timer1)//Timer
        clearTimeout(timer2)//Timer for stopping game
        clearTimeout(timer3)//Timer for end game
        document.getElementById("Starter").hidden=false
        return
    }
    const timer2=setInterval(()=>{if(mRnd()>=15){endTimers()};},1500)
    // Add animatronic timers
    // ex:. const Freddy=setInterval(()=>{animatronics[1]},4010)


    // ToDo make a way to lose?





    const timer3=setTimeout(()=>{//Ends the game Win condition
        
        //ToDo, end all timers here
        clearTimeout(timer1);
        clearTimeout(timer2)//Timer for stopping game
        document.getElementById("Starter").hidden=false
        sixAM.play()

    
    },5000)//Time to end in ms
        
}

function animaActions(animatronic){
    let iaA=animatronic.level
    
    if(iaA<mRnd()){
        if(animatronic.path>=animaPosition&&mRnd<8&&!door){ //Animatronic at door and door open
            if(!jumpscare){
                //ToDo Jumpscare?
            }
        }else if(animatronic.path>=animaPosition&&mRnd<8){ //Animatronic at door but not open
            animatronic.position=1
        }
    }

}

// let animatronics = [
//       { name: "Bonnie", position: 0, path: 5, level: Bd, defaultLvl: Bd, overcharged: false, canAtk: false, status: true, rooms: ["Stage", "Dining Area", "Parts & Services", "Supply Closet", "Corridor", "Security Door"] },
//       { name: "Freddy", position: 0, path: 5, level: Fd, defaultLvl: Fd, overcharged: false, canAtk: false, status: true, rooms: ["Stage", "Dining Area", "Restrooms", "Kitchen", "Corridor", "Security Door"] },
//       { name: "Foxy", position: 0, path: 4, level: Fx, defaultLvl: Fx, overcharged: false, canAtk: false, status: true, rooms: ["Pirate Cove", "Pirate Cove", "Pirate Cove", "Corridor", "Security Door"] },
//       { name: "Chica", position: 0, path: 5, level: Cd, defaultLvl: Cd, overcharged: false, canAtk: false, status: true, rooms: ["Stage", "Dining Area", "Restrooms", "Kitchen", "Corridor", "Security Door"] }
// ]
let animaPosition=["BnP","FrP","FxP","ChP"]
let animaStatus=["ba","fa","fa2","ca"]
  