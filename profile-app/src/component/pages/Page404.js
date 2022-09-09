import React from 'react'
import {Link} from 'react-router-dom';

const Page404 = () => {
    return (
        <div style={{width:"510px", height:"335px", display:"flex", alignItems: "center", justifyContents:"center", backgroundColor:"green", margin:"auto", marginTop:"5em", borderRadius:"10px"}}>
            <div style={{width:"500px", paddingBottom:"1em", backgroundColor:"gray", border:'transparent', textAlign:"center", margin:"auto", alignItems: "center", borderRadius:"10px"}} >
                <h1 style={{padding:"2.5em"}} >PAGE DOES NOT EXIST</h1>
                <Link to="/home"><b>Home</b></Link>
            </div>
        </div>
    )
}

export default Page404