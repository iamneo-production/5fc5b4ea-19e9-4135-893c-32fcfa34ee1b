import './App.css';
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import AddLoan from "./components/user/AddLoan";
import ViewLoan from './components/user/ViewLoan';
import ViewProfile from './components/user/ViewProfile';
import Review from './components/user/Review';
import ApplySuccess from './components/user/ApplySuccess';
import LoanDetails from './components/admin/LoanDetails';
import GetReviews from './components/admin/GetReviews';
import GetLoans from './components/admin/GetLoans';
import {BrowserRouter as Router,Routes, Route} from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path='/' element={< Login/>}></Route>
          <Route path='/Signup' element={< Signup />}></Route>
          <Route path='user/AddLoan' element={< AddLoan />}></Route>
          <Route path='user/ViewLoan' element={< ViewLoan />}></Route>
          <Route path='user/ViewProfile' element={< ViewProfile />}></Route>
          <Route path='user/Review' element={< Review />}></Route>
        
          <Route path='user/ApplySuccess' element={< ApplySuccess />}></Route>
          
          <Route path='admin/GetReviews' element={ < GetReviews/>}></Route>
          <Route path='admin/GetLoans' element={< GetLoans />}></Route>
          <Route path='admin/LoanDetails' element={< LoanDetails />}></Route>
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;