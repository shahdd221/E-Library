import { useState } from 'react';

function DashBoard() {


    const [isOpen, setIsOpen] = useState(false);
    const [image, setImage] = useState(null);
    const [books, setBooks] = useState([]);

    const handleAddBook = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const newBook = { name: formData.get('bookName') , author: formData.get('Author') , category: formData.get('category') , cover: formData.get('cover') };
        setBooks([...books, newBook]);
        setIsOpen(false);


    }

    const deleteBook = (indexDelete) => {
        const updateBooks = books.filter((_, index) => index !== indexDelete);
        setBooks(updateBooks);
    }

    return (
        <div className='my-5 pt-5'>
            <div className='container p-3'>
                <div className='d-flex flex-column flex-md-row justify-content-between'>
                    <div className='col-md-6'>
                        <h1 className='brown fw-bolder fa-3x '>Admin Dashboard</h1>
                        <p className='fs-3 brown'>Manage Library Content</p>
                    </div>
                    <button onClick={() => setIsOpen(true)} className='col-md-3 p-2 py-3 rounded-4  border-0 my-3 text-nowrap text-white fw-bold bg-brown shadow hover'><i className='fa-solid fa-plus me-1'></i> Add New Book</button>
                </div>
            </div>
            {
                isOpen && (
                    <div className='position-fixed top-0 start-0 end-0 bottom-0 d-flex justify-content-center align-items-center'
                        style={{ backgroundColor: 'rgba(57, 34, 10, 0.6)', zIndex: 1000 }}
                    >
                        <div className='bg-white p-5 rounded-4 shadow w-75'>
                            <h1 className='fw-bold brown border-bottom pb-3 mb-3'>Add New Book</h1>
                            <form onSubmit={handleAddBook}>
                                <div className="row">
                                    <div className="col-md-6">
                                        <label htmlFor="title" className="brown">Book Title</label>
                                        <input id="title" type="text" name="bookName" className="form-control mb-3" placeholder="e.g. The Republic" required />
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="author" className="brown">Author</label>
                                        <input id="author" type="text" name="Author" className="form-control mb-3" placeholder="e.g. Plato" required />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <label htmlFor="isbn" className="brown">ISBN Number</label>
                                <input id="isbn" type="text" name="isbn" className="form-control mb-3" placeholder="978-3-16-16-148410-0" required />
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="category" className="brown">Category</label>
                                <input id="categorey" type="text" name="category" className="form-control mb-3" placeholder="e.g. history" required />
                                    </div>
                                </div>
                                
                                <label htmlFor="des" className="brown">Description</label>
                                <textarea id="des" type="text" name="Description" className="form-control mb-3" placeholder="Provide a brief summary of the book..." required />
                                <label htmlFor="img" className="brown">Book Cover Image</label>
                                <input onChange={(e)=> setImage(e.target.files[0])} id="img" type="file" name="cover" className="form-control mb-3" required />
                                <div className="d-flex gap-2 mt-5 justify-content-end">
                                    <button type="submit" className="p-2 rounded-3  border-0 text-white fw-bold bg-brown hover col-2 ">Add</button>
                                    <button type="button" className="btn btn-secondary col-2" onClick={() => setIsOpen(false)}>Cancel</button>
                                </div>
                            </form>

                        </div>

                    </div>
                )
            }
            <div className='container p-3'>
                <div className='border p-3 my-3 rounded-4'>
                    <h5 className='fw-bold border-bottom pb-3 mb-4 brown'>Books Management</h5>
                    <div>
                        {
                            books.length === 0 ? (
                                <div className="text-center py-4 text-gray-500">
                                    <i className="fa-solid fa-book mb-3 brown"></i>
                                    <p className="font-medium brown">No Books Added</p>
                                </div>

                            ) : (
                                
                                <div>
                                    <div className='d-flex px-3 mb-3'>
                                        <div className="col-3">BOOK</div>
                                        <div className="col-3">AUTHOR</div>
                                        <div className="col-3">CATEGORY</div>
                                        <div className="col-3">ACTION</div>
                                        
                                    </div>
                                    {
                                        books.map((book, index) => (
                                            <div className='card p-3 shadow mb-3 d-flex justify-content-between flex-row'>
                                                <div className='col-3 d-flex gap-2' >
                                                    <div className='rounded-3'><img src={URL.createObjectURL(book.cover)} style={{width:"50px"}} /></div>
                                                    <p className='m-0'>{book.name}</p>
                                                </div>
                                                <p className='m-0 col-3'>{book.author}</p>
                                                <p className='m-0 col-3'>{book.category}</p>
                                                <button onClick={() => deleteBook(index)} className='col-3 text-start bg-transparent border-0 rounded-circle'><i className='fa-solid fa-trash-can text-danger'></i> </button>
                                            </div>
                                        ))
                                    }
                                </div>
                            )
                        }

                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashBoard;