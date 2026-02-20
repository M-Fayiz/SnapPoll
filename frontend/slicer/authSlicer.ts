import { authService } from "@/services/auth.service"
import { createSlice ,createAsyncThunk} from "@reduxjs/toolkit"




export const loginUser = createAsyncThunk(
    "auth/check",
    async()=>{
        const res = await authService.getMe()
        return res

    }
)

const initialState={
   
    user:{
        name:'',
        email :""
    },
    loading:false
}

const userSlicer = createSlice({
    name:'users',
    initialState,
    reducers:{
        logOut:(state)=>{
            state.user={name:'',email:''}
        }
    },
    extraReducers:(builder)=>{
        builder
            .addCase(loginUser.pending,(state)=>{
                state.loading=true
            })
            .addCase(loginUser.fulfilled,(state)=>{
                state.loading = false
            })
    }

}) 

export default userSlicer.reducer