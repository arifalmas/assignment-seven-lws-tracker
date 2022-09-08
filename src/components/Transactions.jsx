import React from 'react';
import TransActionItem from './TransActionItem';
import loagingImg from '../assets/images/giphy.webp'
import FilterOptions from './FilterOptions';

const Transactions = ({transactions,isLoading,isError,error}) => {

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
        content=transactions.map(transaction=><TransActionItem key={transaction.id} transaction={transaction}/>)
    }

    console.log(transactions);

    return (
        <>
            <p className="second_heading">Your Transactions:</p>
                <FilterOptions/>
            <div className="conatiner_of_list_of_transactions">
                <ul>
                    {content}
                </ul>
            </div>
        </>
    );
};

export default Transactions;