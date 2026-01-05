import readline from "readline";
import path from "path";
import fs from "fs";

const folders = process.env.PATH.split(path.delimiter);
let st = new Set();

st.add("echo");
st.add("exit");
st.add("type"); 


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.setPrompt("$ ");
rl.prompt();

rl.on("line", (input) => {

    if (input === "exit") {
        rl.close();
        return; 
    } 

    else if (input.startsWith("echo ")) {
        const a = input.slice(5);
        console.log(a);
    } 

    else if (input.startsWith("type ")) {
        const command = input.slice(5);

        if (st.has(command)) console.log(`${command} is a shell builtin`);

        else {
            
            let found = false; 

            for (const folder of folders) { 
                const fullPath = path.join(folder, command);
                try {
                    fs.accessSync(fullPath, fs.constants.X_OK);
                    console.log(`${command} is ${fullPath}`);
                    found = true;
                    break; 
                }
                 catch (err) {}
            }

            if (!found) console.log(`${command}: not found`);

        }

    } 
    
    else console.log(`${input}: command not found`);

    rl.prompt();

});