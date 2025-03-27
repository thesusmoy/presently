const { socketController } = require('./SocketController');
exports.setSocket = (io) => {
    io.on('connection', (socket) => {
        let user = '';
        let presentationId = '';

        socket.on('joinPresentation', async (userName, presentation_id) => {
            user = userName;
            presentationId = presentation_id;
            socket.join(presentationId);

            await socketController.joinPresentation(userName, presentation_id);
            io.to(presentation_id).emit('refreshPresentation');
        });

        socket.on('deletePresentation', async (presentationId) => {
            await socketController.deletePresentation(presentationId);
            io.to(presentationId).emit('deletePresentation');
        });

        socket.on('deletePresentationSlide', async (presentationId, slideId) => {
            await socketController.deletePresentationSlide(presentationId, slideId);
            io.to(presentationId).emit('refreshPresentation');
        });

        socket.on('addPresentationSlide', async (presentationId, slideId) => {
            await socketController.addPresentationSlide(presentationId, slideId);
            io.to(presentationId).emit('refreshPresentation');
        });

        socket.on('editPresentation', async (presentationId, slideId, editedSlide) => {
            await socketController.editPresentation(presentationId, slideId, editedSlide);
            io.to(presentationId).emit('refreshPresentation');
        });

        socket.on('addUserToBlacklist', async (userName, presentation_id) => {
            console.log('add to black');
            await socketController.addUserToBlacklist(userName, presentation_id);
            io.to(presentationId).emit('refreshPresentation');
        });

        socket.on('removeUserFromBlacklist', async (userName, presentation_id) => {
            console.log('remove from black');
            await socketController.removeUserFromBlacklist(userName, presentation_id);
            io.to(presentationId).emit('refreshPresentation');
        });

        socket.on('leavePresentation', async () => {
            await socketController.leavePresentation(user, presentationId);
            io.to(presentationId).emit('refreshPresentation');
        });

        socket.on('disconnect', async () => {
            await socketController.leavePresentation(user, presentationId);
            io.to(presentationId).emit('refreshPresentation');
        });
    });
};
