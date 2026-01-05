// // import readline from "readline";
// // import path from "path";
// // import fs from "fs";

// // let st = new Set();
// // st.add("echo");
// // st.add("exit");
// // st.add("type"); // 1. Isko wapas add kar, ye zaroori hai

// // const folders = process.env.PATH.split(path.delimiter);

// // const rl = readline.createInterface({
// //     input: process.stdin,
// //     output: process.stdout,
// // });

// // rl.setPrompt("$ ");
// // rl.prompt();

// // rl.on("line", (input) => {
// //     if (input === "exit") {
// //         rl.close();
// //         return; // Return zaroor lagana taki code neeche na jaye
// //     } 
// //     // .trim() use kar taki extra spaces handle ho jayein
// //     else if (input.startsWith("echo ")) {
// //         const a = input.slice(5);
// //         console.log(a);
// //     } 
// //     else if (input.startsWith("type ")) {
// //         const command = input.slice(5);

// //         if (st.has(command)) {
// //             console.log(`${command} is a shell builtin`);
// //         } else {
// //             // Logic start
// //             let found = false; // Flag to track agar mil gaya

// //             for (const folder of folders) { // for-of loop easy padta hai
                
// //                 // 2. Sahi tarika path banane ka (Variables use kar, string nahi)
// //                 const fullPath = path.join(folder, command);

// //                 try {
// //                     // 3. Synchronous check use kar (accessSync)
// //                     // X_OK check karta hai ki executable hai ya nahi
// //                     fs.accessSync(fullPath, fs.constants.X_OK);
                    
// //                     // Agar yahan tak code aaya, matlab file mil gayi aur error nahi aaya
// //                     console.log(`${command} is ${fullPath}`);
// //                     found = true;
// //                     break; // Loop rok de, mil gaya maal!
// //                 } catch (err) {
// //                     // Agar error aaya (file nahi hai ya permission nahi hai), 
// //                     // toh ignore kar aur loop chalne de next folder ke liye
// //                 }
// //             }

// //             // Loop khatam hone ke baad check kar
// //             if (!found) {
// //                 console.log(`${command}: not found`);
// //             }
// //         }
// //     } else {
// //         // Ye "run" karne wala part baad mein aayega, abhi ke liye not found thik he
// //         console.log(`${input}: command not found`);
// //     }

// //     rl.prompt();
// // });

// let input="git commit -m 'initial commit' "
// const command=input.split(" ")[0];
// console.log(command)


import readline from "readline";
import path from "path";
import fs from "fs";
import { execSync } from "child_process"

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

    else{
        let found=false;
        const command=input.split(" ")[0];
        for (const folder of folders) { 
            const fullPath = path.join(folder, command);
            try {
               fs.accessSync(fullPath, fs.constants.X_OK);
               const output = execSync(input, { encoding: 'utf-8' });
               process.stdout.write(output.toString());  // ye new line nahi deta output me signature new line add kr rha he khud se
               found=true;
               break; 
            }
             catch (err) {}
        }
        if(!found) console.log(`${input}: command not found`);
    } 

    rl.prompt();

});