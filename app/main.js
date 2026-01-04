import readline from "readline";

let st = new Set();
st.add("echo");
st.add("type");
st.add("exit");

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
    const a = input.slice(5);
    if (st.has(a)) {
      console.log(`${a} is a shell builtin`);
    }
    else{
      console.log(`${input}: command not found`);
    }
  }
  else {
    console.log(`${input}: command not found`);
  }

  rl.prompt();

});
