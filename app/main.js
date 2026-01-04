import readline from "readline";

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

  if (input.startsWith("echo ")) {
    const output = input.slice(5);
    console.log(output);
  } else {
    console.log(`${input}: command not found`);
  }

  rl.prompt();
});
