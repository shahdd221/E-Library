import { useState } from 'react';
import img from './imges/library.png';
import {Link} from 'react-router-dom';

function Login() {
    
    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email,password);
        setEmail("");
        setPassword("");
    }

    return (
        <>
            <div className=" d-flex justify-content-center align-items-center min-vh-100 mx-4">

                <div className="col-md-4 p-3 form  border rounded-4  shadow">
                    <div className="col-md-12">
                        <div className='text-center my-5'>
                            <span className='border rounded-4 p-4 pb-3 '><i className='fa-solid fa-graduation-cap fa-2x'></i></span>
                            <h3 className="darkorange fw-bolder px-4 mt-5">Welcome Back </h3>
                            <p className=" px-4">Access your digital collection and resources</p>
                        </div>
                        <form onSubmit={handleSubmit} className="row g-3 mb-4 px-4 ">

                            <div className="col-md-12 mb-3">
                                <label htmlFor="inputEmail4" className="form-label ">Institutional Email </label>
                                <input type="email" className="form-control" id="Email" placeholder="12345@std.edu.eg" required value={email} onChange={(e)=> setEmail(e.target.value)} />
                            </div>
                            <div className="col-md-12 mb-4 text-end">
                                <label htmlFor="inputEmail4" className="form-label w-100 text-start ">Password</label>
                                <input type="password" className="form-control" id="password" placeholder="******" required value={password} onChange={(e)=> setPassword(e.target.value)} />
                                <button className="border-0 bg-transparent fa-xs mt-4">Forgot password?</button>
                            </div>

                            <div className="col-12 mx-auto">
                                <button className="bg-dark p-2 py-3 rounded-4  border-0 mb-2 text-nowrap text-white fw-bold bh1 w-100 ">Sign In to Library</button>
                            </div>
                        </form>
                        <div className='border-top m-4 p-3 text-center'>New to the library? <Link to="/create-account" className='text-decoration-none fw-bold'>Create an account</Link></div>
                    </div>
                </div>
            </div>


        </>
    );
}

export default Login;