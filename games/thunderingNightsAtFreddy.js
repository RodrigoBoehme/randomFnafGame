const readline = require("readline-sync");

function fnafAlikeGame() {
  while (true) {
    console.log(
      "What night you wanna play? \n1) First Night\n2) Second Nigth\n3) Third Night \n0) Exit Game",
    );
    let option = readline.question("Input number: ");
    switch (option) {
      case "1":
        fnafAlike(3, 5, 2, 1)
        break;
      case "2":
        fnafAlike(5, 7, 3, 4);
        break;
      case "3":
        fnafAlike(1, 9, 8, 7);
        break;
      case "4":
        console.log("Custom Night, Set the difficulty for each animatronic: (Min: 0, Max: 10)")
        let bn = readline.questionInt("Bonnie: ")
        let fr = readline.questionInt("Freddy: ")
        let fx = readline.questionInt("Foxy: ")
        let ch = readline.questionInt("Chica: ")
        fnafAlike(bn, fr, fx, ch)

        break;

      case "123":
        console.log("Test: 10,10,10,10")
        fnafAlike(10, 10, 10, 10)
        break;
      case "1234":
        console.log("Test, 1,1,1,1")
        fnafAlike(1, 1, 1, 1)
        break

      case "0": return;

      //   case "1987":
      //     readline.question("This is an easter egg, but you still lose tho, press enter to continue")
      //     gameState.loseLife();
      //   return;
      default:
        readline.question("Invalid input, press ENTER to continue...")
        break;


    }
  }
}

function fnafAlike(Bd, Fd, Fx, Cd) {
  let r = 0;
  let spareFuses = 3;
  let thunder = false;
  let fuseStatus = true;
  let emergencyFuse = true;
  let energy = 40;
  let doorBtn = true;
  let dev=false
  function door() { if (doorBtn && (fuseStatus || emergencyFuse)) { return true } else { return false } }
  let animatronics = [
    { name: "Bonnie", position: 0, path: 5, level: Bd, canAtk: false, status: true, rooms: ["Stage", "Dining Area", "Parts & Services", "Supply Closet", "Corridor", "Security Door"] },
    { name: "Freddy", position: 0, path: 5, level: Fd, canAtk: false, status: true, rooms: ["Stage", "Dining Area", "Restrooms", "Kitchen", "Corridor", "Security Door"] },
    { name: "Foxy", position: 0, path: 4, level: Fx, canAtk: false, status: true, rooms: ["Pirate Cove", "Pirate Cove", "Pirate Cove", "Corridor", "Security Door"] },
    { name: "Chica", position: 0, path: 5, level: Cd, canAtk: false, status: true, rooms: ["Stage", "Dining Area", "Restrooms", "Kitchen", "Corridor", "Security Door"] },
  ];

  console.log(
    "A game inspired in Five nights at Freddys, you have limited \n power only one door to worry and the same 4 animatronics to\n worry about, winning condition you ask? Just survive for 25 rounds",
  );
  while (true) {
    console.log(
      "1) Check Positions \n2) Hold door closed \n3) Close door and check animatronics \n4) Change Fuses\nA) Nothing",
    );

    let opt = readline.questionInt("What are your action: ");
    // console.clear();
    switch (opt) {
      case 1:
        if (energy > 0) {
          for (let a = 0; a < animatronics.length; a++) {
            console.log(animatronics[a].name + " " + animatronics[a].rooms[animatronics[a].position]);
          }
          energy--;
        } else {
          console.log("No energy to search them, Dangers lurk in the dark");
        }
        break;

      case 2:
        if (energy > 1) {
          doorBtn = true;
          energy -= 2;
        } else {
          console.log("The door cant be closed, pray no one tries to enter");
        }
        break;

      case 3:
        if (energy > 3) {
          for (let a = 0; a < animatronics.length; a++) {
            console.log(animatronics[a].name + ": " + animatronics[a].rooms[animatronics[a].position]);
          }
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

      case 1987:
        console.log("This is an easter egg, the game ends!");
        return;

      case 2709:
        console.error("DevMode")
        dev=!dev

      break;

    }
    for (let ac = 0; ac < animatronics.length; ac++) {

    }
    if (r >= 35) {
      console.log("You survived the night");
      return;
    }
    if(dev){
      console.log("Round:"+r)
      console.log("Energy"+energy)
      console.log("Door status:"+door())
      console.log("SpareFuses:"+spareFuses)
      console.log("Ia: Bn:"+Bd+" Fr:"+Fd+" Ch:"+Cd+" Fx"+Fx)
    }

    if (!thunder) {
      if (Math.floor(Math.random() * 100 + 1) < 10) {
        console.log("A storm started...")
        thunder = true;
      }
    }
    if (thunder && door() && fuseStatus) {
      if (Math.floor(Math.random() * 100 + 1) < 10) {
        fuseStatus = false
        console.log("A thunder blew the fuse")
      }
    } else if (thunder && door()) {
      if(Math.floor(Math.random()*10+1)>6){
        emergencyFuse=false
        console.log("Emergency fuse destroyed")
      }
    }
    for (let aa = 0; aa < animatronics.length; aa++) {
      if (animatronics[aa].position >= animatronics[aa].path && !door() && animatronics[aa].canAtk) {
        if (Math.floor(Math.random() * 10 + 1) <= animatronics[aa].level) {
          readline.question("You got jumpscare by " + animatronics[aa].name);
          return;
        }
      } else if (
        animatronics[aa].position >= animatronics[aa].path &&
        animatronics[aa].canAtk
      ) {
        console.log(
          animatronics[aa].name + " was at the door, but it went back!",
        );
        animatronics[aa].position = 1;
        animatronics[aa].canAtk = false;
      } else if (
        animatronics[aa].position >= animatronics[aa].path &&
        !animatronics[aa].canAtk
      ) {
        animatronics[aa].canAtk = true;
        console.log("Someones At the door")
      } else if (animatronics[aa].position > 1 && Math.floor(Math.random() * 100 + 1) < 15) {
        if (animatronics[aa].position > 2 && Math.floor(Math.random() * 100 + 1) < 10) {
          animatronics[aa].position--
        }
        animatronics[aa].position--
      } else {
        if (Math.floor(Math.random() * 10 + 1) <= animatronics[aa].level) {
          if (Math.floor(Math.random() * 20 + 1) <= 2 && animatronics[aa].position <= animatronics[aa].path - 2) {
            animatronics[aa].position++;
          }
          animatronics[aa].position++;
        }

      }

    }

    if (thunder) {
      energy++
      if (Math.floor(Math.random() * 100 + 1) < 70) {
        thunder = false;
        console.log("Thunder has stopped")
      }
    }
    r++;
    doorBtn = false;
  }
}
fnafAlikeGame()