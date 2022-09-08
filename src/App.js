import React from 'react';
import Layout from './components/Layout';
import '../src/css/style.css'
import Home from './pages/Home';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import AllTransactions from './pages/AllTransactions';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/transactions' element={<AllTransactions/>}/>
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
