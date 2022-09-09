import {useState} from 'react'
import '../../css/signup.css';
// import pwdLogo from '../../image/lock_password_icon.png'
import homeLogo from '../../image/home_icon.png'
import eye2Logo from '../../image/eye2_icon.png'
import hiddenLogo from '../../image/hidden_icon.png'
import {LabelInput2, Button, Inputs, HandleErrorPage} from '../../Resources';
import {useSelector, useDispatch} from 'react-redux';
import {dispatchLogged} from '../../redux/actions/authAction'
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

const SignupLogin = () => {
    //DEFAULT STATES
    const initialState = {
        name:"",
        email:"",
        pwd:"",
        confirm_password:"",
    }
    const initialState2 = {
        email:"",
        pwd:""
    }
    //INPUTS STATE
    const [users, setUsers] = useState(initialState)
    const [users2, setUsers2] = useState(initialState2)
    const [show, setShow] = useState(false)
    const [loginForm, setLoginForm] = useState(true)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    const navigate = useNavigate();

    const inputs =  Inputs(users)[0];
    const inputs2 = Inputs(users)[1];

    const handleOnChange = (e) => {
        const {name, value} = e.target;
        loginForm && setUsers2({...users2, [name]:value})
        setUsers({...users, [name]:value})
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        setError(false)
        if(e.target.children[8].innerHTML === "Login"){
            setLoginForm(false)
            try{
                setLoading(true)
                const result = await axios.post('/user/api/login', {users2})
                result && setLoading(false)
                if(result.status === 201) dispatch(dispatchLogged())
                localStorage.setItem('profileLogin', true)
                setLoading(false)
                navigate('/home', {replace:true})

            }
            catch(err){
                setError(true)
                if(err.response.data.msg === "Operation `users.findOne()` buffering timed out after 10000ms"){
                    setErrorMsg('This error can be due to network failure, please check your NETWORK CONNECTION')
                }else setErrorMsg(err.response.data.msg)
                setLoginForm(true)
                setLoading(false)
            }
        }else if(e.target.children[8].innerHTML === "Signup"){
            try{
                setLoginForm(false)
                setLoading(true)
                const result = await axios.post('/user/api/signup', {users})
                result && setLoading(false)
                result && alert(result.data.msg)
            }
            catch(err){
                setError(true)
                if(err.response.data === "Proxy error: Could not proxy request /user/api/signup from localhost:3000 to http://localhost:5000/ (ECONNRESET)."){
                    setErrorMsg('This error can be due to network failure, please check your NETWORK CONNECTION')
                } else setErrorMsg(err.response.data.msg)
                err && setLoading(false)
            }
        }
    }

    const handleClick = (e) => {
            navigate("/home")  
    }
    const showPassword = (e) => {
        !show ? setShow(true) : setShow(false)
    }
    
    return (
        <div className={error ? "signupPage2" : "signupPage"}>
            <Button style={{position:"absolute", left:"-160px", cursor:"pointer"}} logo={homeLogo} label="Home" handleClick={handleClick}/>
            {error && <HandleErrorPage message={errorMsg} color='red' error={error}/>}
            <section className="Ssection">
                <div className="signup">
                    <p className={!auth.login ? "Slogo SlogoR" : "Slogo"}></p>
                    <p className="Swelcome">WELCOME</p>
                    <form className="signupForm" onSubmit={(e)=>handleSubmit(e)}>
                        {
                            inputs.map((input)=> {
                            return (
                                <div key={input.id}>
                                    {!auth.login &&  <LabelInput2 setError={setError} inputType={input.type} inputName={input.name}  {...input} show={show} size={"30px"} value={users[input.name]}  handleOnChange={handleOnChange} users={users}/>}
                                </div>
                            )
                        })}
                        {
                            inputs2.map((input)=> {
                            return (
                                <div key={input.id}>
                                    {auth.login &&  <LabelInput2 setError={setError} inputType={input.type} inputName={input.name} {...input} show={show} size={"30px"} value={users2[input.name]}  handleOnChange={handleOnChange} users={users2}/>}
                                </div>
                            )
                            
                        })}
                        {show && <img style={{position:"relative", width:"22px", top:-21, right:-105}} src={eye2Logo} alt="eyeLogo"/>}
                        {!show && <img style={{position:"relative", width:"20px", top:-22, right:-107}} src={hiddenLogo} alt="hiddenLogo"/>}
                        <span style={{position:"relative", cursor:"pointer", color:"blue", fontSize:8, fontWeight:'bolder', top:-29.5, right:-107}} onClick={(e)=>showPassword(e)}>show password</span>
                        <button className="submitButton">{((auth.login || !auth.login) && loading) ? "Submitting Form" : auth.login ? "Login" : "Signup"}</button>
                    </form>
                </div>
             </section>
        </div>
    )
}

export default SignupLogin