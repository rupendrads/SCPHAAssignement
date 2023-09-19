import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BooksList from './Books/List/bookslist';
import AddBook from './Books/Add/addbook';
import EditBook from './Books/Edit/editbook';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
            <Route exact path='/' element={<BooksList/>}></Route>
            <Route exact path='/add' element={<AddBook/>}></Route> 
            <Route path="edit/:id" element={<EditBook />} />           
          </Routes>        
      </Router>
    </div>
  );
}

export default App;
