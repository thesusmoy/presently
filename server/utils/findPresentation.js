const PresentationSchema = require('../schema/PresantationSchema')

exports.findPresentation = async (presentationId, res) => {
    const presentation = await PresentationSchema.findById(presentationId);
    if (!presentation) {
        res.status(404).json({ message: 'Presentation not found' });
        return null;
    }
    return presentation;
};

