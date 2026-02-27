import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "./firebase";

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
    confirmTouched &&
    confirmPassword.length > 0 &&
    password !== confirmPassword;

  const showConfirmValid = confirmTouched && doPasswordsMatch;

  const handleSubmit = async (e) => {
    e.preventDefault();

    setConfirmTouched(true);

    if (password !== confirmPassword) return;

    try {
      const cred = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const ADMIN_EMAILS = [
        "admin1@std.edu.eg",
        "admin2@std.edu.eg",
        "admin3@std.edu.eg",
      ];

      const role = ADMIN_EMAILS.includes(email) ? "admin" : "student";

      const uid = cred.user.uid;

      await setDoc(doc(db, "users", uid), {
        name: name,
        Userid: Userid,
        email: email,
        role: role,
      });

      navigate("/");
      alert("USER REGISTERED SUCCESSFULLY!");
    } catch (error) {
      alert("INVALID INFORMATION!");
    }
  };

  return (
    <>
      <div className="container mt-5 mt-md-0 d-flex justify-content-center align-items-center min-vh-100">
        <div className="col-md-10 form bg-white rounded-4 mb-4 border-0 p-md-0 shadow m-2 d-md-flex m-md-0 d-flex flex-column flex-md-row-reverse">
          <div className="col-md-7 px-md-5 py-2 px-2 ">
            <h3 className="fw-bolder px-4 pt-4">
              Create Your Library Account
            </h3>
            <p className="px-4">
              Please use your official university credentials to register for
              full access.
            </p>

            <form onSubmit={handleSubmit} className="row g-3 mb-4 px-4">
              <div className="col-md-12">
                <label htmlFor="name" className="form-label colorgray">
                  Full Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="John"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="col-md-12">
                <label htmlFor="studentid" className="form-label colorgray">
                  Student ID
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="studentid"
                  placeholder="123451278"
                  required
                  value={Userid}
                  onChange={(e) => setUserid(e.target.value)}
                />
              </div>

              <div className="col-md-12">
                <label htmlFor="inputEmail" className="form-label colorgray">
                  University Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="inputEmail"
                  placeholder="12345@std.edu.eg"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="col-md-12 position-relative">
                <label
                  htmlFor="password"
                  className="form-label w-100 text-start"
                >
                  Password
                </label>

                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control pe-5"
                  id="password"
                  placeholder="******"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <i
                  className={`fa-solid ${
                    showPassword ? "fa-eye-slash" : "fa-eye"
                  }`}
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: "25px",
                    top: "65%",
                    cursor: "pointer",
                    color: "#6c757d",
                  }}
                />
              </div>

              <div className="col-md-12 mb-4 position-relative">
                <label
                  htmlFor="confirmPassword"
                  className="form-label w-100 text-start"
                >
                  Confirm Password
                </label>

                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className={`form-control pe-5 ${
                    showConfirmInvalid
                      ? "is-invalid"
                      : showConfirmValid
                      ? "is-valid"
                      : ""
                  }`}
                  id="confirmPassword"
                  placeholder="******"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onBlur={() => setConfirmTouched(true)}
                />

                <i
                  className={`fa-solid ${
                    showConfirmPassword ? "fa-eye-slash" : "fa-eye"
                  }`}
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                  style={{
                    position: "absolute",
                    right: "25px",
                    top: "65%",
                    cursor: "pointer",
                    color: "#6c757d",
                  }}
                />

                {showConfirmInvalid && (
                  <div className="invalid-feedback">
                    Passwords do not match.
                  </div>
                )}

                {showConfirmValid && (
                  <div className="valid-feedback">
                    Passwords match
                  </div>
                )}
              </div>

              <div className="col-12 mx-auto">
                <button className="p-2 py-3 rounded-4 border-0 mb-2 text-nowrap text-white fw-bold bh1 w-100 bg-brown">
                  Create Account
                </button>
              </div>
            </form>

            <div className="border-top m-4 p-3 text-center">
              Already have an account?{" "}
              <Link
                to="/"
                className="text-decoration-none fw-bold brown"
              >
                Log in here
              </Link>
            </div>
          </div>

          <div className="py-3 round col-md-5 bg-img d-flex flex-column align-items-baseline ">
            <div className="container p-4 mb-auto">
              <i className="fa-solid fa-book-open text-white fa-2x mt-5 mb-4"></i>
              <h4 className="text-white fw-bold mb-4">
                Join the Digital Archive
              </h4>
              <p className="text-white fw-light">
                Unlock instant access to over 2 million journals, digital
                manuscripts, and academic textbooks.
              </p>
            </div>

            <div className="container d-flex flex-column p-4 ">
              <span className="text-white mb-2">
                <i className="fa-solid fa-check-circle me-2" />
                24/7 Remote Access
              </span>
              <span className="text-white mb-2">
                <i className="fa-solid fa-check-circle me-2" />
                Personal Reading Lists
              </span>
              <span className="text-white mb-2">
                <i className="fa-solid fa-check-circle me-2" />
                Citation Tools Integration
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateAccount;