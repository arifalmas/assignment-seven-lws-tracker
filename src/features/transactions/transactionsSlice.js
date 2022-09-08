import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { addTransactions, deleteTransaction, editTransaction, getAllTransactions, getTransactions } from "./transactionsAPI"

const initialState={
    transactions:[],
    allTransactions:[],
    isLoading:false,
    editTransaction:{},
    isError:false,
    error:''
}

export const fetchTransactions=createAsyncThunk('transaction/fetchtransactions',async({type,search})=>{
    const transactions=await getTransactions(type,search);
    return transactions;
})

export const fetchAllTransactions=createAsyncThunk('transaction/fetchAlltransactions',async()=>{
    const transactions=await getAllTransactions();
    return transactions;
})

export const createTransaction=createAsyncThunk('transaction/createTransaction',async(data)=>{
    const transaction=await addTransactions(data);
    return transaction;
})

export const updateTransaction=createAsyncThunk('transaction/updateTransaction',async({id,data})=>{
    const transaction=await editTransaction(id,data);
    return transaction;
})

export const removeTransaction=createAsyncThunk('transaction/removeTransaction',async(id)=>{
    const transaction=await deleteTransaction(id);
    return transaction;
})

const transactionSlice=createSlice({
    name:'transactions',
    initialState,
    reducers:{
        editActive:(state,action)=>{
            state.editTransaction=action.payload;
        },
        editInActive:(state,action)=>{
            state.editTransaction={}
        },
        updateAllTransation:(state,action)=>{
            const indexToUpdate=state.allTransactions.findIndex(t=>t.id===action.payload.id);
            state.allTransactions[indexToUpdate]=action.payload.data;
            console.log(action.payload.data);
        },
        removeFromAllTransactions:(state,action)=>{
            state.allTransactions=state.allTransactions.filter((t)=>t.id!==action.payload);
        },
        addToAllTransactions:(state,action)=>{
            state.allTransactions.push(action.payload);
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchTransactions.pending,(state)=>{
            state.isError=false;
            state.isLoading=true;
        })
        .addCase(fetchTransactions.fulfilled,(state,action)=>{
            state.isError=false;
            state.isLoading=false;
            state.transactions=action.payload;
        })
        .addCase(fetchTransactions.rejected,(state,action)=>{
            state.isError=true;
            state.transactions=[];
            state.error=action.error.message;
        })
        .addCase(fetchAllTransactions.pending,(state)=>{
            state.isError=false;
            state.isLoading=true;
        })
        .addCase(fetchAllTransactions.fulfilled,(state,action)=>{
            state.isError=false;
            state.isLoading=false;
            state.allTransactions=action.payload;
        })
        .addCase(fetchAllTransactions.rejected,(state,action)=>{
            state.isError=true;
            state.allTransactions=[];
            state.error=action.error.message;
        })
        .addCase(createTransaction.pending,(state)=>{
            state.isError=false;
            state.isLoading=true;
        })
        .addCase(createTransaction.fulfilled,(state,action)=>{
            state.isError=false;
            state.isLoading=false;
            state.transactions.push(action.payload);
        })
        .addCase(createTransaction.rejected,(state,action)=>{
            state.isError=true;
            state.transactions=[];
            state.error=action.error.message;
        })
        .addCase(updateTransaction.pending,(state)=>{
            state.isError=false;
            state.isLoading=true;
        })
        .addCase(updateTransaction.fulfilled,(state,action)=>{
            state.isError=false;
            state.isLoading=false;
            const indexToUpdate=state.transactions.findIndex(t=>t.id===action.payload.id);
            state.transactions[indexToUpdate]=action.payload;
            
        })
        .addCase(updateTransaction.rejected,(state,action)=>{
            state.isError=true;
            state.error=action.error.message;
        })
        .addCase(removeTransaction.pending,(state)=>{
            state.isError=false;
            state.isLoading=true;
        })
        .addCase(removeTransaction.fulfilled,(state,action)=>{
            state.isError=false;
            state.isLoading=false;
            state.transactions=state.transactions.filter((t)=>t.id!==action.meta.arg);
        })
        .addCase(removeTransaction.rejected,(state,action)=>{
            state.isError=true;
            state.error=action.error.message;
        })
    }
})

export default transactionSlice.reducer;
export const {editActive,editInActive,updateAllTransation,removeFromAllTransactions,addToAllTransactions}=transactionSlice.actions;