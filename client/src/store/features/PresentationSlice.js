import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { handleErrorMessage } from '../../utils/errorMessage.js';

const initialState = {
    presentations: [],
    loading: false,
    selectedPresentation: null,
    selectedSlice: 0,
    error: false,
    allowedToEdit: false,
};

let serverUrl = import.meta.env.VITE_SERVER_URL;
let presentationUrl = serverUrl + '/presentations';

export const getPresentations = createAsyncThunk('presentation/getPresentations', async () => {
    try {
        const response = await axios.get(presentationUrl);
        return response.data;
    } catch (error) {
        return rejectWithValue({
            message: error.message,
            code: error.code,
            status: error.response?.status,
        });
    }
});

export const getPresentationById = createAsyncThunk('presentation/getPresentationById', async (presentationId) => {
    try {
        const response = await axios.get(presentationUrl + '/' + presentationId);
        return response.data;
    } catch (error) {
        return rejectWithValue({
            message: error.message,
            code: error.code,
            status: error.response?.status,
        });
    }
});

export const getPresentationByIdForSocket = createAsyncThunk(
    'presentation/getPresentationByIdForSocket',
    async (presentationId) => {
        try {
            const response = await axios.get(presentationUrl + '/' + presentationId);
            return response.data;
        } catch (error) {
            return rejectWithValue({
                message: error.message,
                code: error.code,
                status: error.response?.status,
            });
        }
    }
);

export const createPresentaion = createAsyncThunk('presentation/createPresentaion', async (data) => {
    try {
        const response = await axios.post(presentationUrl, data);
        return response.data;
    } catch (error) {
        return rejectWithValue({
            message: error.message,
            code: error.code,
            status: error.response?.status,
        });
    }
});

export const deletePresentation = createAsyncThunk('presentation/deletePresentation', async (id) => {
    try {
        const response = await axios.delete(presentationUrl + '/' + id);
        return response.data;
    } catch (error) {
        return rejectWithValue({
            message: error.message,
            code: error.code,
            status: error.response?.status,
        });
    }
});

export const PresentationSlice = createSlice({
    name: 'presentation',
    initialState,
    reducers: {
        setSelectedSlide: (state, action) => {
            state.selectedSlice = action.payload;
        },
        editPresentationSlide: (state, action) => {
            state.selectedPresentation.slides[state.selectedSlice] = action.payload;
        },

        deletePresentationLocally: (state, action) => {
            state.presentations = state.presentations.filter((presentation) => presentation._id !== action.payload);
        },
        deletePresentationSlideLocally: (state, action) => {
            state.selectedPresentation.slides = state.selectedPresentation.slides.filter(
                (slide, id) => id !== action.payload
            );
        },
        addPresentationSlideLocally: (state) => {
            state.selectedPresentation.slides.push([]);
        },
        addUserToBlackListLocally: (state, action) => {
            state.selectedPresentation.blackListUsers.push(action.payload);
        },
        removeUserFromBlackListLocally: (state, action) => {
            state.selectedPresentation.blackListUsers = state.selectedPresentation.blackListUsers.filter(
                (user) => user !== action.payload
            );
        },
        setAllowedToEdit: (state, action) => {
            state.allowedToEdit = action.payload;
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(getPresentations.pending, (state) => {
                state.loading = true;
            })
            .addCase(getPresentations.fulfilled, (state, action) => {
                state.loading = false;
                state.presentations = action.payload;
            })
            .addCase(getPresentations.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                handleErrorMessage(action, "Can't get presentations");
            })

            .addCase(getPresentationById.pending, (state) => {
                state.loading = true;
            })
            .addCase(getPresentationById.fulfilled, (state, action) => {
                state.loading = false;
                if (!action?.payload?._id) {
                    state.error = true;
                    return handleErrorMessage(action, "Can't get presentation");
                }
                state.selectedPresentation = action.payload;
            })
            .addCase(getPresentationById.rejected, (state, action) => {
                console.log(action.payload);
                state.loading = false;
                state.error = true;
                handleErrorMessage(action, "Can't get presentation");
            })

            .addCase(getPresentationByIdForSocket.fulfilled, (state, action) => {
                state.selectedPresentation = action.payload;
            })
            .addCase(getPresentationByIdForSocket.rejected, (state, action) => {
                handleErrorMessage(action, "Can't update presentation");
            })

            .addCase(createPresentaion.rejected, (state, action) => {
                console.log(action.payload);
                handleErrorMessage(action, "Can't create slide");
            })

            .addCase(deletePresentation.rejected, (state, action) => {
                console.log(action.payload);
                handleErrorMessage(action, "Can't delete presentation");
            });
    },
});

export const {
    setSelectedSlide,
    editPresentationSlide,
    deletePresentationLocally,
    deletePresentationSlideLocally,
    addPresentationSlideLocally,
    addUserToBlackListLocally,
    removeUserFromBlackListLocally,
    setAllowedToEdit,
} = PresentationSlice.actions;

export default PresentationSlice.reducer;
