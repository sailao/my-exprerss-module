import messageRouter from './Controller/messageController.mjs'

const routes = (app) => {
    app.get('/', (req, res) => {
        res.send(`Api server in running (${new Date()})`);
    });

    app.route('/api/v1/messages')
        .get(messageRouter.index)
        .post(messageRouter.store);

    app.route('/api/v1/messages/:id')
        .get(messageRouter.show)
        .patch(messageRouter.update)
        .delete(messageRouter.destory);
};

export default routes;