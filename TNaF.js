// Function that returns a Promise resolved when one of the buttons is clicked
function waitForButtonClick(buttonIds) {
    return new Promise((resolve) => {
        const handlers = {};

        // Attach click listeners to each button
        buttonIds.forEach(id => {
            const btn = document.getElementById(id);
            if (!btn) return; // Skip if button not found

            handlers[id] = () => {
                // Remove all listeners to avoid memory leaks
                buttonIds.forEach(otherId => {
                    const otherBtn = document.getElementById(otherId);
                    if (otherBtn && handlers[otherId]) {
                        otherBtn.removeEventListener('click', handlers[otherId]);
                    }
                });
                resolve(id); // Resolve with the ID of the clicked button
            };

            btn.addEventListener('click', handlers[id]);
        });
    });
}

const jumps=new Audio("assets/jumpscare.mp3")
const sixAM=new Audio("assets/fnaf6am.mp3")
const quirk=new Audio("assets/quirky-at-night.mp3")
const doorAnima=new Audio("assets/animatronic-in-door.mp3")
const musicBox=new Audio("assets/fnaf1_MusicBox.mp3")
const ambiance=new Audio("assets/fnafAmbience.mp3")
const doorClose=new Audio("assets/doorSlamFnaf.mp3")

async function soundInstance(audioToBePlayed){

  let newInstance=audioToBePlayed.cloneNode(true);
  newInstance.play()

}


//Swaps button visibility from a selected group
function buttonSwapTrigger() {
  let buttons=["btnStart","btnContinue","btnDoor","btnIdle","btnDoorSearch","btnSearch"]  
 
  for(let i=0;i<buttons.length;i++){
    document.getElementById(buttons[i]).hidden=!document.getElementById(buttons[i]).hidden
  }
 
}

async function main() {
  // Wait until user clicks a button
  fnafAlikeGame()
  }


