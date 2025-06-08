import express from "express";
import { prismaClient } from "db/client";

const app = express();

app.use(express.json());

app.get("/users", (req:any, res:any) => {
  const users=prismaClient.user.findMany()
   res.json(users)
    
})

app.post("/user", (req:any, res:any) => {
  const { username, password } = req.body;
  
  if (!username || !password) {
    res.status(400).json({ error: "Username and password are required" });
    return
  }

  const user=prismaClient.user.create({
    data: {
      username,
      password
    }
  })
  res.json({
    user
  })
    
})

app.listen(8080);