import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch ,useSelector} from 'react-redux';
import { fetchFilterTransactions, setEditForm, transactionUpdate } from '../features/filter/filterTransactions';
import { addToAllTransactions, createTransaction, editInActive, updateAllTransation, updateTransaction } from '../features/transactions/transactionsSlice';

const Form = () => {

    const[name,setName]=useState('');
    const[type,setType]=useState('');
    const[amount,setAmount]=useState('');
    const[editMode,setEditMode]=useState(false);

    const dispatch=useDispatch();
    const {editTransaction}=useSelector(state=>state.transaction);
    const{filter}=useSelector(state=>state);

    useEffect(()=>{
        if(editTransaction?.id){
            setEditMode(true);
            const{name,type,amount}=editTransaction
            setName(name)
            setType(type)
            setAmount(amount)
        }else{
            reset();
        }
    },[editTransaction])

    const handleCreate=(e)=>{
        e.preventDefault()
        dispatch(createTransaction({
            name,
            type,
            amount
        }))
        dispatch(addToAllTransactions({
            name,
            type,
            amount
        }));
        dispatch(fetchFilterTransactions({type:filter.type,search:filter.search,page:filter.page}))
        reset();
    }

    const handleUpdate=(e)=>{
        e.preventDefault();
        dispatch(updateTransaction({
            id:editTransaction.id,
            data:{
                name,
                type,
                amount
            }
        }))
        dispatch(transactionUpdate({
            id:editTransaction.id,
            data:{
                name,
                type,
                amount,
                id:editTransaction.id,
            }
        }))
        dispatch(updateAllTransation({
            id:editTransaction.id,
            data:{
                name,
                type,
                amount,
                id:editTransaction.id,
            }
        }))
        dispatch(editInActive());
        dispatch(setEditForm(false));
        reset();
        setEditMode(false)
    }

    const reset=()=>{
        setName('')
        setType('')
        setAmount('')
    }

    const handleCancleEdit=()=>{
        dispatch(editInActive());
        dispatch(setEditForm(false));
        reset();
        setEditMode(false)
    }

    return (
        <div className="form">
            <h3>{filter.editForm ? 'Update transaction': 'Add new transaction'}</h3>
            {/* Add new transaction</h3> */}

            <form onSubmit={editMode ? handleUpdate : handleCreate}>
                <div className="form-group">
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Enter Name"
                        onChange={e=>setName(e.target.value)}
                        value={name}
                        required
                    />
                </div>

                <div className="form-group radio">
                    <label>Type</label>
                    <div className="radio_group">
                        <input
                            type="radio"
                            value="income"
                            name="type"
                            checked={type==='income'}
                            onChange={e=>setType('income')}
                            required
                        />
                        <label>Income</label>
                    </div>
                    <div className="radio_group">
                        <input
                            type="radio"
                            value="expense"
                            name="type"
                            checked={type==='expense'}
                            onChange={e=>setType('expense')}
                            required
                        />
                        <label>Expense</label>
                    </div>
                </div>

                <div className="form-group">
                    <label>Amount</label>
                    <input
                        type="number"
                        placeholder="300"
                        name="amount"
                        onChange={e=>setAmount(e.target.value)}
                        value={amount}
                        required
                    />
                </div>

                <button className="btn" type='submit'>{editMode ? 'Update Transaction' : 'Add Transaction'}</button>
            </form>

            {editMode && <button onClick={handleCancleEdit} className="btn cancel_edit">Cancel Edit</button>}
        </div>
    );
};

export default Form;