import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import styles from './bookslist.module.css';

const BooksList = () => {
    const [books, setBooks] = useState([]);
    const url = "http://localhost:5170/api/books";    
  
    const fetchData = () => {
      return fetch(url)
        .then((res) => res.json())
        .then((d) => {
            console.log(d);
            setBooks(d);
        })
    }
    
    useEffect(() => {
        fetchData();
    }, []);

    const handleDeleteClick = async (id) => {
            try {
              let res = await fetch(`http://localhost:5170/api/books/${id}`, {
                method: "DELETE",
              });
              if (res.status === 204) {
                console.log("Book deleted successfully");
                fetchData();
              } else {
                console.log("Some error occured");
              }
            } catch (err) {
              console.log(err);
            }
          };

    

    return (
    <>
        <div className={styles.headerDiv}>
            <h3>Books List</h3>
        </div>
        <div className={styles.content}>
            <div className={styles.formDiv}>
                <div className={styles.buttonDiv}>
                    <a href="/add">
                        <button className='btn btn-light'>Add Book</button>
                    </a>
                </div>
                <div className={styles.tableDiv}>
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">Title</th>
                                <th scope="col">Author</th>
                                <th scope="col"></th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            books.map((data)=>{
                                return(
                                    <tr key={data.id}>
                                        <td scope="row">{data.id}</td>
                                        <td>{data.title}</td>
                                        <td>{data.author}</td>
                                        <td>
                                            <Link to={{pathname:'/edit/'+`${data.id}`}}>
                                                <button className='btn btn-light'>Edit</button>
                                            </Link>                                
                                        </td>
                                        <td>
                                            <button className='btn btn-light' onClick={() => handleDeleteClick(data.id)}>
                                                Delete</button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </>
    );
}

export default BooksList;