var running = false
var interval: number;

const ctx: Worker = self as any;
 
// // Post data to parent thread
// ctx.postMessage({ foo: "foo" });
 
// Respond to message from parent thread
ctx.addEventListener("message", (event) => {
    switch (event.data) {
        case 'start':
            if (!running){
                running = true;
                interval = setInterval(function(){
                    ctx.postMessage('tick')
                }, 1000);
            }
            break;
        case 'stop':
            clearInterval(interval);
            running = false;
            break;
    }  
});



// self.addEventListener('message', function(e){
//     switch (e.data) {
//         case 'start':
//             if (!running){
//                 running = true;
//                 interval = setInterval(function(){
//                     self.postMessage('tick')
//                 }, 1000);
//             }
//             break;
//         case 'stop':
//             clearInterval(interval);
//             running = false;
//             break;
//     }
// }, false);