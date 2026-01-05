import readline from "readline";
import path from "path";
import fs from "fs";

let st = new Set();
st.add("echo");
st.add("type");
st.add("exit");

const folders = process.env.PATH.split(path.delimiter);

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
  else if (input.startsWith(`echo `)) {
    const a = input.slice(5);
    console.log(a);
  }
  else if (input.startsWith(`type `)) {
    const command = input.slice(5);
    if (st.has(command)) {
      console.log(`${command} is a shell builtin`);
    }
    else if (!st.has(command)) {
      let absolutePath="";
      let flag=false;
      for(let folder=0;folder<folders.length;folder++){
        if(flag) break;
        if(path.join(`/folder`, '/command')){
            fs.access('path/to/file', fs.constants.X_OK, (err) => {
                 if(!err) {
                     absolutePath=path.resolve(command); 
                     flag=true;
                 }
             });
        }
      }
      if(absolutePath!=="") {
        console.log(`${command} is ${absolutePath}`);
       }
      else {
        console.log(`${a}: not found`);
      }
    }
  }
  else {
    console.log(`${input}: command not found`);
  }

  rl.prompt();

});
