const os = require('os');

function checkSystem() {
    console.log('\nChecking your system...');

    let ram = os.totalmem() / 1073741824;

    if(ram < 4){
        console.log('\n\nThis app needs at least 4 GB of RAM\n');
    }

    let cpu = os.cpus();

    if(cpu.length < 2){
        console.log('\n\nProcessor is not supported\n');
    }

    if(ram >= 4 && cpu.length >= 2){
        console.log('\n\nChecked sucessfully\n');
    }

}

checkSystem();
