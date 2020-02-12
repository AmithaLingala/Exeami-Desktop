const termBox = document.getElementById('console');

const commands = [
    {
        command: 'make tea',
        results: [
            'Boiling water...',
            'Adding Ginger...',
            'Adding tea powder...',
            'Adding a pinch of sugar...',
            'Boiling...',
            '...',
            '...',
            'Adding Milk...',
            'Boiling...',
            '...',
            '...',
            'Done!'
        ]
    },
    {
        command: './exeami',
        results: [
            '...',
            '...',
            '...',
            '...'
        ]
    }

]

async function executeCode() {
    for ( let i = 0; i < commands.length; i++) {
        const item = commands[i];
        const code = document.createElement('span', { class: 'code' });
        code.innerHTML = '$ ' + item.command + "<br>";
        termBox.append(code);
        await sleep(1000);

        for (result of item.results) {
            const res = document.createElement('span', { class: 'code' });
            res.innerHTML = result + "<br>";
            termBox.append(res);
            await sleep(1000);
        }
        const pathClone = document.getElementById('userpath').cloneNode(true);
        pathClone.innerHTML =  "<br>" + pathClone.innerHTML;
        if(i  < commands.length-1){
            termBox.append(pathClone);
        }
        
        await sleep(2000);
    }
}


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

executeCode();