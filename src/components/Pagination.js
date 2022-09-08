import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPage } from '../features/filter/filterTransactions';

const Pagination = () => {

    const {page}=useSelector(state=>state.filter);
    const {transactions}=useSelector(state=>state.transaction);

    const dispatch=useDispatch();

    const limit=10;
    const pages= Math.ceil(transactions.length/limit);
    
    let content=[];

    const handlePage=(page)=>{
        dispatch(setPage(page));
    }

    for(let i=1;i<=pages;i++){
        content.push(<div onClick={()=>handlePage(i)} className={`${page===i && 'currentPage'} pagination_item`}>{i}</div>)
    }

    return (
        <div className='pagination'>
            {content}        

        </div>
    );
};

export default Pagination;