import '../../css/home.css'
import React, {useEffect, useState} from 'react';
import userIcon from '../../image/user_icon.png';
import {dispatchLogin, dispatchNotLogin, dispatchNot_Watch, dispatchUnEdit, dispatchAccess, dispatchDelete_User, dispatchDelete_Token} from '../../redux/actions/authAction';
import {useSelector, useDispatch} from 'react-redux';
import {useLocation, useNavigate} from 'react-router-dom';
import axios from 'axios';

const Home = () => {
    const [alternate, setAlternate] = useState(true)
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = useSelector(state => state.token)

    useEffect(()=>{
        if(location.pathname === "/home"){
            alternate && setTimeout(timer1, 10000)
            !alternate && setTimeout(timer2, 10000)
            }
        // eslint-disable-next-line
    }, [alternate, !alternate])

    const timer1 = () => {
        alternate && setAlternate(false)
};
    const timer2 = () => {
        !alternate && setAlternate(true)
}

    const handleClick = async(e) => {
        const {name} = e.target;
        try{
            if(name === "signup" || name === "login"){
                if(name === "login"){
                    dispatch(dispatchLogin())
                    navigate("/signuplogin")
                }else {
                    dispatch(dispatchNotLogin())
                    navigate("/signuplogin")
                }
            }
            else if(name === "profilepage"){
                dispatch(dispatchUnEdit())
                const res = await axios.post('/user/api/getuserprofile', {token})
                if(res.data.msg === "verified"){
                    dispatch(dispatchAccess())
                     navigate('/profilepage')
                }
            }
        }
        catch(err){
            if(err.response.data.msg === "Please login again"){
                dispatch(dispatchDelete_User())
                dispatch(dispatchLogin())
                dispatch(dispatchDelete_Token())
                dispatch(dispatchNot_Watch())
                navigate(`/signuplogin`)
           }
        }
        }

    return (
        <div className="homePage">
            <div className="home">
                <p className="Hwelcome">WELC <span className="Hwelcome2"> ME</span></p>
                <p  className="Hlogo"></p>
            </div>
            {alternate && <button style={{cursor:"pointer"}} onClick={handleClick} name="profilepage" className="profilebutton"><img style={{width:"20px", marginRight:"10px", paddingTop:'3px'}} src={userIcon} alt="icon"/>  Profile</button>}
            <section className="section">
                {!alternate ? (<div>
                    <p className="homeText">Don't have an account?<br/> Please Sign up</p>
                    <button style={{cursor:"pointer"}} onClick={handleClick} name="signup" className="signButton">Signup</button>
                    </div>
                )
                :   ( <div>
                    <button style={{cursor:"pointer"}} onClick={handleClick} name="login" className="loginButton">Login</button>
                    <p className="homeText2">Already have an account?<br/> Please Login</p>
                    </div>
                )
                    }
             </section>
        </div>
    )
}

export default Home