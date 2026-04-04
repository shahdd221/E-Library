import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";
import Swal from "sweetalert2";

function LibraryHome() {
  const [query, setQuery] = useState("");
  const [featuredBooks, setFeaturedBooks] = useState([]);
  const [isOpen ,setIsOpen] = useState(false);
  

  const fetchBooks = async () => {
    try {
      const booksCollection = collection(db, "books");
      const data = await getDocs(booksCollection);

      const booksList = data.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));

      setFeaturedBooks(booksList);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Search:", query);
  };

  function handleBorrow(e){
    e.preventDefault();
    Swal.fire({
      title: "Done",
      text:"Book borrowed successfully",
      icon:"success",
      confirmButtonText:"OK"
    })
    setIsOpen(false);
  }
  return (
    <>
      <div className="bg-img library-hero d-flex align-items-center mt-5 py-5">
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

              <button className="border-0 text-white fw-bold bg-brown rounded-4 px-4 py-3">
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
            {featuredBooks.length === 0 ? (
              <p>No books found</p>
            ) : (
              featuredBooks.map((b) => (
                <div key={b.id} className="col-12 col-sm-6 col-lg-3">
                  <div className="card border-0 rounded-4 shadow h-100 overflow-hidden">
                    <div className="library-card-img">
                      <img
                        src={b.coverUrl}
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

                      <button 
                      onClick={() => setIsOpen(true)}
                      className="w-100 p-2 py-3 rounded-4 border-0 text-white fw-bold bg-brown shadow hover d-flex align-items-center justify-content-center gap-2">
                        <i className="fa-solid fa-bookmark"></i>
                        Borrow
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
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
      {isOpen && (
        featuredBooks.map((b) => (
          <div
          className="position-fixed top-0 start-0 end-0 bottom-0 d-flex justify-content-center align-items-center"
          style={{ backgroundColor: "rgba(57, 34, 10, 0.6)", zIndex: 1000 }}
        >
          <div className="bg-white p-5 rounded-4 shadow w-50">
            <h1 className="fw-bold brown border-bottom pb-3 mb-3">
              Borrowing Book
            </h1>

            <form onSubmit={handleBorrow}>
              <div className="row">
                <div className="col-12">
                  <label htmlFor="title" className="brown">
                    Book Title
                  </label>
                  <input
                    id="title"
                    type="text"
                    name="bookName"
                    className="form-control mb-3"
                    placeholder={b.title}
                    readOnly
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <label htmlFor="date" className="brown">
                    Borrow Date
                  </label>
                  <input
                    id="date"
                    type="date"
                    name="date"
                    className="form-control mb-2"
                    required
                  />
                  <div>
                    📌Note: The book must be returned within 2 weeks from the borrow date
                  </div>
                </div>
              </div>

             

              <div className="d-flex gap-2 mt-5 justify-content-end">
                <button
                  type="submit"
                  className="p-2 rounded-3 border-0 text-white fw-bold bg-brown hover col-2"
                >
                  confirm
                </button>
                <button
                  type="button"
                  className="btn btn-secondary col-2"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
        ) )
      )}
        
      
    </>
  );
}

export default LibraryHome;