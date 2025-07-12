

const { GoogleGenerativeAI } = require("@google/generative-ai");

/*  Variable solo para testing, descomentar cuando solo ejecutamos el uso de
este archivo por node 'nombredodearchivo.js', así cargamos el env
a process.env, de lo contrario cuando es el uso de la app, se cargan desde
server.js
 */
/* const dotenv = require('dotenv');
dotenv.config({ path: '../.env'}); */

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
/* TEsting */
/* getGeminiChat(prompt); */

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
