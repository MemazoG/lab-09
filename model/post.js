// Imports
const { model, Schema } = require("mongoose");

// Definir schema (cómo va a estar organizado)
let postSchema = Schema ({
    title: String,
    author: String,
    post_date: {
        type: Date,
        default: Date.now
    },
    post_data: String
});

// Preparar para exportar
module.exports = model('posts', postSchema);