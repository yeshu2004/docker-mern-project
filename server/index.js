const express = require("express");
const cors = require("cors");
const connectDB = require("./src/db/db");
const msgSchema = require("./src/models/message");
const app = express();

const PORT = 5000 || process.env.PORT;

app.use(cors());
app.use(express.json())

connectDB();

// you can do it in routes & controllers but for ease it is how it is...
app.get("/api", (req, res)=>{
    res.json({message: "Hello from backed..."})
})

app.post('/msg/api', async (req,res)=>{
    const {message} = req.body;
    if(!message || typeof message !== "string" || message.trim().length == 0){
        return res.status(400).json({error: "Message is required and non-empty string"})
    }
    let trimmedMsg = message.trim()

    try {
        const newMsg = await msgSchema.create({ message: trimmedMsg });
        console.log("message saved:", newMsg);
        res.status(201).json({ message: "message saved successfully", data: newMsg });
    } catch (error) {
        console.error("error saving message:", error);
        res.status(500).json({ error: "failed to save message" });
    }
})

app.listen(PORT, ()=>{
    console.log("server running on the PORT:", PORT)
})