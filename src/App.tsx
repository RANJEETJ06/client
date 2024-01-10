import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Auth from "./pages/Auth";
import Login from "./pages/Login";
import Signup from './pages/Signup';
import Home from "./pages/Home";
import Transaction from './pages/Transaction';
import TransactionList from "./pages/TransactionList";
import Category from './pages/Category';
import CategoryList from "./pages/CategoryList";
import Budget from './pages/Budget';
import Profile from "./pages/Profile";

function App() {
  return (
    <div className="App">
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Auth/>} />
            <Route path="/Login"element={<Login/>}/>
            <Route path="/Signup"element={<Signup/>}/>
            <Route path="/:userId/Dashboard"element={<Home/>}/>
            <Route path="/:userId/Transctions"element={<TransactionList/>}/>
            <Route path="/:userId/:transactionId/Transction"element={<Transaction/>}/>
            <Route path="/:userId/:transactionId/Categories"element={<CategoryList/>}/>
            <Route path="/:userId/:transactionId/:categoryId"element={<Category/>}/>
            <Route path="/:userId/Budget"element={<Budget/>}/>
            <Route path="/:userId/Profile"element={<Profile/>}/>
          </Routes>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
