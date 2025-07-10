

const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require('dotenv');
dotenv.config({ path: '../.env'});

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
console.log('API KEY', process.env.GEMINI_API_KEY);


let prompt = 'Hola, Gemini, te estoy consumiendo desde un env de node.js con express. Pero solamente por el momento, ejecutando la función base que se conecta a la API.'

async function getGeminiChat(prompt) {
    console.log('Starting request... 🚀')
    const model = genAI.getGenerativeModel({ model: /* "gemini-1.5-flash" */ "gemma-3n-e2b-it" });

    try {
        const result = await model.generateContent(prompt);
        console.debug('Respuesta de Model', result);

        const response = await result.response;
        const textResponse = response.text();
        
        console.log(textResponse);
        return textResponse;
        
    } catch (error) {
        console.error('Error al conectar con Gemini ✨');
    }
}

getGeminiChat(prompt);