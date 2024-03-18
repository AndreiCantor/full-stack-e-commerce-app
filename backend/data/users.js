import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin User",
    email: "Admin@example.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "Andrei",
    email: "Andrei@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "Maria",
    email: "Maria@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
];

export default users;
