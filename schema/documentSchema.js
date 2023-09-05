import mongoose from 'mongoose';

const documentSchema = mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    data: {
       
        





















        
    }
});

const document = mongoose.model('document', documentSchema);

export default document;