// Interface IUser
interface IUser {
  name: string;
  email: string;
  isAdmin: boolean;
}

// Class User implements IUser
class User implements IUser {
  name: string;
  email: string;
  isAdmin: boolean;

  constructor(name: string, email: string, isAdmin: boolean) {
    this.name = name;
    this.email = email;
    this.isAdmin = isAdmin;
  }

  getInfo(): string {
    return `User: ${this.name}, Email: ${this.email}, Admin: ${this.isAdmin}`;
  }
}

// Class AdminUser kế thừa User
class AdminUser extends User {
  constructor(name: string, email: string) {
    super(name, email, true); // Admin luôn có isAdmin = true
  }

  deleteUser(user: User): void {
    console.log(`[Admin ${this.name}] Deleted user: ${user.name}`);
  }
}

// Tạo instances và test
console.log("=== Test User Class ===");
const user1 = new User("John Doe", "john@example.com", false);
console.log(user1.getInfo());

const user2 = new User("Jane Smith", "jane@example.com", false);
console.log(user2.getInfo());

const admin1 = new AdminUser("Admin Mike", "admin@example.com");
console.log(admin1.getInfo());

// Test deleteUser method
console.log("\n=== Test AdminUser deleteUser ===");
admin1.deleteUser(user1);
admin1.deleteUser(user2);

// Tạo mảng users và duyệt
console.log("\n=== Array of Users ===");
const users: User[] = [
  new User("Alice Johnson", "alice@example.com", false),
  new User("Bob Wilson", "bob@example.com", false),
  new AdminUser("Super Admin", "superadmin@example.com"),
  new User("Charlie Brown", "charlie@example.com", false),
  new AdminUser("Admin Sarah", "sarah@example.com")
];

users.forEach((user, index) => {
  console.log(`${index + 1}. ${user.getInfo()}`);
});
