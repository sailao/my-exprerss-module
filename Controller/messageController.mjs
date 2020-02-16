import mongodb from 'mongodb';

const index = ({res}) => {
    mongodb.MongoClient.connect(process.env.DB_HOST, { useUnifiedTopology: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        dbo.collection("messages").find({text:{$exists: true}}, { projection: { _id: 1, text: 1 } }).toArray(function(err, result) {
            if (err) throw err;
            db.close();
            res.json(result);
        });
    });
}

const show = (req, res) => {
    mongodb.MongoClient.connect(process.env.DB_HOST, { useUnifiedTopology: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        dbo.collection("messages").findOne({"_id": mongodb.ObjectId(req.params.id)}, function(err, result) {
            if (err) throw err;
            res.json(result);
            db.close();
        });
    });
}

const store = (req, res) => {
    mongodb.MongoClient.connect(process.env.DB_HOST, { useUnifiedTopology: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        dbo.collection("messages").insertOne({"text": req.body.text}, function(err, result) {
            if (err) throw err;
            res.redirect(`/api/v1/messages`);
            db.close();
        });
    });
}

const update = (req, res) => {
    Messages((message, db) =>{
        message.updateOne({"_id": mongodb.ObjectId(req.params.id)},{$set:{"text": req.body.text}}, function(err, result) {
            if (err) throw err;
            db.close();
        });
    });
    res.redirect(`/api/v1/messages/${req.params.id}`);
}

const destory = (req, res) => {
    Messages((message, db) =>{
        message.deleteOne({"_id": mongodb.ObjectId(req.params.id)}, function(err, result) {
            if (err) throw err;
            db.close();
        });
    });
    res.redirect(`/api/v1/messages`);
}

const Messages = init => {
    mongodb.MongoClient.connect(process.env.DB_HOST, { useUnifiedTopology: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        var message = dbo.collection("messages");
        init(message, db);
    });
}
export default {index, show, store, update, destory};