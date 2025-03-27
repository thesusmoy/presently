const PresentationSchema = require("../schema/PresantationSchema");
exports.socketController = {

    joinPresentation: async (userName, presentationId)=>{
        try{
            let presentation = await PresentationSchema.findById(presentationId)
            if(!presentation){
                throw new Error("Presentation not found")
            }
            presentation.activeUsers.push(userName)
            await presentation.save()
        }
        catch(error){
            console.log(error)
        }
    },

    editPresentation: async (presentationId, slideId, editedSlide)=>{
        try{
            let presentation = await PresentationSchema.findById(presentationId)
            if(!presentation){
                throw new Error("Presentation not found")
            }
            presentation.slides[slideId]=editedSlide
            await presentation.save()
        }
        catch(error){
            console.log(error)
        }
    },

    addPresentationSlide: async (presentationId)=>{
        try{
            let presentation = await PresentationSchema.findById(presentationId)
            if(!presentation){
                throw new Error("Presentation not found")
            }
            presentation.slides.push([])
            console.log(presentation)
            await presentation.save()
        }
        catch(error){
            console.log(error)
        }
    },

    deletePresentation: async (presentationId)=>{
        try{
            let presentation = await PresentationSchema.findByIdAndDelete(presentationId)
            if(!presentation){
                throw new Error("Presentation not found")
            }
        }
        catch(error){
            console.log(error)
        }
    },

    deletePresentationSlide: async (presentationId, slideId) =>{
        try{
            let presentation = await PresentationSchema.findById(presentationId)
            if(!presentation){
                throw new Error("Presentation not found")
            }
            presentation.slides.splice(slideId, 1)
            await presentation.save()
        }
        catch(error){
            console.log(error)
        }
    },

    addUserToBlacklist: async (userName, presentationId)=>{
        try{
            let presentation = await PresentationSchema.findById(presentationId)
            if(!presentation){
                throw new Error("Presentation not found")
            }
            presentation.blackListUsers.push(userName)
            await presentation.save()
        }
        catch(error){
            console.log(error)
        }
    },

    removeUserFromBlacklist: async (userName, presentationId)=>{
        try{
            let presentation = await PresentationSchema.findById(presentationId)
            if(!presentation){
                throw new Error("Presentation not found")
            }

            presentation.blackListUsers = presentation.blackListUsers.filter(user => user!== userName)
            await presentation.save()
        }
        catch(error){
            console.log(error)
        }
    },

    leavePresentation: async (userName, presentationId)=>{
        try{
            let presentation = await PresentationSchema.findById(presentationId)
            if(!presentation){
                throw new Error("Presentation not found")
            }
            presentation.activeUsers = presentation.activeUsers.filter(user => user!== userName)
            await presentation.save()
        }
        catch(error){
            console.log(error)
        }
    }
}