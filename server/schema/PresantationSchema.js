const {Schema, model} = require("mongoose");

const PresentationSchema  = new Schema({
    author: { type: String, required: true },
    title: { type: String, required: true },
    allowEdit: { type: Boolean, default: true },
    blackListUsers: [{ type: String , default:[]}],
    activeUsers: [{ type: String, default:[]}],
    slides: [{ type: [], default: [] }]
}, { timestamps: true });

module.exports = model('Presentation', PresentationSchema)