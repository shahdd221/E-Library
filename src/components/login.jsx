import { useState } from 'react';
import {Link} from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";


function Login() {
    
    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");

   const handleLogin = async (e) => {
    e.preventDefault();
    try { 
    await signInWithEmailAndPassword(auth, email, password);
    const user = auth.currentUser;
    console.log(user);
    alert("USER LOGGED IN SUCCESSFULLY!");
  }
   catch (error) {
    alert("INVALID INFORMATION!");
    }
  };

      return (
        <>
            <div className=" d-flex justify-content-center align-items-center min-vh-100 mx-4">

                <div className="col-md-4 p-3 form  border rounded-4  shadow">
                    <div className="col-md-12">
                        <div className='text-center my-5'>
                            <span className=' icon-circle  p-4 pb-3  '><i className='fa-solid fa-graduation-cap fa-2x brown'></i></span>
                            <h3 className="darkorange fw-bolder px-4 mt-5">Welcome Back </h3>
                            <p className=" px-4">Access your digital collection and resources</p>
                        </div>
                        <form onSubmit={handleLogin} className="row g-3 mb-4 px-4 ">

                            <div className="col-md-12 mb-3">
                                <label htmlFor="Email" className="form-label ">Institutional Email </label>
                                <input type="email" className="form-control" id="Email" placeholder="12345@std.edu.eg" required value={email} onChange={(e)=> setEmail(e.target.value)} />
                            </div>
                            <div className="col-md-12 mb-4 text-end">
                                <label htmlFor="password" className="form-label w-100 text-start ">Password</label>
                                <input type="password" className="form-control" id="password" placeholder="******" required value={password} onChange={(e)=> setPassword(e.target.value)} />

                                <Link to='/forgetPassword' className="border-0 bg-transparent fa-xs mt-4 brown">Forgot password?</Link>

                            </div>

                            <div className="col-12 mx-auto">
                                <button className="p-2 py-3 rounded-4  border-0 mb-2 text-nowrap text-white fw-bold bh1 w-100 bg-brown">Sign In to Library</button>
                            </div>
                        </form>
                        <div className='border-top m-4 p-3 text-center'>New to the library? <Link to="/create-account" className='text-decoration-none fw-bold brown'>Create an account</Link></div>
                    </div>
                </div>
            </div>


        </>
    );
}

export default Login;