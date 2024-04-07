import './App.css';
import Login from './pages/Login';
import RegisterPage from './pages/RegisterPage';
import { Routes, Route } from 'react-router-dom';
import { UsersList } from './pages/UsersList';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<RegisterPage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/users-list' element={<UsersList />} />
      </Routes>
    </div>
  );
}

export default App;
