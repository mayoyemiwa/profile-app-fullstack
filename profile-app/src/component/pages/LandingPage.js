import {useLocation, useNavigate} from 'react-router-dom'
import '../../css/landingPage.css'
import {useState} from 'react'

const LandingPage = () => {
    const [load, setLoad] = useState(false)
    window.addEventListener("load", ()=>{
        window.setTimeout(()=>{
            setLoad(false)
        }, 4000)
        setLoad(true)
      })

      const location = useLocation();
      const navigate = useNavigate()
      setTimeout(()=>{
        if(location.pathname === "/"){
           navigate("/home")
        }
      }, 10000)

    return (
        <div className="landingPage">
            <div className="landing">
                <p className={load ? "welcome welcomeC" : "welcome"}>WELC <span className={load ? "welcome2 welcomeC2" : "welcome2"}> ME</span></p>
                <p  className={load? "logo logoR" : "logo" }></p>
            </div>
            <div className="myText">
                <p className="text">SIGN<label style={{fontSize:"25px"}}>UP</label> <label style={{fontSize:"30px"}} >WITH YOUR UPLOADED PICTURE</label></p>
            </div>
            <div className={load ? "line lineR" : "line lineS"}>
                <p className="head1"></p>
                <p className="line1"></p>
                <p className="circle"></p>
                <p className="line2"></p>
                <p className="head2"></p>
            </div>
        </div>
    )
}

export default LandingPage
