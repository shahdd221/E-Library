import { useState } from "react";
import { Link } from "react-router-dom";
import ss from "../images/ss.png";
function LibraryHome() {
  const [query, setQuery] = useState("");

  const featuredBooks = [
  {
    id: 1,
    category: "MATHEMATICS",
    title: "Intro to Probability & Statistics",
    author: "Unknown Author",
    cover: ss
  }
];


  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Search:", query);
    
  };

  return (
    <>
      
      <div className="bg-img library-hero d-flex align-items-center">
        <div className="container text-center text-white px-3 py-5">
          <h1 className="fw-bolder display-5 mb-3">
            Welcome to the University <br /> Library
          </h1>

          <p className="mb-4 opacity-75">
            Discover, Search and Borrow Academic Books from our extensive <br />
            digital and physical collections.
          </p>

          <form onSubmit={handleSearch} className="d-flex justify-content-center">
            <div className="library-search shadow rounded-4 d-flex align-items-center w-100">
              <div className="px-3 d-flex align-items-center justify-content-center">
                <i className="fa-solid fa-magnifying-glass text-white opacity-75"></i>
              </div>

              <input
                type="text"
                className="form-control border-0 shadow-none bg-transparent text-white"
                placeholder="Search by title, author, or ISBN..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />

              <button className="border-0 text-white fw-bold bg-brown rounded-4 px-4 py-3 ">
                Search
              </button>
            </div>
          </form>
        </div>
      </div>

     
      <div className="py-4">
        <div className="container px-3">
          <div className="d-flex align-items-center justify-content-between mb-3">
            <h4 className="fw-bolder mb-0">Featured Academic Books</h4>

                          <Link
                  to="/collection"
                  className="view-collection text-decoration-none fw-bold"
                >
                  View all collection <i className="fa-solid fa-arrow-right ms-2"></i>
                </Link>
          </div>

          <div className="row g-4">
            {featuredBooks.map((b) => (
              <div key={b.id} className="col-12 col-sm-6 col-lg-3">
                <div className="card border-0 rounded-4 shadow h-100 overflow-hidden ">
                  <div className="library-card-img">
                    <img
                      src={b.cover}
                      alt={b.title}
                      className="w-100 h-100 object-fit-cover"
                    />
                  </div>

                  <div className="p-3">
                    <div className="small fw-bold text-uppercase brown opacity-75">
                      {b.category}
                    </div>
                    <h6 className="fw-bolder mt-2 mb-1">{b.title}</h6>
                    <div className="small opacity-75 mb-3">{b.author}</div>

                    <button className="w-100 p-2 py-3 rounded-4 border-0 text-white fw-bold bg-brown shadow hover d-flex align-items-center justify-content-center gap-2">
                      <i className="fa-solid fa-bookmark"></i>
                      Borrow
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

     <div className="bg-brown text-white py-4 mt-4 footer-hover">
        <div className="container px-3">
          <div className="row text-center g-3">
            <div className="col-6 col-lg-3 stat-box">
              <div className="fw-bolder fs-4">50k+</div>
              <div className="small opacity-75 text-uppercase">Digital Books</div>
            </div>

           <div className="col-6 col-lg-3 stat-box">
              <div className="fw-bolder fs-4">12k+</div>
              <div className="small opacity-75 text-uppercase">Research Papers</div>
            </div>

           <div className="col-6 col-lg-3 stat-box">
              <div className="fw-bolder fs-4">8k+</div>
              <div className="small opacity-75 text-uppercase">Active Students</div>
            </div>

           <div className="col-6 col-lg-3 stat-box">
              <div className="fw-bolder fs-4">24/7</div>
              <div className="small opacity-75 text-uppercase">Online Access</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LibraryHome;