import axios from '../../utils/axios.js'

const getFilterTransactions=async(type,search,page)=>{

    let query='';
    if(type!==''){
        query=`type=${type}`
    }
    if(search!==''){
        query+=`&q=${search}`
    }

    const response=await axios.get(`transactions?${query}&_page=${page}&_limit=10`);
    return response.data;
}


export default getFilterTransactions;