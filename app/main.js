import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});


rl.question("$ ", (answer) => {
  rl.close();
});

rl.question("$ ", (command) => {
  console.log(`${command} not found`);
  rl.close();
});









