import React from 'react';
import  editImg from '../assets/images/edit.svg'
import  deleteImg from '../assets/images/delete.svg'
import { useDispatch } from 'react-redux';
import { editActive, removeFromAllTransactions, removeTransaction } from '../features/transactions/transactionsSlice';
import { setEditForm, transactionRemove } from '../features/filter/filterTransactions';

const TransActionItem = ({transaction}) => {

    const dispatch=useDispatch();

    const handleRemove=()=>{
        dispatch(transactionRemove(transaction.id));
        dispatch(removeTransaction(transaction.id));
        dispatch(removeFromAllTransactions(transaction.id));
    }

    const handleEdit=()=>{
        dispatch(editActive(transaction));
        dispatch(setEditForm(true));
    }

    return (
        <>
            
            <li className={`transaction ${transaction.type==='income' ? 'income' : 'expense'}`}>
                <p>{transaction.name}</p>
                
                <div className="right">
                    <p>৳ {transaction.amount}</p>
                    <button className="link">
                        <img
                            className="icon"
                            src={editImg}
                            alt="edit"
                            onClick={handleEdit}
                        />
                    </button>
                    <button className="link">
                        <img
                            className="icon"
                            src={deleteImg}
                            alt="delete"
                            onClick={handleRemove}
                        />
                    </button>
                </div>
            </li> 

        </>
        
    );
};

export default TransActionItem;