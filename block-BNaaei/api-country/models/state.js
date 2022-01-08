var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var stateSchema = new Schema ({
    name: { type: String, required: true },
    country: { type: Schema.Types.ObjectId, ref: 'Country', required: true },
    population: Number,
    area: Number,
    neighboring_states: [{ type: Schema.Types.ObjectId, ref: 'State' }]
}, { timestamps: true });

module.exports = mongoose.model('State', stateSchema);