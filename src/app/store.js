import { configureStore } from '@reduxjs/toolkit';
import transactionReducer from '../features/transactions/transactionsSlice';
import filterReducer from '../features/filter/filterTransactions'

export const store = configureStore({
  reducer: {
    transaction: transactionReducer,
    filter:filterReducer,
  },
});
