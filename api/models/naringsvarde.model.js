const mongoose = require('mongoose');

const naringsvardeSchema = mongoose.Schema({
    Namn : String,
    Forkortning: String,
    Varde : number,
    Enhet : String,
    SenastAndrad: Date,
    Vardetyp : String,
    Ursprung : String,
    Publikation: String,
    Framtagningsmetod : String
});

model.exports = mongoose.model('Naringsvarde',naringsvardeSchema);