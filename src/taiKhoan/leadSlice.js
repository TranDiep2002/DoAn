import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'



export const getLeadsContent = createAsyncThunk('/leads/content', async () => {
	const response = await axios.get('/api/users?page=2', {})
	return response.data;
})

export const leadsSlice = createSlice({
    name: 'leads',
    initialState: {
        isLoading: false,
        leads: [],
        currentEditId: null // Khởi tạo currentEditId
    },
    reducers: {
        addNewLead: (state, action) => {
            let {newLeadObj} = action.payload
            state.leads = [...state.leads, newLeadObj]
        },
        setCurrentEditId: (state, action) => {
            state.currentEditId = action.payload;
        },

    },

    extraReducers: {
		// [getLeadsContent.pending]: state => {
		// 	state.isLoading = true
		// },
		// [getLeadsContent.fulfilled]: (state, action) => {
		// 	state.leads = action.payload.data
		// 	state.isLoading = false
		// },
		// [getLeadsContent.rejected]: state => {
		// 	state.isLoading = false
		// },
        setCurrentEditId: (state, action) => { // Thêm reducer này
            state.currentEditId = action.payload;
        }
    }
})

export const { addNewLead,setCurrentEditId } = leadsSlice.actions

export default leadsSlice.reducer