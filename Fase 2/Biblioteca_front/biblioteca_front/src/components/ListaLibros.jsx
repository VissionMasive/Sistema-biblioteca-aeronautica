import "../App.css"
import { useState, useEffect } from 'react';
import { Sidemenu } from './Sidemenu';


function ListaLibros() {
    const user = JSON.parse(localStorage.getItem("user"))
    console.log(user)
    const [todoList, setTodolist] = useState([]);
    const [newBook, setNewBook] = useState("");
    useEffect(() => {
        fetch("http://localhost:3001/api/books")
            .then((res) => {
                if (!res.ok) throw new Error("error en la peticion")
                return res.json()
            })
            .then((data) => setTodolist(data))
        console.log(todoList)
    }, [])
    const handleChange = (event) => {
        setNewBook(event.target.value);
    };

    const prestarLibro = (libroid) => {
        const userid = user.id
        const requestoption = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        }
        fetch(`http://localhost:3001/api/books/${libroid}/prestar/${userid}`, requestoption)
            .then((res) => {
                console.log(res.json())
            })
    }

    const devolverLibro = (libroid) => {
        const userid = user.id
        const requestoption = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        }
        fetch(`http://localhost:3001/api/books/${libroid}/devolver/${userid}`, requestoption)
            .then((res) => {
                console.log(res.json())
            })
    }
    
    const addBook = () => {
        const book = {
            nombre: newBook,
            descripcion: "hola"
        };
        const requestoption = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(book)
        }
        fetch("http://localhost:3001/api/books", requestoption)
            .then(response => response.json)
        setTodolist([...todoList, book]);
    };

    const deleteBook = (id) => {
        setTodolist(todoList.filter((book) => book.id !== id));
    };

    return (
        <div className="Test">

            <div className="addBook">
                <input onChange={handleChange} />
                <button onClick={addBook}> Add book</button>
            </div>
            <div className="list">
                {todoList.map((book) => {
                    return (
                        <div key={book.id}>
                            <h1>{book.nombre}</h1>
                            <h2>{book.descripcion}</h2>
                            <button onClick={() => deleteBook(book.id)}> Eliminar </button>
                            <button onClick={() => prestarLibro(book.id)}> Solicitar </button>
                            <button onClick={() => devolverLibro(book.id)}> Devolver </button>

                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default ListaLibros