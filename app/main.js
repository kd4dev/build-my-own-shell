import readline from "readline";
import path from "path";
import fs from "fs";
import { execSync,spawnSync } from "child_process"

const folders = process.env.PATH.split(path.delimiter);
const home = process.env.HOME;
let st = new Set();

st.add("echo");
st.add("exit");
st.add("type"); 
st.add("pwd"); 


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

    else if(input === "pwd"){
        console.log(process.cwd());
    }

    else if(input.startsWith("cd")){
        const path=input.split(" ")[1];
        if(path==="~"){
            process.chdir(home);
        }
        else{
            let flag=fs.existsSync(path);
            if(flag){
                process.chdir(path);
            }
            else console.log(`cd: ${path}: No such file or directory` );
        }
    }

   else if (input.startsWith("echo ")) {
        const a = input.slice(5); 
        const match = a.match(/1?>/);
        if (match) {
            const idx = match.index;
            const operatorLength = match[0].length; 
            let content = a.slice(0, idx).trim();
            let filePath = a.slice(idx + operatorLength).trim();
            if ((content.startsWith("'") && content.endsWith("'")) || 
                (content.startsWith('"') && content.endsWith('"'))) {
                content = content.slice(1, -1);
            }
            if (filePath.length > 0) {
                fs.writeFileSync(filePath, content + "\n");
            } 
            else {
                console.log(content);
            }
        }
         else {
            let content = a.trim();
            if ((content.startsWith("'") && content.endsWith("'")) || 
                (content.startsWith('"') && content.endsWith('"'))) {
                content = content.slice(1, -1);
            }
            console.log(content);
        }
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



else {

    const match = input.match(/1?>/); 

    let commandToRun, args;
    let stdoutTarget = 'inherit'; 
    let fileDescriptor = null;    

    if (match) {

        const idx = match.index;
        const operatorLen = match[0].length; 

        const cmdPart = input.slice(0, idx).trim();
        const filePart = input.slice(idx + operatorLen).trim();

        const parts = cmdPart.split(" ");
        commandToRun = parts[0];
        args = parts.slice(1);

        try {

            fileDescriptor = fs.openSync(filePart, 'w');
            stdoutTarget = fileDescriptor; 
        }
        catch (e) {
            console.log("Error opening file");
            rl.prompt();
            return;
        }

    }
     else {

        const parts = input.trim().split(" ");
        commandToRun = parts[0];
        args = parts.slice(1);
    }

    let foundPath = null;
    for (const folder of folders) { 
        const fullPath = path.join(folder, commandToRun);
        try {
            fs.accessSync(fullPath, fs.constants.X_OK);
            foundPath = fullPath;
            break; 
        } catch (err) {}
    }

    if (foundPath) {
        spawnSync(commandToRun, args, { 
            stdio: [process.stdin, stdoutTarget, process.stderr] 
        });
    }
    else {
        console.log(`${commandToRun}: command not found`);
    }

    if (fileDescriptor) {
        fs.closeSync(fileDescriptor);
    }
}

    rl.prompt();

});