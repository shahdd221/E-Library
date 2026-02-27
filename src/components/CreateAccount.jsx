import { useState } from "react";
import { Link } from "react-router-dom";
import { getAuth , createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "./firebase"; 
import { useNavigate } from "react-router-dom";


function CreateAccount() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [Userid, setUserid] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
         const cred = await createUserWithEmailAndPassword(auth, email, password);
        const uid = cred.user.uid;
        await setDoc(doc(db, "students", uid), {
        name: name,
        Userid: Userid,
        email: email,
        role: 'student',
        });
        console.log(cred.user);
            navigate("/");
            alert("USER REGESTERD SUCCESSFULLY!");
        }
        catch (error){
            alert("INVALID INFORMATION!");
        }
    }


    return (
        <>
            <div className="container  mt-5 mt-md-0 d-flex justify-content-center align-items-center min-vh-100">

                <div className="col-md-10 form bg-white rounded-4 mb-4 border-0 p-md-0 shadow m-2 d-md-flex m-md-0 d-flex flex-column flex-md-row-reverse">
                    <div className="col-md-7 px-md-5 py-2 px-2 ">
                        <h3 className="fw-bolder px-4 pt-4">Create Your Library Account</h3>
                        <p className="px-4">Please use your official university credentials to register for full access.</p>
                        <form onSubmit={handleSubmit} className="row g-3 mb-4 px-4">
                            <div className="col-md-12">
                                <label htmlFor="name" className="form-label colorgray">Full Name </label>
                                <input type="text" className="form-control" id="name" placeholder="John" required value={name} onChange={(e) => setName(e.target.value)} />
                            </div>

                            <div className="col-md-12">
                                <label htmlFor="studentid" className="form-label colorgray">Student ID</label>
                                <input type="text" className="form-control" id="studentid" placeholder="123451278" required value={Userid} onChange={(e) => setUserid(e.target.value)} />
                            </div>
                            <div className="col-md-12">
                                <label htmlFor="inputEmail" className="form-label colorgray">University Email</label>
                                <input type="email" className="form-control" id="inputEmail" placeholder="12345@std.edu.eg" required value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="col-md-12 mb-4 text-end">
                                <label htmlFor="password" className="form-label w-100 text-start ">Password</label>
                                <input type="password" className="form-control" id="password" placeholder="******" required value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>


                            <div className="col-12 mx-auto">
                                <button className="p-2 py-3 rounded-4  border-0 mb-2 text-nowrap text-white fw-bold bh1 w-100 bg-brown">Create Account</button>
                            </div>
                        </form>
                        <div className='border-top m-4 p-3 text-center'>Already have an account? <Link to="/" className='text-decoration-none fw-bold brown'>Log in here</Link></div>
                    </div>
                    <div className="py-3 round col-md-5 bg-img d-flex flex-column align-items-baseline ">
                        <div className="container p-4 mb-auto">
                            <i className="fa-solid fa-book-open text-white fa-2x mt-5 mb-4"></i>
                            <h4 className="text-white fw-bold mb-4">Join the Digital Archive</h4>
                            <p className="text-white fw-light">Unlock instant access to over 2 million journals, digital manuscripts, and academic textbooks.</p>
                        </div>
                        <div className="container d-flex flex-column p-4 ">
                            
                            <span className="text-white mb-2"><i className="fa-solid fa-check-circle me-2" />24/7 Remote Access</span>
                            <span className="text-white mb-2"><i className="fa-solid fa-check-circle me-2" />Personal Reading Lists</span>
                            <span className="text-white mb-2"><i className="fa-solid fa-check-circle me-2" />Citation Tools Integration</span>
                        </div>
                    </div> 
                </div>
            </div>

        </>
    )
}
export default CreateAccount;
