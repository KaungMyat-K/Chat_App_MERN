import { BrowserRouter,Routes,Route } from 'react-router-dom';
import './App.css';
import Home from './pages/home';
import Login from './pages/login';
import SignUp from './pages/signup';
import { Toaster } from 'react-hot-toast';
import { ProtectedRoute } from './components/protectedRoute';
import Loader from './components/loader';
import { useSelector } from 'react-redux';


function App() {
  const {loader} = useSelector(state => state.loaderSlice)
  return (
      <>
      <Toaster
          position="top-center"
          reverseOrder={false}
        />
        {loader && <Loader/>}
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<ProtectedRoute>
                                        <Home/>
                                      </ProtectedRoute>
                                    }></Route>
            <Route path='/login' element={<Login/>}></Route>
            <Route path='/signup' element={<SignUp/>}></Route>
          </Routes>
        </BrowserRouter>
      </>
  );
}

export default App;
