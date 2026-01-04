import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin, // terminal se aane wala stream
  output: process.stdout, // terminal pe output stream
});

//    Question turant print hota hai
//    Callback TAB chalta hai jab terminal me ENTER dabta hai
// rl.question("Enter your name: ", (name) => {
//   console.log("Hello", name);

//   // prompt set kiya (CLI style)
// });

rl.setPrompt("$ ");
rl.prompt(); // terminal me "cmd> " dikhane ke liye

rl.on("line", (input) => {
  if (input === "exit") {
    rl.close(); // readline band
    return;
  }
  if(input.startsWith(`echo `)){
    let a=input.split('echo ').join();
    console.log(a[1]);
  }
  // console.log(`${input}: command not found`);
  // next input ke liye prompt dubara

  rl.prompt();

});

// 4️⃣ CLOSE EVENT
//    Ye TAB chalega jab rl.close() call hota hai
// rl.on("close", () => {
//   console.log("Program ended.");
// });
