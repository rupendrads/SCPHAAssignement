import styles from './editbook.module.css';
import { useState, useEffect } from 'react';
import {useNavigate, useParams} from 'react-router-dom';

const EditBook = () => {
    const [id, setId] = useState("");    
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const navigate = useNavigate(); 
    const params = useParams();

    useEffect((e) => {
        try {
            fetch(`http://localhost:5170/api/books/${params.id}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setId(data.id);
                setTitle(data.title);
                setAuthor(data.author);       
            });
          } catch (err) {
            console.log(err);
          };        
    }, []);

    let handleSubmit = async (e) => {
        e.preventDefault();
        try {
          let res = await fetch(`http://localhost:5170/api/books/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
              }, 
            body: JSON.stringify({
              id: id,
              title: title,
              author: author,              
            }),
          });
          if (res.status === 204) {
            setTitle("");
            setAuthor("");
            console.log("Book updated successfully");
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
          <h3>Edit Book</h3>
        </div>
        <div className={styles.formDiv}>
          <div className={styles.formSubDiv}>
            <form onSubmit={handleSubmit}>
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
                <button type="submit" className='btn btn-light'>Update Book</button>
              </div>
            </form>
            </div>
          </div>
        </>
    );
}

export default EditBook;



