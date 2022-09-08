import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import getFilterTransactions from "./filterAPI";

const initialState={
    filterTransactions:[],
    isLoading:false,
    isError:false,
    editForm:false,
    error:'',
    type:'',
    search:'',
    page:1,

};

export const fetchFilterTransactions=createAsyncThunk('filter/fetchFilterTransactions',async({type,search,page})=>{
    const transactions=await getFilterTransactions(type,search,page);
    return transactions;
})

const filterTransactionsSlice=createSlice({
    name:'filter',
    initialState,
    reducers:{
        addFilters:(state,action)=>{
            state.type=action.payload.type;
            state.search=action.payload.search;
        },
        setPage:(state,action)=>{
            state.page=action.payload;
        },
        transactionUpdate:(state,action)=>{
            const indexToUpdate=state.filterTransactions.findIndex(t=>t.id===action.payload.id);
            state.filterTransactions[indexToUpdate]=action.payload.data;
        },
        transactionRemove:(state,action)=>{
            state.filterTransactions=state.filterTransactions.filter((t)=>t.id!==action.payload);
            
        },
        setEditForm:(state,action)=>{
            state.editForm=action.payload;
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchFilterTransactions.pending,(state,action)=>{
            state.isLoading=true;
            state.isError=false;
        })
        .addCase(fetchFilterTransactions.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.filterTransactions=action.payload;
        })
        .addCase(fetchFilterTransactions.rejected,(state,action)=>{
            state.filterTransactions=[];
            state.isError=true;
            state.error=action.error.message;
        })
    }
})

export default filterTransactionsSlice.reducer;
export const { addFilters ,setPage,transactionUpdate,transactionRemove,setEditForm} =filterTransactionsSlice.actions;