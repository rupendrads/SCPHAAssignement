import styles from './addbook.module.css';
import { useState } from 'react';
import {useNavigate} from 'react-router-dom';

const AddBook = () => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const navigate = useNavigate(); 
    
    let handleSubmit = async (e) => {
        e.preventDefault();
        try {
          let res = await fetch("http://localhost:5170/api/books", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
              }, 
            body: JSON.stringify({
              title: title,
              author: author,              
            }),
          });
          let resJson = await res.json();
          if (res.status === 201) {
            setTitle("");
            setAuthor("");
            console.log("Book added successfully");
            navigate('/');
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
            <h3>Add Book</h3>
          </div>
          <div className={styles.formDiv}>
            <div className={styles.formSubDiv}>
              <form onSubmit={handleSubmit} >
                  <div className="form-group">
                    <input
                    className="form-control"
                    type="text"
                    value={title}
                    placeholder="Title"
                    onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <input
                    className="form-control"
                    type="text"
                    value={author}
                    placeholder="Author"
                    onChange={(e) => setAuthor(e.target.value)}
                    />
                  </div>
                  <div className={styles.buttonDiv}>
                    <button type="submit" className='btn btn-light'>Add Book</button>
                  </div>
              </form>
            </div>
          </div>
        </>
    );
}

export default AddBook;