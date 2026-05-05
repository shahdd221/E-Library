import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "./firebase";
import Swal from "sweetalert2";

function CreateAccount() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [Userid, setUserid] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [confirmTouched, setConfirmTouched] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const doPasswordsMatch =
        password.length > 0 &&
        confirmPassword.length > 0 &&
        password === confirmPassword;

    const showConfirmInvalid =
        confirmTouched && confirmPassword.length > 0 && password !== confirmPassword;

    const showConfirmValid = confirmTouched && doPasswordsMatch;

    const handleSubmit = async (e) => {
        e.preventDefault();

        const cleanedEmail = email.trim().toLowerCase();

        if (!cleanedEmail.endsWith(".edu") && !cleanedEmail.endsWith(".edu.eg")) {
            Swal.fire({
                title: "Invalid Email",
                text: "Please use your university email (.edu or .edu.eg)",
                icon: "error",
                confirmButtonColor: "#633a19",
            });
            return;
        }

        setConfirmTouched(true);

        if (password !== confirmPassword) return;

        try {
            const cred = await createUserWithEmailAndPassword(
                auth,
                cleanedEmail,
                password
            );

            // ✅ هنا الإضافة فقط بدون تغيير أي UX
            await setDoc(doc(db, "students", cred.user.uid), {
                name,
                Userid,
                email: cleanedEmail,
                role: "student",
                createdAt: serverTimestamp(), // 👈 NEW
            });

            await sendEmailVerification(cred.user);

            await auth.signOut();

            Swal.fire({
                title: "Verify Your Email",
                text: "A verification link has been sent to your university email. Please verify your account before logging in.",
                icon: "info",
                confirmButtonColor: "#633a19",
            });

            navigate("/");
        } catch (error) {
            console.log(error);
            Swal.fire({
                title: "INVALID INFORMATION!",
                text: error.message,
                icon: "warning",
                confirmButtonText: "Ok",
                confirmButtonColor: "#633a19",
            });
        }
    };

    return (
        <>
            <div className="container mt-5 mt-md-0 d-flex justify-content-center align-items-center min-vh-100">
                <div className="col-md-10 form bg-white rounded-4 mb-4 border-0 p-md-0 shadow m-2 d-md-flex m-md-0 d-flex flex-column flex-md-row-reverse">

                    <div className="col-md-7 px-md-5 py-2 px-2 ">
                        <h3 className="fw-bolder px-4 pt-4">Create Your Library Account</h3>
                        <p className="px-4">
                            Please use your official university credentials to register for full access.
                        </p>

                        <form onSubmit={handleSubmit} className="row g-3 mb-4 px-4">

                            <div className="col-md-12">
                                <label className="form-label colorgray">Full Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="col-md-12">
                                <label className="form-label colorgray">Student ID</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={Userid}
                                    onChange={(e) => setUserid(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="col-md-12">
                                <label className="form-label colorgray">University Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="col-md-12 position-relative">
                                <label className="form-label">Password</label>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="form-control pe-5"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <i
                                    className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
                                    onClick={() => setShowPassword(!showPassword)}
                                    style={{ position: "absolute", right: "30px", top: "65%", cursor: "pointer" }}
                                />
                            </div>

                            <div className="col-md-12 position-relative mb-4">
                                <label className="form-label">Confirm Password</label>
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    className={`form-control pe-5 ${showConfirmInvalid ? "is-invalid" : showConfirmValid ? "is-valid" : ""}`}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    onBlur={() => setConfirmTouched(true)}
                                    required
                                />
                                <i
                                    className={`fa-solid ${showConfirmPassword ? "fa-eye-slash" : "fa-eye"}`}
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    style={{ position: "absolute", right: "30px", top: "43%", cursor: "pointer" }}
                                />
                            </div>

                            <div className="col-12">
                                <button className="p-2 py-3 rounded-4 border-0 text-white fw-bold bg-brown w-100 hover shadow">
                                    Create Account
                                </button>
                            </div>
                        </form>

                        <div className="border-top m-4 p-3 text-center">
                            Already have an account?{" "}
                            <Link to="/" className="fw-bold brown">
                                Log in here
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}

export default CreateAccount;