import React, {useState} from 'react';
import '../../css/profilePage.css';
import userLogo from '../../image/user_icon.png';
import ageLogo from '../../image/age.png';
import countryLogo from '../../image/country_icon.png';
import homeLogo from '../../image/home_icon.png';
import emailLogo from '../../image//email_icon.png';
import cameraLogo from '../../image/camera_icon.png';
import defaultImg from '../../image/mario.png';
import {Button, Profile, LabelInput, HandleErrorPage} from '../../Resources';
import {dispatchEdit, dispatchUnEdit, dispatchWatch, dispatchNot_Watch} from '../../redux/actions/authAction';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {countryOptions} from '../../Resources'
import axios from 'axios';


const ProfilePage = () => {
    //DEFAULT STATE
    const initialState = {
        name:"",
        email:"",
        changePwd:"",
        age:'',
        nationality:"Afghanistan",
        sex:"male",
        status:"single",
        picture:"https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png"
    }

    //INPUTS STATE
    const [users, setUsers] = useState(initialState)

    const [focused, setFocused] = useState(false)
    const [focused2, setFocused2] = useState(false)
    const [focused3, setFocused3] = useState(false)
    const [focused4, setFocused4] = useState(false)
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')
    const [successMsg, setSuccessMsg] = useState('')
    const [editPic, setEditPic] = useState(false)

    //IMAGE STATES
    const [image, setImage] = useState(null)
    const [imagePreview, setImagePreview] = useState(null)
    const [uploadingImg, setUploadingImg] = useState(false);

    //OTHERS
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth)
    const navigate = useNavigate();

    const handleOnBlur = (e) => {
        const {name} = e.target;
        name==="name" ? setFocused(true) : name==="age" ? setFocused2(true) : name==="changePwd" ? setFocused3(true) : setFocused4(true)
    }
    const handleFocus = (e) => {
        const {name} = e.target;
        name==="name" ? setFocused(false) : name==="age" ? setFocused2(false) : name==="changePwd" ? setFocused3(false) : setFocused4(false)
        }

    const handleChange = (e) => {
        const {name, value} = e.target;
        setUsers({...users, [name]:value})
    }

    const handleClick = (e) => {
        const {innerText} = e.target;
        if(innerText === "Profile") dispatch(dispatchUnEdit())
        else if(innerText === "Home") navigate('/home')
        else if(innerText === "Edit") dispatch(dispatchEdit())
    }
    const uploadImage = async() => {
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "testing-upload");
        try{
            setUploadingImg(true)
            const result = await fetch('https://api.cloudinary.com/v1_1/mayorlight/image/upload', {
                method:'post',
                body:data
            })
            const urlData = await result.json();
            setUploadingImg(false);
            return urlData.url
        }
        catch(err){
            setError(true)
            setUploadingImg(false);
            if(err.message === "Failed to fetch"){
                setErrorMsg("Failed to fetch: Please check NETWORK")
            }
        }
    }
    const handleSubmit = async(e) => {
        e.preventDefault();
        if(!image && auth.user.picture.length === 0) return alert("Please upload your profile-picture")
        setUploadingImg(true)
        dispatch(dispatchNot_Watch())
        let url = undefined;
        if(image && editPic){
            url = await uploadImage();
        }
        !users.nationality.length === 0 && setUsers({...users, nationality : "Afghanistan"})
        !users.status.length === 0 && setUsers({...users, status : "single"})
        !users.sex.length === 0 && setUsers({...users, nationality : "male"})
        let newUsers;
        if(url === undefined)  newUsers = {...users, picture:undefined}
        else if(url.length > 0) newUsers = {...users, picture:url}
        try{
            const result  = await axios.post('/user/api/profilepage', {users:newUsers})
            if(result.data.msg === 'MY PROFILE SUCCESSFULL FOR NOW'){
                dispatch(dispatchWatch())
                setSuccess(true)
                setError(false)
                dispatch(dispatchUnEdit())
                setUploadingImg(false)
                setSuccessMsg("PROFILE UPDATED SUCCESSFULLY")
            }
        }
        catch(err){
            setError(true)
            setSuccess(false)
            setErrorMsg(err.response.data.msg)
            if(err.response.data  === "Proxy error: Could not proxy request /user/api/profilepage from localhost:3000 to http://localhost:5000/ (ECONNRESET)."){
                setErrorMsg('This error can be due to network failure, please check your NETWORK CONNECTION')
            }
        }
    }
    const handleValidate = (e) => {
        setEditPic(true)
        const file = e.target.files[0]
        if(file.size >= 1024 * 1024) return alert("Your image maximum size should be 1mb ")
        setImage(file);
        setImagePreview(URL.createObjectURL(file))
    }
    //REGEXES
    const nameRegex = "^[A-Za-z0-9]{3,16}$";
    const ageRegex = "^[0-9]$";
    const pwdRegex = "((?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[~!@#$%^&*()]).{8,20})";
    const emailRegex = null; //BECAUSE INPUT-TYPE = EMAIL

    return (
        <div className={error ? "profilePage2" : (success) ? "profilePage2" : "profilePage"}>
            <Button style={{position:"absolute", left:"-160px", cursor:"pointer"}} logo={homeLogo} label="Home" handleClick={handleClick}/>
            {auth.edit && <Button style={{position:"absolute", right:"240px"}} logo={userLogo} label="Profile" handleClick={handleClick}/>}
            {success ? <HandleErrorPage message={successMsg} color='white'/> :
            error ? <HandleErrorPage message={errorMsg} color='white'/>
            :
            <section className="Psection">
                <div className="signup">
                    <p className="Slogo SlogoR"></p>
                    <p className="Swelcome">{auth.edit ? "EDIT PROFILE" : "MY PROFILE"}</p>

                    
                    {!auth.edit && <React.Fragment>
                        <Profile logo={cameraLogo} boolean={auth.edit} imagePreview='' defaultImg={auth.user.picture} handleValidate={handleValidate}/>
                        <div className="profile1">
                            <label>NAME : <b>{auth.user.name}</b></label>
                            <label>AGE : <b>{auth.user.age}</b></label>
                            <label>NATIONALITY : <b>{auth.user.nationality}</b></label>
                            <label>MARRIED : <b>{auth.user.status}</b></label>
                            <label>SEX : <b>{auth.user.sex}</b></label>
                            <label>EMAIL : <b>{auth.user.email}</b></label>
                            {/* <label>CHANGEPWD: <b style={{overflowX:"hidden"}}>{auth.user.changePwd}</b></label> */}
                        </div>
                        <button onClick={handleClick} label="edit" className="submitButton2">Edit</button>
                    </React.Fragment>}

                    <form className="signupForm" onSubmit={(e)=>handleSubmit(e)}>
                        {auth.edit && <Profile logo={cameraLogo} boolean={auth.edit} imagePreview={imagePreview} defaultImg={defaultImg} handleValidate={handleValidate}/>}
                        {auth.edit && <div className="profile1">
                            <LabelInput name="name" type="text" logo={userLogo} holder="Name" value={users.name} handleChange={handleChange} handleOnBlur={handleOnBlur} boolean={focused} regex={nameRegex} handleFocus={handleFocus}/>
                            <LabelInput name="age" type="number" logo={ageLogo} holder="Age" value={users.age} handleChange={handleChange} handleOnBlur={handleOnBlur} boolean={focused2} regex={ageRegex} handleFocus={handleFocus}/>
                            <LabelInput name="changePwd" type='text' logo={countryLogo} holder="Change_Password" value={users.changePwd} handleChange={handleChange} handleOnBlur={handleOnBlur} boolean={focused3} regex={pwdRegex} handleFocus={handleFocus}/>
                            <div style={{marginTop:"20px"}}>
                                <label style={{fontWeight:"bold"}}>COUNTRY:</label>
                                <select onChange={(e)=>handleChange(e)} name="nationality" style={{marginLeft:"15px", padding:'0px 10px', marginRight:"0px", marginBottom:"10px", backgroundColor:"transparent", border:"none", display:"block"}} id="nationality">
                                    {countryOptions}
                                </select>
                            </div>
                            <div>
                                <label style={{fontWeight:"bold"}}>STATUS:</label> <select onChange={(e)=>handleChange(e)} name="status"  style={{marginLeft:"190px", marginBottom:"10px", backgroundColor:"transparent", border:"none"}} id="status">
                                 <option name="status" value="single">single</option>
                                 <option name="status" value="married">married</option>
                             </select>
                            </div>
                            <div>
                                <label style={{fontWeight:"bold"}}>SEX: </label> <select name="sex" onChange={(e)=>handleChange(e)} style={{marginLeft:"220px", marginBottom:"10px", backgroundColor:"transparent", border:"none" }} id="sex">
                                 <option name="male" value="male">male</option>
                                 <option name="female" style={{marginBottom:"1em"}} value="female">female</option>
                             </select>
                            </div>
                             <LabelInput name="email" type="email" logo={emailLogo} holder="Email" value={users.email} handleChange={handleChange} handleOnBlur={handleOnBlur} boolean={focused4} regex={emailRegex} handleFocus={handleFocus}/>
                        </div>}
                        {auth.edit && <button className="submitButton">{uploadingImg ? 'Updating...' : 'SAVE'}</button>}
                    </form>
                </div>
             </section>}
        </div>
    )
}

export default ProfilePage