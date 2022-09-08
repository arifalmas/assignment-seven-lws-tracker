import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Balance from '../components/Balance';
import Form from '../components/Form';
import { fetchTransactions } from '../features/transactions/transactionsSlice';
import loagingImg from '../assets/images/giphy.webp'
import TransActionItem from '../components/TransActionItem';
import { Link } from 'react-router-dom';

const Home = () => {

    const {transactions,isLoading,isError,error}=useSelector(state=>state.transaction);
    
    const dispatch=useDispatch();

    useEffect(()=>{
        dispatch(fetchTransactions({type:'',search:''}));
    },[dispatch])

    const latestTransactions=[...transactions].reverse().slice(0,5);

    let content=null;

    if(isLoading){
        content=<img className='loading' src={loagingImg} alt="" />
    }
    if(isError){
        content=<p>{error}</p>
    }
    if(!isLoading && !isError && transactions.length===0 ){
        content=<p>Transaction not fount</p>
    }
    if(!isLoading && !isError && transactions.length>0 ){
        content=latestTransactions.map(transaction=><TransActionItem key={transaction.id} transaction={transaction}/>)
    }

    return (
        <>
            <Balance/>
            <Form/>
            <div className="conatiner_of_list_of_transactions">
                <ul>
                    {content}
                    
                </ul>
                <Link className='see_all_btn' to='/transactions'>See All</Link>
            </div>
        </>
    );
};

export default Home;