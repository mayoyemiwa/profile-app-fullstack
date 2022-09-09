import './resources.css';
import userLogo from './image/user_icon.png';
import emailLogo from './image/email_icon.png';
import pwdLogo from './image/lock_password_icon.png'
import {useState} from 'react';
import {useSelector} from 'react-redux'



export const LabelInput = ({name, type, logo, holder, value, handleChange, handleOnBlur, boolean, regex, handleFocus }) => {

    return(
        <div >
            <div style={{height:"30px", justifyItems:"center", marginBottom:`8px`, display:"inline-flex"}} >
                <label className="label" htmlFor="name"><img className="img1" src={logo} alt=""/></label>
                <input className="p_input" onChange={(e)=>handleChange(e)} onBlur={(e)=>handleOnBlur(e)} onFocus={handleFocus} pattern={regex} required focused={ boolean.toString()} type={type} value={value} name={name} placeholder={holder}/>
            </div>
        </div>
    )
}
export const LabelInput2 = (props) => {
    const [focused, setFocused] = useState(false)
    const {size, logo, value, handleOnChange, setError, errMessage, inputName, show, users, inputType, ...inputProps} = props;

    const handleBlur = (e) => {
        setError(false)
        setFocused(true)
    }
    const handleFocus = (e) => {
        setError(false)
        setFocused(false)
    }

    return(
        <div className="myInput">
            <div style={{height:"30px", justifyItems:"center", marginBottom:`${size}`, display:"inline-flex"}} >
                <label className="label" htmlFor="name"><img className="img1" src={logo} alt=""/></label>
                <input onChange={(e)=>handleOnChange(e)} onFocus={(e)=>handleFocus(e)} onBlur={(e)=>handleBlur(e)} focused={focused.toString()} 
                       value={value} {...inputProps} 
                       type={!show ? inputType : (show && inputName === "pwd")  ? "text" : inputType }
                       />
                <p style={{position:"absolute", width:"330px", marginTop:"30px", marginLeft:"-10px"}} className="myP">{errMessage}</p>
            </div>
        </div>
    )
}


export const Button = ({style, logo, label, handleClick}) => {
    
    
    return <div style={style}>
        <div className="customButton">
            <label onClick={(e)=>handleClick(e)} className="customLabel">{label}</label>
            <img className="img" src={logo} alt="logo"/>
        </div>
    </div>
}

export const Profile = ({logo, boolean, imagePreview, defaultImg, handleValidate}) => {
    const auth = useSelector(state => state.auth.user)
    return(
        <div style={{position:"relative", marginBottom:"1em"}} >
            <div className="profile">
                {boolean && <div style={{width:"30px", height:"30px", borderRadius:"15px", backgroundColor:"white", position:"absolute", right:"-6px", bottom:"10px", cursor:"pointer"}}>
                    <label htmlFor="upload-image"><img className="img2" src={logo} alt=""/></label>
                </div>}
                <input type="file" onChange={(e)=>handleValidate(e)} id="upload-image" accept="/image.png /image.jpg" style={{display:"none"}}/>
                <img style={{width:"120px", height:"120px", borderRadius:"60px", position:"absolute", left:"0px"}} src={imagePreview ? imagePreview : auth.picture ? auth.picture :  defaultImg} alt=""/>
            </div>
        </div>
    )
}

