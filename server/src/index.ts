import express from "express";
import path from "path";
import cors from "cors";
import fs from "fs";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/images", express.static(path.join(__dirname, "../public/images")));

// FIXED: Point to src folder, not dist folder
const dbPath = path.join(__dirname, "../src/db.json");

const readDB = () => {
  const data = fs.readFileSync(dbPath, "utf-8");
  return JSON.parse(data);
};

const writeDB = (data: any) => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};

// GET all foods
app.get("/api/foods", (req, res) => {
  const db = readDB();
  res.json(db.foods);
});

// GET single food
app.get("/api/foods/:id", (req, res) => {
  const db = readDB();
  const food = db.foods.find((f: any) => f.id === parseInt(req.params.id));
  if (food) {
    res.json(food);
  } else {
    res.status(404).json({ message: "Food not found" });
  }
});

// POST login
app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;
  const db = readDB();
  const user = db.users.find(
    (u: any) => u.email === email && u.password === password
  );

  if (user) {
    const token = Buffer.from(`${user.id}:${Date.now()}`).toString("base64");
    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

// POST register
app.post("/api/auth/register", (req, res) => {
  const { email, password, name } = req.body;
  const db = readDB();

  const existingUser = db.users.find((u: any) => u.email === email);
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const newUser = {
    id: db.users.length + 1,
    email,
    password,
    name,
    role: "user",
    createdAt: new Date().toISOString(),
  };

  db.users.push(newUser);
  writeDB(db);

  const token = Buffer.from(`${newUser.id}:${Date.now()}`).toString("base64");
  res.json({
    token,
    user: {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      role: newUser.role,
    },
  });
});

// GET cart
app.get("/api/cart", (req, res) => {
  const db = readDB();
  res.json(db.cart);
});

// POST add to cart
app.post("/api/cart", (req, res) => {
  const { foodId, quantity } = req.body;
  const db = readDB();

  // Convert foodId to number
  const parsedFoodId = typeof foodId === 'string' ? parseInt(foodId) : foodId;
  const food = db.foods.find((f: any) => f.id === parsedFoodId);
  
  if (!food) {
    return res.status(404).json({ message: "Food not found" });
  }

  const existingItem = db.cart.find((item: any) => item.foodId === parsedFoodId);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    db.cart.push({
      id: db.cart.length + 1,
      foodId: parsedFoodId,
      quantity,
      food,
    });
  }

  writeDB(db);
  res.json(db.cart);
});

// DELETE cart item
app.delete("/api/cart/:id", (req, res) => {
  const db = readDB();
  db.cart = db.cart.filter((item: any) => item.id !== parseInt(req.params.id));
  writeDB(db);
  res.json({ message: "Item removed" });
});

// POST order
app.post("/api/orders", (req, res) => {
  const { items, total, userEmail } = req.body;
  const db = readDB();

  const newOrder = {
    id: db.orders.length + 1,
    items,
    total,
    userEmail,
    status: "pending",
    createdAt: new Date().toISOString(),
  };

  db.orders.push(newOrder);
  db.cart = [];
  writeDB(db);

  res.json(newOrder);
});

app.listen(9000, () => {
  console.log("Server is running on port 9000");
});