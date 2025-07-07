//Modelando CanalUser
const mongoose = require('mongoose');

const channelUserSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    channelId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Channel",
        required: true,
    },
    joinedAt: {
        type: Date,
        default: Date.now,
    },
    lastMessageReadId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
    },
    notificationsMute: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true,
});

//Creación de índices únicos
/* 
Esta es entidad intermedia entre User:Channels, un N:M
tenemos que considerar que no exista la duplicidad de información.
Para esto, existe que creamos un índice compuesto.
*/
channelUserSchema.index({ userId: 1, channelId: 1 }, { unique: true });
/* Entonces, esto se traduce a que solo puede haber un registro, de un userId con el channelId,
    user: Erik
    channel: OPL
    -> Erik, OPL, solo puede haber un registro así, esto evita duplicidad de registros.
*/

channelUserSchema.methods.toPublicJSON = function () {
    return {
        userId: this.userId,
        channelId: this.channelId,
        joinedAt: this.joinedAt,
        lastMessageReadId: this.lastMessageReadId,
        notificationsMute: this.notificationsMute,
    }
}


module.exports = mongoose.model('ChannelUser', channelUserSchema);


/* 
 Dentro del uso de los canales hicimos uso de índices compuestos que a diferencia del inicio los manejábamos como si fueron todos únicos, en relación a `channelId` y `userId`, donde estos impedian que se volviera a crear una relación tipo de un usuario tuviera ese canal, entonces teníamos que cambiar que ese no era el tipo de unicidad que necestibamos. Donde, el único registro que no se puede replicar es cuando ocurre este caso `{ userId - channelId }`, esto se traduce como seldon - general. Lo  cual nos dice que ya no buscamos que exista la relación del usuario seldon con el canal general más de una vez. 

Por ende procedimos a eliminar los índices únicos de estas props únicas. Y crear el índice compuesto. Este es una vez realizado el model dentro del schema.

```html
channelUserSchema.index({ channelId, userId }, unique: true );
```
*/