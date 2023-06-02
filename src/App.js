import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MyLayout from './components/MyLayout';
import { UserProfile, UserDecentralization } from './containers/User';
import Customers from './containers/Customoers';
import { Dashboard } from './containers/Dashboard/Dashboard';
function App() {
    return (
        <Router>
            <MyLayout>
                <Routes>

                    {/* <Route path='/' element={<MyLayout/>} /> */}
                    {/* <Route path='/' element={<User/>} /> */}
                    <Route path='/dashboard' element={<Dashboard />} />
                    <Route path='/users/profile' element={<UserProfile />} />
                    <Route path='/users/decentralization' element={<UserDecentralization />} />
                    <Route path='/ustomers' element={<Customers />} />
                </Routes>
            </MyLayout>
        </Router>
    );
}

export default App;