async function TNaF([Bd,Fd,Fx,Cd]){
  document.getElementById("animatronics").style.backgroundColor="rgba(128, 255, 0, 0.5)"
  buttonSwapTrigger()
    
    let r = 0;
    let spareFuses = 3;
    let cam=false
    let thunder = false;
    let fuseStatus = true;
    let emergencyFuse = true;
    let energy = 60
    let doorBtn = true;
    let dev = true
    function door() { if (doorBtn && (fuseStatus || emergencyFuse)) { return true } else { return false } }
    let animatronics = [
      { name: "Bonnie", position: 0, path: 5, level: Bd, defaultLvl: Bd, overcharged: false, canAtk: false, status: true, rooms: ["Stage", "Dining Area", "Parts & Services", "Supply Closet", "Corridor", "Security Door"] },
      { name: "Freddy", position: 0, path: 5, level: Fd, defaultLvl: Fd, overcharged: false, canAtk: false, status: true, rooms: ["Stage", "Dining Area", "Restrooms", "Kitchen", "Corridor", "Security Door"] },
      { name: "Foxy", position: 0, path: 4, level: Fx, defaultLvl: Fx, overcharged: false, canAtk: false, status: true, rooms: ["Pirate Cove", "Pirate Cove", "Pirate Cove", "Corridor", "Security Door"] },
      { name: "Chica", position: 0, path: 5, level: Cd, defaultLvl: Cd, overcharged: false, canAtk: false, status: true, rooms: ["Stage", "Dining Area", "Restrooms", "Kitchen", "Corridor", "Security Door"] },
    ];
    //Arrays so the functions that updates positions dont change the wrong animatronic
    let animaPosition=["BnP","FrP","FxP","ChP"]
    let animaStatus=["ba","fa","fa2","ca"]
  
    console.clear()
    while (true) {
    
      for(let i=0;i<animatronics.length;i++){
        let state=""
        if(animatronics[i].overcharged){state="⚫"}
        else if(animatronics[i].canAtk){state="🔴"}
        else{state="🟢"}
        document.getElementById(animaStatus[i]).textContent=state
      }
      if(fuseStatus){
        document.getElementById("fuseState").textContent="🟢"
      }else if(emergencyFuse){
        document.getElementById("fuseState").textContent="🟡"
      }else{
        document.getElementById("fuseState").textContent="🔴"
      }
    
      console.log(
        "1) Check Positions \n2) Hold door closed \n3) Close door and check animatronics \n4) Change Fuses\nA) Nothing",
      );
  
    //   let opt = readline.questionInt("What are your action: ");
    if(Math.floor(Math.random()*10)>7){
      ambiance.play()
    }
    const clickedId = await waitForButtonClick(["btnSearch", "btnDoor", "btnIdle","btnDoorSearch"]);

    console.clear();
      switch (clickedId) {
        case "btnSearch":
          if (energy > 0) {
           cam=true
            energy--;
          } else {
            console.log("No energy to search them, Dangers lurk in the dark");
          }
          break;
        case "btnDoor":
          if (energy > 1) {
            doorBtn = true;
            energy -= 2;
          soundInstance(doorClose)
          } else {
            console.log("The door cant be closed, pray no one tries to enter");
          }
          break;
  
        case "btnDoorSearch":
          if (energy > 3) {
            cam=true
            doorBtn = true;
            energy -= 4;
          } else {
            console.log("No energy to close the doors and check the animatronics");
          }
          break;
  
        case 4:
          if (spareFuses > 0) {
            spareFuses--;
            if (fuseStatus) {
              console.log("Why did you change the fuse, it was just fine")
            } else {
              console.log("The fuse has been changed, the door works again")
              fuseStatus = true
            }
          } else {
            console.log("No fuses left...")
          }
          break;
  
        default:
          console.log("Nothing, energy saved");
          break;
  
  
      }
      for (let ac = 0; ac < animatronics.length; ac++) {
  
      }
      if(cam){ 
      for (let a = 0; a < animatronics.length; a++) {
              console.log(animatronics[a].name + " " + animatronics[a].rooms[animatronics[a].position]);
              document.getElementById(animaPosition[a]).textContent=animatronics[a].rooms[animatronics[a].position]
            }
          }else{
            for (let a = 0; a < animatronics.length; a++) {
              console.log(animatronics[a].name + " " + animatronics[a].rooms[animatronics[a].position]);
              document.getElementById(animaPosition[a]).textContent="Loading..."
            }
          }
      if (r >= 40) {
        console.log("You survived the night");
        sixAM.play()
        document.getElementById("yourLife").textContent="You Survived"
        buttonSwapTrigger()
        return true;
      }
      //Useless in Html version, may end up active in console tho
      if (dev) {
  
        console.log("Round:" + r)
        console.log("Energy" + energy)
        console.log("Door status:" + door())
        console.log("Thunder?: " + thunder)
        console.log("Fuses status: " + fuseStatus + " Emergency fuse:" + emergencyFuse)
        console.log("SpareFuses:" + spareFuses)
        let iaEn = []
  
        for (let ia = 0; ia < animatronics.length; ia++) {
          iaEn[ia] = animatronics[ia].level
        }
        console.log("Current Ia: Bn:" + iaEn[0] + " Fr:" + iaEn[1] + " Ch:" + iaEn[2] + " Fx" + iaEn[3])
  
      }
    //Thunder mechanic (broken?)
      if (!thunder) {
        if (Math.floor(Math.random() * 100 + 1) < 10) {
          console.log("A storm started...")
          thunder = true;
        }
      }
      if (thunder && door() && fuseStatus) {
        if (Math.floor(Math.random() * 100 + 1) < 15) {
          fuseStatus = false
          console.log("A thunder blew the fuse")
        }
      } else if (thunder && door()) {
        if (Math.floor(Math.random() * 10 + 1) > 6) {
          emergencyFuse = false
          console.log("Emergency fuse destroyed")
        }
      }


      //Animatronics actions
      for (let aa = 0; aa < animatronics.length; aa++) {
        if (animatronics[aa].overcharged) {
          animatronics[aa].level--
          if (animatronics[aa].level == animatronics[aa].defaultLvl) {
            animatronics[aa].overcharged = false
  
          }
        } else if (animatronics[aa].position >= animatronics[aa].path && Math.floor(Math.random() * 10 + 1) < 4) {
  
        } else if (animatronics[aa].position >= animatronics[aa].path && !door() && animatronics[aa].canAtk) {
         //This one kinda important
         
          if (Math.floor(Math.random() * 10 + 1) <= animatronics[aa].level) {
            // console.clear()
            document.getElementById("yourLife").textContent="You got jumpscare by " + animatronics[aa].name
            console.log("You got jumpscare by " + animatronics[aa].name);
            jumps.play()
            document.getElementById("animatronics").style.backgroundColor="rgba(99, 5, 5, 0.5)"

            buttonSwapTrigger( )
            return false;
          }
        } else if (
          animatronics[aa].position >= animatronics[aa].path &&
          animatronics[aa].canAtk
        ) {
          console.log(
            animatronics[aa].name + " was at the door, but it went back!"

          );
          animatronics[aa].position = 1;
          animatronics[aa].canAtk = false;
        } else if (
          animatronics[aa].position >= animatronics[aa].path &&
          !animatronics[aa].canAtk
        ) {
          animatronics[aa].canAtk = true;
          console.log("Someones At the door")
          soundInstance(doorAnima)

        } else if (animatronics[aa].position > 1 && Math.floor(Math.random() * 100 + 1) < 15) {
          if (animatronics[aa].position > 2 && Math.floor(Math.random() * 100 + 1) < 10) {
            animatronics[aa].position--
          }
          animatronics[aa].position--
        } else {
          if (Math.floor(Math.random() * 10 + 1) <= animatronics[aa].level) {
            if ((Math.floor(Math.random() * 20 + 1) <= 2 ||animatronics[aa].level>10  ) && animatronics[aa].position <= animatronics[aa].path - 2) {
              animatronics[aa].position++;
            }
            animatronics[aa].position++;
          }
  
        }
  
        if (thunder && !animatronics[aa].overcharged) {
          animatronics[aa].level++
          if (animatronics[aa].level > 15) {
            console.log(animatronics[aa].name + " got overcharded and went offline")
            animatronics[aa].overcharged = true
          }
        }
      }
  
      if (thunder) {
        energy++
        if (Math.floor(Math.random() * 100 + 1) < 50) {
          thunder = false;
          console.log("Thunder has stopped")
        }
      }
      r++;
      doorBtn = false;
      cam=false
    }
  }

main();
async function fnafAlikeGame() {
  console.clear()
  let diff=0
 


  while (true) {
    console.log(
      "What night you wanna play? \n1) First Night\n2) Second Nigth\n3) Third Night") 
     // let option = readline.question("Input number: ");
    const option=await waitForButtonClick(["btnStart","btnContinue"])
    document.getElementById("yourLife").textContent=""
    const nights=[[3, 1, 2, 1],[2, 5, 3, 4],[4,6,4,5],[7,2,1,6],[8,9,8,7]]


    switch (option) {
      case "btnStart":
        diff=0
        quirk.play()
        if(TNaF(nights[diff])){diff++}
        break;
      case "btnContinue":
        if(diff===0){        quirk.play()}
        if(diff>4){
          diff=4
        }
        if(TNaF(nights[diff])){diff++}


      break;
      // case "3":
      //   fnafAlike(5, 9, 8, 7,40);
      //   break;

      // case "4":
      //   acessibility();
      //   break    

      case "0": return;


    }}}
    
  
