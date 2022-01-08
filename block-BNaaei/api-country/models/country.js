var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var countrySchema = new Schema ({
    name: { type: String, required: true },
    state: [{ type: Schema.Types.ObjectId, ref: 'State' }],
    continent: { type: String },
    population: Number,
    ethincity: [String],
    neighboring_countries: [{ type: Schema.Types.ObjectId, ref: 'Country' }],
    area: Number
}, { timestamps: true })

countrySchema.index({name: 1});
module.exports = mongoose.model('Country', countrySchema);