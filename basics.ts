// Khai báo các biến
interface User {
  name: string;
  email: string;
  isAdmin: boolean;
  roles: string[];
  age: number;
  isActive: boolean;
}

// Khai báo object user
const user = {
  name: "Nguyễn Thị Vân",
  email: "nguyen.thi.van@example.com",
  isAdmin: true,
  roles: ["DEV", "QA"],
  age: 33,
  isActive: true,
};

// In ra thông tin user theo format yêu cầu
console.log(`Hello ${user.name} (email: ${user.email}), Roles: [${user.roles.join(", ")}], Active: ${user.isActive}`);

// Function kiểm tra tuổi
function checkAge(): void {
  if (user.age >= 18) {
    console.log("Adult");
  } else {
    console.log("Under 18");
  }
}

// Gọi function để kiểm tra
checkAge();
