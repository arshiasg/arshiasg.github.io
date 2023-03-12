
class TrieNode {
    constructor() {
        this.children = {};
        this.data = null;
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode();
    }

    insert(name, description) {
        let node = this.root;
        for (let i = 0; i < name.length; i++) {
            const char = name[i];
            if (!node.children[char]) {
                node.children[char] = new TrieNode();
            }
            node = node.children[char];
        }
        node.data = { name, description };
    }

    search(name) {
        let node = this.root;
        for (let i = 0; i < name.length; i++) {
            const char = name[i];
            if (!node.children[char]) {
                return null;
            }
            node = node.children[char];
        }
        return node.data;
    }

    getAllNames() {
        let names = [];
        const traverse = (node) => {
            if (node.data) {
                names.push(node.data.name);
            }
            for (let char in node.children) {
                traverse(node.children[char]);
            }
        }
        traverse(this.root);
        return names.join(', ') + ", clear";
    }
}

const command_trie = new Trie();
command_trie.insert("hello", `<p>Hello, world!</p>`);
command_trie.insert("date", `<p>${new Date().toLocaleString()}</p>`);


window.onload = function () {
    const commandLine = document.getElementById("terminalInput")
    commandLine.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            const input = commandLine.value;
            commandLine.value = "";
            handleCommand(input);
        }
    });
}

function handleCommand(command) {
    command = command.toLowerCase()
    const terminalOutput = document.getElementsByClassName('output')[0]
    if (command === "clear") {
        terminalOutput.innerHTML = ``;
    } else {
        terminalOutput.innerHTML += `<p><span class="prompt">$</span>${command}</p>`;
        if (command === "help") {
            terminalOutput.innerHTML += command_trie.getAllNames()
        } else {
            const data = command_trie.search(command)
            if (data) {
                const outputElement = document.createElement('div');
                outputElement.innerHTML = data.description;
                terminalOutput.appendChild(outputElement);
            } else {
                terminalOutput.innerHTML += `<p class="error">Command not found: ${command}</p>`;
            }
        }
    }
}
