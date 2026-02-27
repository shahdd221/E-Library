import img from './imges/library.png'

function Login() {
    return (
        <>
            <div className="container px-lg-5 d-flex justify-content-center align-items-center vh-100">

                <div className="col-lg-12 form bg-white rounded-4  border-0 shadow ">
                    <div className="col-md-8">
                        <div className='text-center mb-5'>
                            <h3 className="darkorange fw-bolder px-4 pt-4">Welcome Back </h3>
                            <p className=" px-4">Access your digital collection and resources</p>
                        </div>
                        <form className="row g-3 mb-4 px-4 ">

                            <div className="col-md-6">
                                <label htmlFor="inputEmail4" className="form-label ">Institutional Email </label>
                                <input type="email" className="form-control" id="inputEmail4" placeholder="12345@std.edu.eg" required />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="inputEmail4" className="form-label w-100 "><div className="d-flex justify-content-between"><span>Password</span><button className="border-0 bg-transparent">Forgot password?</button></div></label>
                                <input type="password" className="form-control" id="inputEmail4" placeholder="******" required />
                            </div>

                            <div className="col-12">
                                <div className="form-check py-4">
                                    <input className="form-check-input" type="checkbox" id="gridCheck" />
                                    <label className="form-check-label " htmlFor="gridCheck">
                                        Stay signed in for 30 days
                                    </label>
                                </div>
                            </div>
                            <div className="col-12">
                                <button className=" p-2 py-3 rounded-4  border-0 mb-2 text-nowrap text-white fw-bold bh1 w-100">Sign In to Library</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>


        </>
    );
}

export default Login;