const express = require('express');
const {presentationController} = require("../controllers/presentationController");
const PresentationRoute = express.Router()


PresentationRoute.get('/', presentationController.getAllPresentations)
PresentationRoute.get('/:id', presentationController.getPresentationById)


PresentationRoute.post('/', presentationController.createPresentation)
PresentationRoute.post('/:id', presentationController.createPresentationSlide)


PresentationRoute.put('/changeEditability/:id', presentationController.changePresentationEditability)
PresentationRoute.put('/addToBlackList/:id', presentationController.addUserToBlackList)
PresentationRoute.put('/removeFromBlackList/:id', presentationController.removeUserFromBlackList)
PresentationRoute.put('/:id', presentationController.editPresentationSlide)

PresentationRoute.delete('/deleteSlide/:presentationId/:slideId', presentationController.deletePresentationSlide)
PresentationRoute.delete('/:id', presentationController.deletePresentation)


module.exports = PresentationRoute;