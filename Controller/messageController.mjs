const index = ({res}) => {
    res.send('respond with a index');
}

const show = (req, res) => {
    res.send('respond with a show'+req.params.id);
}

const store = (req, res) => {
    res.send('respond with a store'+req.body.title);
}

const update = ({res}) => {
    res.send('respond with a update');
}

const destory = ({res}) => {
    res.send('respond with a delete');
}

export default {index, show, store, update, destory};