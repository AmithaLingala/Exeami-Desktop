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
    for (item of commands) {
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
        await sleep(2000);
    }
}


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

executeCode();