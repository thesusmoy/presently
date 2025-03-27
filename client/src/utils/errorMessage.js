import {toast} from "react-toastify";

export const handleErrorMessage = (action, message) => {
    if (action?.payload?.response.data.message) {
        toast.error(action?.payload?.response.data.message)
    } else {
        toast.error(message)
    }
}