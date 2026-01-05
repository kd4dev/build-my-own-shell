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
        if(a.includes('>')){

            let content="";
            let filePath="";
            const idx=a.indexOf('>');

            if(idx>0){
                if(a[idx-1]==='1') content=a.slice(0,idx-1);
                else content=a.slice(0,idx);
            }

            filePath=a.slice(idx+1);


            if(filePath!=="")
                fs.writeFileSync(filePath.trim(), content.trim());
            else console.log(a);
        }
        else console.log(a);
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

    else{
        const parts = input.trim().split(" ");
        const command = parts[0];
        const args = parts.slice(1);
        let foundPath = null;

        for (const folder of folders) { 
            const fullPath = path.join(folder, command);
            try {
                fs.accessSync(fullPath, fs.constants.X_OK);
                foundPath=fullPath;
                break; 
            }
             catch (err) {}
        }
        if(foundPath) {
            const output = execSync(input, { encoding: 'utf-8' });
            process.stdout.write(output.toString());
        }
        else console.log(`${input}: command not found`);
    } 

    rl.prompt();

});