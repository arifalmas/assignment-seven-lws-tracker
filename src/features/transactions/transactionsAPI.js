import axios from '../../utils/axios.js'

export const getTransactions=async(type,search)=>{
    
    let query='';
    if(type!==''){
        query=`type=${type}`
    }
    if(search!==''){
        query+=`&q=${search}`
    }

    const response=await axios.get(`transactions?${query}`);
    return response.data;
}

export const getAllTransactions=async()=>{
    
    const response=await axios.get(`transactions`);
    return response.data;
}

export const addTransactions=async(data)=>{
    const response=await axios.post('transactions',data);
    return response.data;
}

export const editTransaction=async(id,data)=>{
    const response=await axios.put(`transactions/${id}`,data);
    return response.data;
}

export const deleteTransaction=async(id)=>{
    const response=await axios.delete(`transactions/${id}`);
    return response.data;
}