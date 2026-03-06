import { useEffect, useState } from "react";
import { db, storage } from "../firebase";
import { updateDoc } from "firebase/firestore";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
function Books() {
  const [isOpen, setIsOpen] = useState(false);
  const [image, setImage] = useState(null);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  const booksCollection = collection(db, "books");
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("All");

    const filteredBooks = books.filter((book) => {
      const matchesSearch =
        book.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.isbn?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        selectedStatus === "الكل" || book.status === selectedStatus;

      return matchesSearch && matchesStatus;
    });


  const fetchBooks = async () => {
    try {
      const data = await getDocs(booksCollection);
      const booksList = data.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBooks(booksList);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleAddBook = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const bookFormData = new FormData(e.target);
      const title = bookFormData.get("bookName");
      const author = bookFormData.get("Author");
      const isbn = bookFormData.get("isbn");
      const category = bookFormData.get("category");
      const description = bookFormData.get("Description");

      if (!image) {
        alert("Please choose a cover image");
        setLoading(false);
        return;
      }

      const imageFormData = new FormData();
      imageFormData.append("image", image);

      const res = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: imageFormData,
      });

      const data = await res.json();
      const coverUrl = data.imageUrl;

      await addDoc(booksCollection, {
        title,
        author,
        isbn,
        category,
        description,
        coverUrl,
        createdAt: serverTimestamp(),
      });

      await fetchBooks();

      setIsOpen(false);
      setImage(null);
      e.target.reset();
    } catch (error) {
      console.log(error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };
  const deleteBook = async (book) => {
    try {
      if (book.imagePath) {
        const imageRef = ref(storage, book.imagePath);
        await deleteObject(imageRef);
      }

      await deleteDoc(doc(db, "books", book.id));
      await fetchBooks();
    } catch (error) {
      console.log(error);
      alert("Error deleting book");
    }
  };
  const editBook = async (book, updatedData) => {
    try {
      await updateDoc(doc(db, "books", book.id), updatedData);
      await fetchBooks();
    } catch (error) {
      console.log(error);
      alert("Error updating book");
    }
  };

  return (
    <div className="my-5 pt-5">
      <div className="container p-3">
        <div className="d-flex flex-column flex-md-row justify-content-between">
          <div className="col-md-6">
            <h1 className="brown fw-bolder fa-3x">Book Management</h1>
            <p className="fs-3 brown">Manage Library Content</p>
          </div>
          <button
            onClick={() => setIsOpen(true)}
            className="col-md-3 p-2 py-3 rounded-4 border-0 my-3 text-nowrap text-white fw-bold bg-brown shadow hover"
          >
            <i className="fa-solid fa-plus me-1"></i> Add New Book
          </button>
        </div>
      </div>

      {isOpen && (
        <div
          className="position-fixed top-0 start-0 end-0 bottom-0 d-flex justify-content-center align-items-center"
          style={{ backgroundColor: "rgba(57, 34, 10, 0.6)", zIndex: 1000 }}
        >
          <div className="bg-white p-5 rounded-4 shadow w-75">
            <h1 className="fw-bold brown border-bottom pb-3 mb-3">
              Add New Book
            </h1>

            <form onSubmit={handleAddBook}>
              <div className="row">
                <div className="col-md-6">
                  <label htmlFor="title" className="brown">
                    Book Title
                  </label>
                  <input
                    id="title"
                    type="text"
                    name="bookName"
                    className="form-control mb-3"
                    placeholder="e.g. The Republic"
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label htmlFor="author" className="brown">
                    Author
                  </label>
                  <input
                    id="author"
                    type="text"
                    name="Author"
                    className="form-control mb-3"
                    placeholder="e.g. Plato"
                    required
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <label htmlFor="isbn" className="brown">
                    ISBN Number
                  </label>
                  <input
                    id="isbn"
                    type="text"
                    name="isbn"
                    className="form-control mb-3"
                    placeholder="978-3-16-16-148410-0"
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label htmlFor="category" className="brown">
                    Category
                  </label>
                  <input
                    id="category"
                    type="text"
                    name="category"
                    className="form-control mb-3"
                    placeholder="e.g. history"
                    required
                  />
                </div>
              </div>

              <label htmlFor="des" className="brown">
                Description
              </label>
              <textarea
                id="des"
                name="Description"
                className="form-control mb-3"
                placeholder="Provide a brief summary of the book..."
                required
              />

              <label htmlFor="img" className="brown">
                Book Cover Image
              </label>
              <input
                onChange={(e) => setImage(e.target.files[0])}
                id="img"
                type="file"
                name="cover"
                className="form-control mb-3"
                accept="image/*"
                required
              />

              <div className="d-flex gap-2 mt-5 justify-content-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="p-2 rounded-3 border-0 text-white fw-bold bg-brown hover col-2"
                >
                  {loading ? "Adding..." : "Add"}
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
      )}

      <div className="container p-3">
        <div className="border p-3 my-3 rounded-4">
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-5">
            <div className="d-flex flex-wrap gap-2">
             <button
               className={
               selectedStatus === "All"
              ? "p-2 rounded-3 border-0 text-white fw-bold bg-brown shadow hover"
                 : "btn btn-light"
                       }
                    onClick={() => setSelectedStatus("All")}
                >
                         All
              </button>

               <button
                   className={
                   selectedStatus === "available"
                    ? "p-2 rounded-3 border-0 text-white fw-bold bg-brown shadow hover"
                   : "btn btn-light"
                         }
                    onClick={() => setSelectedStatus("available")}
                  >
                        available
                </button>

                <button
                  className={
                   selectedStatus === "Borrowed"
                    ? "p-2 rounded-3 border-0 text-white fw-bold bg-brown shadow hover"
                    : "btn btn-light"
                            }
                   onClick={() => setSelectedStatus("Borrowed")}
                  >
                         Borrowed
                </button>

                <button
                  className={
                  selectedStatus === "fixing"
                    ? "p-2 rounded-3 border-0 text-white fw-bold bg-brown shadow hover"
                   : "btn btn-light"
                         }
                    onClick={() => setSelectedStatus("fixing")}
                  >
                         fixing
                </button>

                <button
                     className={
                     selectedStatus === "filter"
                      ? "p-2 rounded-3 border-0 text-white fw-bold bg-brown shadow hover"
                      : "btn btn-light"
                        }
                       onClick={() => setSelectedStatus("filter")}
                    >
                         filter
                  </button>
            </div>

            <div className="position-relative" style={{ minWidth: "280px" }}>
              <input
                type="text"
                className="form-control pe-5"
                placeholder="search with book name,aurthor,or catagory..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <i
                className="fa-solid fa-magnifying-glass position-absolute top-50 translate-middle-y me-3 text-muted"
                style={{ right: "10px" }}
              ></i>
            </div>
          </div>

          <div>
            {books.length === 0 ? (
              <div className="text-center py-4 text-gray-500">
                <i className="fa-solid fa-book mb-3 brown"></i>
                <p className="font-medium brown">No Books Added</p>
              </div>
            ) : (
              <div>
                <div className="d-flex px-3 mb-3 text-center fw-bold border-bottom pb-3">
                  <div className="col">BOOK</div>
                  <div className="col">AUTHOR</div>
                  <div className="col">CATEGORY</div>
                  <div className="col">STATUS</div>
                  <div className="col">PROCEDURES</div>
                </div>

                {books.map((book) => (
                  <div
                    key={book.id}
                    className="card p-3 shadow mb-3 d-flex flex-row align-items-center text-center"
                  >
                    <div className="col d-flex align-items-center gap-2">
                      <div className="rounded-3">
                        <img
                          src={book.coverUrl}
                          //alt={book.title}
                          style={{ width: "50px" }}
                        />
                      </div>
                      <p className="m-0">{book.title}</p>
                    </div>

                    <p className="m-0 col">{book.author}</p>
                    <p className="m-0 col">{book.category}</p>
                    <p className="m-0 col">{book.status}</p>

                    <div className="col text-center d-flex justify-content-center gap-3">
                      <button
                        onClick={() => editBook(book)}
                        className="bg-transparent border-0"
                      >
                        <i className="fa-solid fa-pen text-primary"></i>
                      </button>

                      <button
                        onClick={() => deleteBook(book)}
                        className="bg-transparent border-0"
                      >
                        <i className="fa-solid fa-trash-can text-danger"></i>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Books;
