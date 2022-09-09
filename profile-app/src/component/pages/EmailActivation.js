import {useState, useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import {dispatchLogin} from '../../redux/actions/authAction'
import {HandleErrorPage} from '../../Resources';

const EmailActivation = () => {
    const [error, setError] = useState(false)
    const [errorMsg, setErrorMsg] = useState('');
    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const activate = async() => {
        setError(false)
        try{
            const result = await axios.post('/user/api/activation', {activation_token:params.activation_token})
            if(result.data.msg === "You've successfully signed in."){
                setTimeout(()=>{
                    navigate('/signuplogin')
                }, 5000)
                setErrorMsg(result.data.msg)
                dispatch(dispatchLogin())
                
            }
        }
        catch(err){
            if(err.response.data.msg.length > 0){
                setError(true)
                setErrorMsg(err.response.data.msg)
            }
        }
    }
    useEffect(()=>{
       activate()
        // eslint-disable-next-line
    }, [params.activation_token])
    
    return (
        <div style={{margin:"auto", textAlign:"center"}} >
            {error && <HandleErrorPage message={errorMsg} color="red"/>}
            {!error && <HandleErrorPage message={errorMsg} color="green"/>}
        </div>
    )
}
export default EmailActivation
