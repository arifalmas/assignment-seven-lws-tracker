import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Balance from '../components/Balance';
import Form from '../components/Form';
import Pagination from '../components/Pagination';
import Transactions from '../components/Transactions';
import { fetchTransactions } from '../features/transactions/transactionsSlice';

const AllTransactions = () => {

    const {filterTransactions,isLoading,isError,error,type,search,editForm}=useSelector(state=>state.filter);
    const dispatch=useDispatch();

    useEffect(()=>{
        dispatch(fetchTransactions({type,search}));
    },[dispatch,type,search]);
    console.log(editForm);

    return (
        <>
            
            <Balance/>
           { editForm && <Form/>}
            <Transactions transactions={filterTransactions} isLoading={isLoading} isError={isError} error={error} />
            <Pagination/>
        </>
    );
};

export default AllTransactions;