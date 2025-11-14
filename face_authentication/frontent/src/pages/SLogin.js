import React, {useState} from "react";
import './SLogin.css';
export default function Slogin() {
    const [isLogin , setIsLogin] = useState(true);
    return(
        
        <div className='main_container'>
            <div className="container">
            <div className='form-container'>
                <div className='form-toggle'>
                    <button className={isLogin ? 'active' : ""}
                     onClick={()=>setIsLogin(true)}>Login</button>

                    <button className={!isLogin ? 'active' : ""}
                     onClick={()=>setIsLogin(false)}>SignUp</button>
                </div>
                {isLogin ? <>
                <div className='Loginform'>
                    <h2>Student Login</h2>
                    <input type="email" placeholder="Email"/>
                    <input type="password" placeholder="Password"/>
                    <a href='#'>Forgot Password?</a>
                    <button>Login</button>
                    <p>Not a Member?<a href='#' onClick={()=>setIsLogin(false)}>SignUp Now</a></p>
                </div>
                </> : <>
                    <div class='Loginform'>
                    <h2>SignUp</h2>
                    <input type="text" placeholder="Full Name"/>
                    <input type="text" placeholder="Roll No"/>
                    <input type="text" placeholder="Semester"/>
                    <input type="email" placeholder="Email"/>
                    <input type="password" placeholder="Password"/>
                    <input type="password" placeholder="Confirm Password"/>

                    <button>SignUp</button>
                    </div>
                </> }
            </div>
            </div>
        </div>
    )
}

