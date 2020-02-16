import mongoose from 'mongoose';

var messageSchema = new mongoose.Schema({ text: String},{ versionKey: false });

export default mongoose.model('messages', messageSchema); 