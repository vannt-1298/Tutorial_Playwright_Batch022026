// Function sum - trả về tổng
function sum(a: number, b: number){
  return a + b;
}

// Arrow function multiply - trả về tích
const multiply = (a: number, b: number): number => {
  return a * b;
};

// Function greet với default parameter
function greet(name: string, role: string = "Guest"): void {
  console.log(`Hello ${name}, your role is ${role}`);
}

// Async function delayPrint - in message sau time ms
async function delayPrint(msg: string, time: number): Promise<void> {
  await new Promise(resolve => setTimeout(resolve, time));
  console.log(msg);
}

// Test các functions
console.log("=== Test Functions ===");
console.log(`sum(5, 3) = ${sum(5, 3)}`);
console.log(`multiply(4, 6) = ${multiply(4, 6)}`);

greet("John Doe", "Developer");
greet("Jane Smith"); // Sử dụng default role

// Test async function
console.log("\n=== Test Async Function ===");
console.log("Starting delay...");
delayPrint("This message appears after 2 seconds", 2000);
delayPrint("This message appears after 1 second", 1000);
