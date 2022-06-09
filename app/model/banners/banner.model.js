import pkg from 'mongoose';
const { Schema: _Schema, model } = pkg;
const Schema = _Schema;

const banner = new Schema({
    navData: {
        type: Schema.Types.Mixed,
        required: true,
    },
    tags: {
        type: [String],
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    segment: {
        type: String,
        required: true,
    },
    additionalData: {
        type: [Schema.Types.Mixed],
    }
}, { collection: 'banners' });

export default model('Banner', banner);
