const Emitter = require('events');

class Gym extends Emitter {

    constructor(){
        super();
    }
    visit() {
        this.emit("boom","Athlete is working out");
    }
}

let event = new Gym();
event.on('boom', (value) => console.log(value));
event.visit();