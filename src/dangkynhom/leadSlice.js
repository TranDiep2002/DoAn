import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit'
import axios from 'axios'



// export const getLeadsContent = createAsyncThunk('/leads/content', async () => {
// 	const response = await axios.get('/api/users?page=2', {})
// 	return response.data;
// })
export const getLeadsContent = createAsyncThunk('/app/dssinhvien', async () => {
	const response = await axios.get('/api/getallSinhVien', {})
	return response.data;
})


export const leadsSlice = createSlice({
    name: 'leads',
    initialState: {
        isLoading: false,
        leads: [],
        currentEditMoTaDeTai: null, // Khởi tạo currentEditId
        currentEditTenDeTai:null
    },
    reducers: {
        addNewLead: (state, action) => {
            let {newLeadObj} = action.payload
            state.leads = [...state.leads, newLeadObj]
        },
        setCurrentEditMoTaDeTai: (state, action) => {
            state.setCurrentEditMoTaDeTai = action.payload;
        },
        
        setCurrentEditTenDeTai:(state,action)=>{
            state.setCurrentEditTenDeTai= action.payload;
        }
        

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
        setCurrentEditMoTaDeTai: (state, action) => { // Thêm reducer này
            state.currentEditMoTaDeTai = action.payload;
        },
        setCurrentEditTenDeTai:(state,action)=>{
            state.currentEditTenDeTai= action.payload;
        }
    }
})

export const { addNewLead,setCurrentEditMoTaDeTai , setCurrentEditTenDeTai} = leadsSlice.actions

export default leadsSlice.reducer