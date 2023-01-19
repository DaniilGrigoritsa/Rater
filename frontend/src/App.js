import './styles/App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Private from './utils/PrivateRoute'
import {AuthProvider} from './context/AuthContext'
import { useState, useEffect } from 'react';
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import OrderPage from "./pages/OrderPage";
import VotePage from "./pages/VotePage";
import ResultsPage from "./pages/ResultsPage";
import {getBalance} from "./scripts/getBalance";
import "./styles/style.css";


function App() {
  
  const [balance, setBalance] = useState(0); 
  const [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
  const [image0, setImage0] = useState(null);
  const [image1, setImage1] = useState(null);

  useEffect(() => {
    const loadBalance = async () => {
      const bal = await getBalance(authTokens);
      setBalance(bal.data.balance);
    } 
    loadBalance();
  }, [balance])

  console.log(authTokens)


  return (
    <div className="App">
        <Router>
            <AuthProvider authTokens={authTokens} setAuthTokens={setAuthTokens}>
                <Routes>
                    <Route element={<Private page={<VotePage />} />} path="/vote" exact/>
                    <Route element={<Private page={<OrderPage balance={balance} image0={image0} image1={image1}/>} />} path="/order" exact/>
                    <Route element={<Private page={<HomePage balance={balance} setImage0={setImage0} image0={image0} setImage1={setImage1} image1={image1} />} />} path="/" exact/>
                    <Route element={<Private page={<ResultsPage balance={balance} />} />} path="/results" exact/>
                    <Route element={<LoginPage />} path="/login"/>
                </Routes>
            </AuthProvider>
        </Router>
    </div>
  );
}

export default App;
