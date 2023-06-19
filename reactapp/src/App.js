import './App.css';
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Dashboard from './components/admin/Dashboard';
import AddLoan from "./components/user/AddLoan";
import ViewLoan from './components/user/ViewLoan';
import ViewProfile from './components/user/ViewProfile';
import ApplySuccess from './components/user/ApplySuccess';
import AddDocument from './components/user/AddDocument';
import LoanDetails from './components/admin/LoanDetails';
import Accepted from './components/admin/Accepted';
import Rejected from './components/admin/Rejected';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path='/' element={< Login />}></Route>
          <Route path='/Signup' element={< Signup />}></Route>
          <Route path='user/AddLoan' element={< AddLoan />}></Route>
          <Route path='user/ViewLoan' element={< ViewLoan />}></Route>
          <Route path='user/ViewProfile' element={< ViewProfile />}></Route>
          <Route path='user/ApplySuccess' element={< ApplySuccess />}></Route>
          <Route path='user/AddDocument' element={< AddDocument />}></Route>

          
          <Route path='admin/getAllLoans' element={< Dashboard />}></Route>
          <Route path='admin/loanDetails' element={< LoanDetails />}></Route>
          <Route path='admin/Accepted' element={< Accepted />}></Route>
          <Route path='admin/Rejected' element={< Rejected />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;