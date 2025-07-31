

const { GoogleGenerativeAI } = require("@google/generative-ai");

/*  Variable solo para testing, descomentar cuando solo ejecutamos el uso de
este archivo por node 'nombredodearchivo.js', así cargamos el env
a process.env, de lo contrario cuando es el uso de la app, se cargan desde
server.js
 */
const dotenv = require('dotenv');
dotenv.config({ path: '../.env'});

// IMPORTANTE: Si usas VPN (como Zepp), desconéctala antes de usar la API de Gemini
console.log('API KEY:', process.env.GEMINI_API_KEY);
console.log('AI MODEL:', process.env.AI_MODEL);
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);


let prompt = 'Hola, Gemma, te estoy consumiendo desde tu API, por un archivo node.js, son mis primeros pasos usando la API.'
let newPrompt = '¿Cuáles serían los siguientes pasos?';

async function getGeminiChat(prompt) {
    console.log('Starting request... 🚀')
    
    try {
        // ✅ Usar modelo válido
        const model = genAI.getGenerativeModel({ model: process.env.AI_MODEL });
        
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const textResponse = response.text();
        
        console.log(textResponse);
        return textResponse;
        
    } catch (error) {
        console.error('Error al conectar con Gemini:', error.message);
        throw error;
    }
}

/* Chat continuo */
async function getChatRun(newPrompt/* , previousChats */) {
    console.log('Starting Chat Run request... 🚀')
    const model = genAI.getGenerativeModel({ model: process.env.AI_MODEL });

    try {

        //Obtenemos el chat primero en una búsqueda por canal posteriormente.
        //* Este chat se debe guardar en la base, con esta estructura y lo traeremos
        // del propio previousChat.
        const chat = model.startChat({
            history: /* previousChats */[
                {
                    role: 'user',
                    parts: [{
                        text: prompt
                    }]
                },
                {
                    role: 'model',
                    parts: [{
                        text: 'Hola, Dan, me alegró, un gusto conocerte. Que Alegría que estes dando tus primeros pasos.',
                    }]
                },
            ],
            generationConfig: {
                maxOutputTokens: 100,
            },
        });


        const result = await model.generateContent(newPrompt);
        const response = await result.response;
        if (response) {
            const text = response.text();
            console.log(text);
            return text;
        }
    } catch (error) {
        console.error('Error al conectar con Gemini ✨', error);
    }
}

/* getChatRun(newPrompt); */




/* TEsting */
getGeminiChat(prompt);

// exports.getPreviousChats = async (request, response) => {
//     /* ¿Checará en la db la conversación guardada? */

// }



exports.getChat = async (request, response) => {
    try {
        const { prompt } = request.body;
        
        const responseGemini = await getGeminiChat(prompt);

        if (!responseGemini) {
            return response.status(404).json({
                success: false,
                message: 'No se encontró respuesta de Gemini.'
            });
        }

        response.status(200).json({
            success: true,
            body: responseGemini
        }) 

    }
    catch (error) {
        console.log('Error al obtener esta respuesta', error);
        response.status(500).json({
            success: false,
            message: 'Error en el servidor',
        });
    }
}
