import mongoose from 'mongoose';
import Message from '../Model/Message.mjs';

const DBconnect = _ =>  mongoose.connect(process.env.DB_HOST, { useNewUrlParser: true, useUnifiedTopology: true }); 

const index = ({res}) => {
    DBconnect();
    Message.find({}, (err, data)=>{
        if(err) console.log(err)
        res.json(data);
    });
}

const show = (req, res) => {
    DBconnect();
    Message.findById(req.params.id, (err, data)=>{
        if(err) console.log(err)
        res.json(data);
    });
}

const store = (req, res) => {
    DBconnect();
    var message = new Message({
        text: req.body.text
    });

    message.save((err, data)=>{
        if(err) console.log(err)
        res.json(data);
    });
}
    
const update = (req, res) => {
    DBconnect();
    Message.findById(req.params.id, (err, data)=>{
        if(err) console.log(err);
        data.text = req.body.text;
        data.save(function(err,data){
            if(err) console.log(err);
            res.redirect(`/api/v1/messages/${req.params.id}`);
        })
    });
}

const destory = (req, res) => {
    DBconnect();
    Message.findByIdAndRemove(req.params.id, (err, data)=>{
        if(err) console.log(err)
        res.redirect(`/api/v1/messages`);
    });
}

export default {index, show, store, update, destory};