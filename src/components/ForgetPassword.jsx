import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "./firebase";
import { useState } from 'react';
import {Link} from 'react-router-dom';


function ForgetPassword() {
    
    const [email , setEmail] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(email);
        try {
      await sendPasswordResetEmail(auth, email);
      alert("Reset link sent! Please check your email.");
        setEmail("");
    } catch (error) {
      console.log(error.code, error.message);

    
      if (error.code === "auth/user-not-found") {
        alert("This email address is not registered.");
      } else if (error.code === "auth/invalid-email") {
        alert("Please enter a valid email address.");
      } else if (error.code === "auth/too-many-requests") {
        alert("Too many attempts. Please try again later.");
      } else {
        alert("Something went wrong. Please try again.");
      }
    }

    }

    return (
        <>
            <div className=" d-flex justify-content-center align-items-center min-vh-100 mx-4">

                <div className="col-md-4 p-3 form  border rounded-4  shadow">
                    <div className="col-md-12">
                        <div className='text-center my-5'>
                            <h3 className="darkorange fw-bolder px-4 mt-5">Reset Your Password</h3>
                            <p className=" px-4">Enter your institutional email and we will send you a secure link to reset your account password.</p>
                        </div>
                        <form onSubmit={handleSubmit} className="row g-3 mb-4 px-4 ">

                            <div className="col-md-12 mb-3">
                                <label htmlFor="Email" className="form-label ">Institutional Email </label>
                                <input type="email" className="form-control" id="Email" placeholder="12345@std.edu.eg" required value={email} onChange={(e)=> setEmail(e.target.value)} />
                            </div>

                            <div className="col-12 mx-auto">
                                <button className=" p-2 py-3 rounded-4  border-0 mb-2 text-nowrap text-white fw-bold bh1 w-100 bg-brown">Send Reset Link <i className='fa-solid fa-paper-plane ms-1'></i></button>
                            </div>
                        </form>
                        <div className='border-top m-4 p-3 text-center d-flex align-items-baseline justify-content-center'><Link to="/" className='text-decoration-none fw-bold brown'><i className='fa-solid fa-arrow-left me-1 brown'></i>Back to Login</Link></div>
                    </div>
                </div>
            </div>


        </>
    );
}

export default ForgetPassword;