// readline FULL WORKING DEMO — sirf code, comments ke saath

import readline from "readline";

// 1️⃣ readline ka INSTANCE (object) banaya
//    Ye object hi input/output handle karega
const rl = readline.createInterface({
  input: process.stdin,   // terminal se aane wala stream
  output: process.stdout, // terminal pe output stream
});

// 2️⃣ ONE-TIME INPUT
//    Question turant print hota hai
//    Callback TAB chalta hai jab terminal me ENTER dabta hai
rl.question("Enter your name: ", (name) => {
  console.log("Hello", name);

  // prompt set kiya (CLI style)
  rl.setPrompt("cmd> ");
  rl.prompt(); // terminal me "cmd> " dikhane ke liye
});

// 3️⃣ CONTINUOUS INPUT
//    Har baar ENTER dabane pe ye chalega
rl.on("line", (input) => {
  console.log("You typed:", input);

  // exit condition
  if (input === "exit") {
    rl.close(); // readline band
    return;
  }

  // next input ke liye prompt dubara
  rl.prompt();
});

// 4️⃣ CLOSE EVENT
//    Ye TAB chalega jab rl.close() call hota hai
rl.on("close", () => {
  console.log("Program ended.");
});