const countries =["Afghanistan", "Åland Islands", "Albania", "Algeria", "American Samoa", "Andorra", "Angola",
"Anguilla",
"Antarctica",
"Antigua and Barbuda",
"Argentina",
"Armenia",
"Aruba",
"Australia",
"Austria",
"Azerbaijan",
"Bahamas",
"Bahrain",
"Bangladesh",
"Barbados",
"Belarus",
"Belgium",
"Belize",
"Benin",
"Bermuda",
"Bhutan",
"Bolivia",
"Bosnia and Herzegovina", 
"Botswana",
"Bouvet Island",
"Brazil",
"British Indian Ocean Territory",
"Brunei Darussalam", 
"Bulgaria",
"Burkina Faso",
"Burundi",
"Cambodia",
"Cameroon",
"Canada",
"Cape Verde",
"Cayman Islands",
"Central African Republic",
"Chad",           
"Chile",   
"China",   
"Christmas Island",
"Cocos (Keeling) Islands",
"Colombia",
"Comoros",
"Congo",
"Congo, The Democratic Republic of The",
"Cook Islands",
"Costa Rica",
"Cote D'ivoire",
"Croatia",
"Cuba",
"Cyprus",
"Czech Republic",
"Denmark",
"Djibouti",
"Dominica",
"Dominican Republic",
"Ecuador",
"Egypt",
"El Salvador",
"Equatorial Guinea",
"Eritrea",
"Estonia",
"Ethiopia",
"Falkland Islands (Malvinas)",
"Faroe Islands",
"Fiji",
"Finland",
"France",
"French Guiana",
"French Polynesia",
"French Southern Territories",
"Gabon",
"Gambia",
"Georgia",
"Germany",
"Ghana",
"Gibraltar",
"Greece",
"Greenland",
"Grenada",
"Guadeloupe",
"Guam",
"Guatemala",
"Guernsey",
"Guinea",
"Guinea-bissau",
"Guyana",
"Haiti",
"Heard Island and Mcdonald Islands",
"Holy See (Vatican City State)",
"Honduras",
"Hong Kong",
"Hungary",
"Iceland",
"India",
"Indonesia",
"Iran, Islamic Republic of Iraq",
"Iraq",
"Ireland",
"Isle of Man",
"Israel",
"Italy",
"Jamaica",
"Japan",
"Jersey",
"Jordan",
"Kazakhstan",
"Kenya",
"Kiribati",
"Korea, Democratic People's Republic of Korea",
"Kuwait",
"Kyrgyzstan",
"Lao People's Democratic Republic Lao",
"Latvia",
"Lebanon",
"Lesotho",
"Liberia",
"Libyan Arab Jamahiriya",
"Liechtenstein",
"Lithuania",
"Luxembourg",
"Macao",
"Macedonia, The Former Yugoslav Republic of",
"Madagascar",
"Malawi",
"Malaysia",
"Maldives",
"Mali",
"Malta",
"Marshall Islands",
"Martinique",
"Mauritania",
"Mauritius",
"Mayotte",
"Mexico",
"Micronesia, Federated States of",
"Moldova, Republic of",
"Monaco",
"Mongolia",
"Montenegro",
"Montserrat",
"Morocco",
"Mozambique",
"Myanmar",
"Namibia",
"Nauru",
"Nepal",
"Netherlands",
"Netherlands Antilles",
"New Caledonia",
"New Zealand",
"Nicaragua",
"Niger",
"Nigeria",
"Niue",
"Norfolk Island",
"Northern Mariana Islands",
"Norway",
"Oman",
"Pakistan",
"Palau",
"Palestinian Territory, Occupied",
"Panama",
"Papua New Guinea",
"Paraguay",
"Peru",
"Philippines",
"Pitcairn",
"Poland",
"Portugal",
"Puerto Rico",
"Qatar",
"Reunion",
"Romania",
"Russian Federation",
"Rwanda",
"Saint Helena",
"Saint Kitts and Nevis",
"Saint Lucia",
"Saint Pierre and Miquelon",
"Saint Vincent and The Grenadines",
"Samoa",
"San Marino",
"Sao Tome and Principe",
"Saudi Arabia",
"Senegal",
"Serbia",
"Seychelles",
"Sierra Leone",
"Singapore",
"Slovakia",
"Slovenia",
"Solomon Islands",
"Somalia",
"South Africa",
"South Georgia and The South Sandwich Islands",
"Spain",
"Sri Lanka",
"Sudan",
"Suriname",
"Svalbard and Jan Mayen",
"Swaziland",
"Sweden",
"Switzerland",
"Syrian Arab Republic",
"Taiwan",
"Tajikistan",
"Tanzania, United Republic of",
"Thailand",
"Timor-leste",
"Togo",
"Tokelau",
"Tonga",
"Trinidad and Tobago",
"Tunisia",
"Turkey",
"Turkmenistan",
"Turks and Caicos Islands",
"Tuvalu",
"Uganda",
"Ukraine",
"United Arab Emirates",
"United Kingdom",
"United States",
"United States Minor Outlying Islands",
"Uruguay",
"Uzbekistan",
"Vanuatu",
"Venezuela",
"Viet Nam",
"Virgin Islands, British",
"Virgin Islands, U.S.",
"Wallis and Futuna",
"Western Sahara",
"Yemen",
"Zambia",
"Zimbabwe",
]


export const Inputs = (users) => {
    const inputs = [
        {
            id:1,
            name:"name",
            type:"text",
            label:"Name",
            placeholder:"Name",
            errMessage:"Name should be 3-16 characters and shouldn't include any special characters",
            pattern:"^[A-Za-z0-9]{3,16}$",
            logo:userLogo,
            required:true
        },
        {
            id:2,
            name:"email",
            type:"email",
            label:"Emal",
            placeholder:"Email",
            errMessage:"It should be valid email address!",
            logo:emailLogo,
            required:true
        },
        {
            id:3,
            name:"pwd",
            type:"password",
            label:"Password",
            placeholder:"Password",
            errMessage:"Password should be 8-20 characters and should include at least a Uppercase letter, a Lowecase letter, a number and a Special character!",
            pattern:"((?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[~!@#$%^&*()]).{8,20})",
            logo:pwdLogo,
            required:true
        },
        {
            id:4,
            name:"confirm_password",
            type:"password",
            label:"Confirm Password",
            placeholder:"Confirm Password",
            errMessage:"Password don't match!",
            pattern:users.pwd,
            logo:pwdLogo,
            required:true
        }
    ]
    const inputs2 = [
            {
                id:1,
                name:"email",
                type:"email",
                label:"Emal",
                placeholder:"Email",
                errMessage:"It should be valid email address!",
                logo:emailLogo,
                required:true
            },
            {
                id:2,
                name:"pwd",
                type:"password",
                label:"Password",
                placeholder:"Password",
                errMessage:"Should include M, m, 1, @",
                pattern:"((?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[~!@#$%^&*()]).{8,20})",
                logo:pwdLogo,
                required:true
            }
        ]
    return [inputs, inputs2]
}
export const countryOptions = countries.map((country)=>{
    return <option key={country} style={{width:"200px", display:"inline-block"}} name={country} value={country}>{country}</option>
})

export const HandleErrorPage = ({message, color, error}) =>{
    let size;
    error ? size = "50px" : size = "200px";
    return(
        <div style={{margin:"auto", border:"2px solid blue", borderRadius:"10px", width:"500px", marginTop:size}}>
            <div style={{color:color, fontWeight:"bold", margin:"1em"}} >{message}</div>
        </div>
    )
}