import React, { useEffect, useState } from 'react';
import { DebounceInput } from 'react-debounce-input';
import { useDispatch, useSelector } from 'react-redux';
import { addFilters, fetchFilterTransactions, setPage } from '../features/filter/filterTransactions';

const FilterOptions = () => {

    const dispatch=useDispatch();
    const {page}=useSelector(state=>state.filter);

    const[input,setInput]=useState({
        search:'',
        type:''
    })

    useEffect(()=>{
        dispatch(fetchFilterTransactions({type:input.type,search:input.search,page}));
        dispatch(addFilters({type:input.type,search:input.search}));
    },[dispatch,input.search,input.type,page])

    
    // const handleReset=()=>{
    //     setInput({
    //         search:'',
    //         type:''
    //     })
    // }

    const handleChange=(e)=>{
        const newInput={...input};
        newInput[e.target.name]=e.target.value;
        setInput(newInput);
        dispatch(setPage(1));
    }

    return (
        <div className='filter_options'>
            <div >
                <DebounceInput debounceTimeout={400} value={input.search} className='search' name='search' type="search" onChange={handleChange} placeholder='Search'/>
            </div>
            <div style={{marginLeft:'10px'}} className="form-group radio">
                    
                    <div className="radio_group">
                        <input
                            type="radio"
                            value="income"
                            name="type"
                            onChange={handleChange}
                            required
                        />
                        <label>Income</label>
                    </div>
                    <div className="radio_group">
                        <input
                            type="radio"
                            value="expense"
                            name="type"
                            onChange={handleChange}
                            required
                        />
                        <label>Expense</label>
                    </div>
                    {/* <div>
                        <button className='reset' onClick={handleReset}>Reset</button>
                    </div> */}
                </div>
        </div>
    );
};

export default FilterOptions;