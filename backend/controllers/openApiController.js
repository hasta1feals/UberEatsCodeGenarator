const ModelClient = require("@azure-rest/ai-inference").default;
const { AzureKeyCredential } = require("@azure/core-auth");

// Azure API call
const getAIResponse = async (req, res) => {
    const {message } = req.body;
  const token = "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"; // plsss change this to .env lol

  try {
    const client = new ModelClient(
      "https://models.inference.ai.azure.com",
      new AzureKeyCredential(token)
    );

    const response = await client.path("/chat/completions").post({
      body: {
        messages: [
          { role: "user", content: 'uber eats '+ message +' geef me goede plekken hou het kort en strak' }
        ],
        model: "Meta-Llama-3-8B-Instruct",
        temperature: 0.8,
        max_tokens: 4096,
        top_p: 0.1
      }
    });

    if (response.status !== "200") {
      throw response.body.error;
    }

    // Send the response from Azure AI to the client
    res.json({ message: response.body.choices[0].message.content });

  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: 'Failed to fetch AI response' });
  }
};
module.exports = {
    getAIResponse
  
};
