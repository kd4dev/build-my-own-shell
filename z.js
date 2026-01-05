import path from "path";

// import readline from "readline";

// let st=new Set();
// st.add("echo");
// st.add("type");
// st.add("exit");

// const rl = readline.createInterface({
//   input: process.stdin, // terminal se aane wala stream
//   output: process.stdout, // terminal pe output stream
// });

// //    Question turant print hota hai
// //    Callback TAB chalta hai jab terminal me ENTER dabta hai
// // rl.question("Enter your name: ", (name) => {
// //   console.log("Hello", name);

// //   // prompt set kiya (CLI style)
// // });

// rl.setPrompt("$ ");
// rl.prompt(); // terminal me "cmd> " dikhane ke liye

// rl.on("line", (input) => {

//   if (input === "exit") {
//     rl.close(); // readline band
//     return;
//   }
//   else if(input.startsWith(`echo `)){
//     const a=input.slice(5);
//     console.log(a);
//   }
//   else if(input.startsWith(`type `)){
//     const a=input.slice(5);
//     if(st.has(a)){
//       console.log(`${a} is a shell builtin`)
//     }

//     }
//     else{
//       console.log(`${input}: command not found`);
//     }
//   // next input ke liye prompt dubara

//   rl.prompt();

// });

// // 4️⃣ CLOSE EVENT
// //    Ye TAB chalega jab rl.close() call hota hai
// // rl.on("close", () => {
// //   console.log("Program ended.");
// // });  


const folders = process.env.PATH.split(path.delimiter);


console.log(folders)