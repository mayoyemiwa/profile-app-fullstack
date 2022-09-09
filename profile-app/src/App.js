import {Route, BrowserRouter, Routes, Link} from 'react-router-dom'
import LandingPage from './component/pages/LandingPage'
import Home from './component/pages/Home'
import SignupLogin from './component/pages/SignupLogin';
import EmailActivation from './component/pages/EmailActivation';
import ProfilePage from './component/pages/ProfilePage';
import Page404 from './component/pages/Page404';
import {useSelector, useDispatch} from 'react-redux';
import {dispatchGet_User, fetchUser, dispatchLogin, dispatchNotLogin} from './redux/actions/authAction'
import axios from 'axios';
import {HandleErrorPage} from './Resources'
import {useEffect} from 'react'
import './App.css';


function App() {
  const dispatch = useDispatch();
  const  auth = useSelector(state => state.auth)
  const token = useSelector(state => state.token)

  useEffect(()=>{
    const myFirstLogin = localStorage.getItem('profileLogin')
    if(myFirstLogin && (auth.logged || auth.watch)){
      const getToken = async () => {
        const res = await axios.post('/user/api/refresh_token', null)
        dispatch({type:"GET_TOKEN", payload:res.data.access_token})
        
      }
      getToken()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.logged, auth.watch])

  useEffect(()=>{
    const myFirstLogin = localStorage.getItem('profileLogin')
    if(myFirstLogin && auth.logged && (token.length > 0 || auth.watch)){
      const getUser = (value) => {
        fetchUser(value).then((result)=>{
         dispatch(dispatchGet_User(result))
          })
        }
        getUser(token)
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.logged, dispatch, token.length > 0, auth.watch])

  const handleClick = (e) => {
    if(e.target.innerHTML === "LOGIN"){
      dispatch(dispatchLogin())
    }else dispatch(dispatchNotLogin())
  }

  const customError = () => {
    return(
      <div style={{textAlign:"center"}}>
          <div style={{color:"red"}}>Sorry the page you're trying to access is not available please <Link onClick={(e)=>handleClick(e)} to="/signuplogin">LOGIN</Link>. if you have already signed-in, you can <Link onClick={(e)=>handleClick(e)} to="/signuplogin">SIGNUP</Link></div>
      </div>
    )
  }

  return (
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route exact path="/" caseSentitive={false} element={<LandingPage/>}/>
            <Route exact path="/home" caseSentitive={false} element={<Home/>}/>
            <Route exact path="/signuplogin" caseSentitive={false} element={<SignupLogin/>}/>
            <Route exact path="/user/activate/:activation_token" caseSentitive={false} element={<EmailActivation/>}/>
            <Route exact path="/profilepage" caseSentitive={false} element={auth.access ? <ProfilePage/> : <HandleErrorPage message={customError()} color="red"/>}/>
            <Route exact path="*" caseSentitive={false} element={ <Page404/>}/>
          </Routes>
        </div>
      </BrowserRouter>
  );
}

export default App;
