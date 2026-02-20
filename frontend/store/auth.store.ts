import {configureStore} from'@reduxjs/toolkit'
import userReducer from '../slicer/authSlicer'

export const store = configureStore({
    reducer:{
        user:userReducer
    }
})