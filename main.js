//in this file, we will configure how chat gpt and gemini will work together

//bringing the code snippet from the documentation of gemini

// Make sure to include these imports:
// import { GoogleGenerativeAI } from "@google/generative-ai";


require ('dotenv').config()
const {GoogleGenerativeAI} = require ('@google/generative-ai');//firstly we have imported this library
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(express.json())
app.use(bodyParser.json())



//now creating an API
app.get('/', (req,res)=>{
    res.send("hello world gemini!")
})

const genAI = new GoogleGenerativeAI(process.env.API_KEY);//creating a GenAI model here using the API Key here

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });//gemini1.5 flash is the model name here

// const prompt = "can we update the value of pi?";//here is the prompt


const generate = async (prompt)=>{
    try{
        const result = await model.generateContent(prompt);//asking a question from the model here
        console.log(result.response.text());
        return result.response.text()
    }
    catch(error){
        console.log("error in 1st try catch block",error);

    }

}
// generate()


// app.get('/api/content', async (req, res) => {
//     try {
//         const { question } = req.body; // Destructure the question property

//         if (!question) {
//             return res.status(400).send({ error: 'Missing question in request body' });
//         }

//         const result = await generate(question);
//         res.send({
//             "result": result
//         });
//     } catch (error) {
//         console.log("we encountered an error here", error);
//     }
// });




//creating an api to get the API from the AI Model we have created
app.get('/api/content',async (req,res)=>{
    try {
        const data = req.body.question;
        const result = await generate(data)
        res.send({
            "result":result
        })
    } catch (error) {
        console.log("we encountered an error here",error);
        
    }
})

app.listen(3000,()=>{
    console.log("listening on port 3000");
})