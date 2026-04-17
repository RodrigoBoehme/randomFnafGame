timer=true
i=0
function abc1(){
    
    setInterval(()=>{if(timer){console.log("Iteration: "+i);i++}},200)
    setTimeout(()=>{if(timer){timer=false}},3981)
    }
