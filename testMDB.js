const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/test');

/* console.log('Model on mongoose', mongoose.model) */
/* Input
    Model on mongoose [Function (anonymous)]
*/
/* Como se vio en el log, al obtener el módelo esto se debe
a que 'model', no es un modelo en sí, más bien es una
función  para definir modelos en Mongoose . Como este
no ha sido definida, entonces se muestra como una */
const Cat = mongoose.model('Cat', { name: String });

const kitty = new Cat({ name: 'Zildjian' });
kitty.save().then(() => console.log('meow'));