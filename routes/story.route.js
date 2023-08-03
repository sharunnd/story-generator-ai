const { Configuration, OpenAIApi } = require("openai");
const express = require("express");
const { auth } = require("../middlewares/auth.middleware");
const storyRouter = express.Router()

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

storyRouter.post('/',auth, async (req, res) => { 
    try {
      
      const { genre } = req.body;
  
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `Provide a well-formatted ${genre} short story. Don't repeat the story from previous responses`,
        max_tokens: 1000,//setting the words limit
        temperature: 1.2,
      });
  
      res.json({msg:"here it is",response:response.data.choices[0].text.trim()})

    } catch (error) {
      console.error(error);
      res.status(500).json({err:error.message});
    }
  });




module.exports = {
    storyRouter
}