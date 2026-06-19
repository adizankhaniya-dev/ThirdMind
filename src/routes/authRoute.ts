import express from "express";

const route = express.Router();
route.use(express.json());


route.post("/signup", async(req , res) => {
    console.log("hello")
})

export default route; 