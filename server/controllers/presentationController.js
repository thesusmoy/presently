const PresentationSchema = require('../schema/PresantationSchema');
const {findPresentation} = require("../utils/findPresentation");

exports.presentationController = {
    getAllPresentations: async (req, res) => {
        try {
            const presentations = await PresentationSchema.find();
            res.json(presentations);
        } catch (error) {
            res.status(500).json({ error: error.message });
            console.log(error)
        }
    },

    getPresentationById: async (req, res) => {
        const presentationId = req.params.id;
        try {
            const presentation = await findPresentation(presentationId, res);
            if (!presentation) return
            res.status(200).json(presentation);
        } catch (error) {
            res.status(500).json({ error: error.message });
            console.log(error)
        }
    },

    createPresentation: async (req, res) => {
        let author = req.body.author
        let allowEdit = req.body?.allowEdit
        let title = req.body.title

        const presentation = new PresentationSchema({
            title,
            author,
            allowEdit,
            blackListUsers: [],
            slides: []
        });
        try {
            const newPresentation = await presentation.save();
            res.status(200).json(newPresentation._id);
        } catch (error) {
            res.status(400).json({ error: error.message });
            console.log(error)
        }
    },

    createPresentationSlide: async (req, res) => {
        const presentationId = req.params.id;
        try {
            const presentation = await findPresentation(presentationId, res);
            if (!presentation) return
            presentation.slides.push({ content: '' });
            await presentation.save();
            res.status(200).json({message: 'Slide is created'});
        } catch (error) {
            res.status(400).json({ error: error.message });
            console.log(error)
        }
    },

    editPresentationSlide: async (req, res) => {
        const presentationId = req.params.id;
        const slideId = req.body.slideId;
        const content = req.body.content
        try {
            const presentation = await findPresentation(presentationId, res);
            if (!presentation) return

            const slideIndex = presentation.slides.findIndex(slide => slide._id.toString() === slideId);
            if (slideIndex === -1) return res.status(404).json({ message: 'Slide not found' });

            presentation.slides[slideIndex].content = content;
            await presentation.save();
            res.status(200).json({message: 'Slide is edited'});
        } catch (error) {
            res.status(400).json({ error: error.message });
            console.log(error)
        }
    },

    deletePresentationSlide: async (req, res) => {
        const presentationId = req.params.presentationId;
        const slideId = req.params.slideId;

        try {
            const presentation = await findPresentation(presentationId, res);
            if (!presentation) return

            const slideIndex = presentation.slides.findIndex(slide => slide._id.toString() === slideId);
            if (slideIndex === -1) return res.status(404).json({ message: 'Slide not found' });

            presentation.slides.splice(slideIndex, 1);
            await presentation.save();
            res.status(200).json({message: 'Slide is deleted'});
        } catch (error) {
            res.status(400).json({ error: error.message });
            console.log(error)
        }
    },

    deletePresentation: async function deletePresentation(req, res){
        const presentationId = req.params.id;
        try {
            const presentation = await findPresentation(presentationId, res);
            if (!presentation) return
            await PresentationSchema.findByIdAndDelete(presentationId);
            res.status(200).json({message: 'Presentation is deleted'});
        } catch (error) {
            res.status(500).json({ error: error.message });
            console.log(error)
        }
    },

    addUserToBlackList: async (req, res) => {
        const presentationId = req.params.id;
        const user = req.body.user;
        try {
            const presentation = await findPresentation(presentationId, res);
            if (!presentation) return

            if (presentation.blackListUsers.includes(user)) return res.status(400).json({ message: 'User is already in black list' });
            presentation.blackListUsers.push(user);
            await presentation.save()
            res.status(200).json({message: 'User is added to black list'});
        } catch (error) {
            res.status(400).json({ error: error.message });
            console.log(error)
        }
    },

    removeUserFromBlackList: async (req, res) => {
        const presentationId = req.params.id;
        const userName = req.body.user;
        try {
            const presentation = await findPresentation(presentationId, res);
            if (!presentation) return

            presentation.blackListUsers = presentation.blackListUsers.filter(user => user!==userName);
            await presentation.save()
            res.status(200).json({message: 'User is removed from black list'});
        } catch (error) {
            res.status(400).json({ error: error.message });
            console.log(error)
        }
    },

    changePresentationEditability: async (req, res) => {
        const presentationId = req.params.id;
        const allowEdit = req.body.allowEdit;
        try {
            const presentation = await findPresentation(presentationId, res);
            if (!presentation) return

            presentation.allowEdit = allowEdit;
            await presentation.save()
            res.status(200).json({message: 'Presentation editability is changed'});
        } catch (error) {
            res.status(400).json({ error: error.message });
            console.log(error)
        }
    }
}