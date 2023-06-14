setInterval(() => {
    function sayHello(name){
        console.log('hello '+name)
    }
    
    sayHello('Jhon')
}, -1);

function stop(){
    console.log("stopped")
    clearInterval(interval)
  }
