import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllTransactions } from '../features/transactions/transactionsSlice';

const Balance = () => {

    const {allTransactions}=useSelector(state=>state.transaction);
    const dispatch=useDispatch();

    useEffect(()=>{
        dispatch(fetchAllTransactions());
    },[dispatch])

    const calculateIncome=(transactions)=>{

        let income=0;

        transactions?.forEach(transaction=>{
            const{type,amount}=transaction;
            if(type==='income'){
                income+=Number(amount);
            }else{
                income-=Number(amount);
            }
        })
        return income;
    }

    return (
        <div className="top_card">
            <p>Your Current Balance</p>
            <h3>
                <span>৳</span>{" "}
                <span>{allTransactions.length>0 ? calculateIncome(allTransactions) : 0}</span>
            </h3>
        </div>
    );
};

export default Balance;