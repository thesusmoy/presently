export const getAllowedToEdit = (presentation, user)=>{
    return !!(!presentation.blackListUsers.includes(user) && presentation?.allowEdit);
}