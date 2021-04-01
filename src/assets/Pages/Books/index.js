import React, {useState, useEffect} from "react";
import {Link, useHistory} from 'react-router-dom';
import {FiPower, FiEdit, FiTrash2} from "react-icons/fi"


import './style.css';
import logo from "../../img/logo.svg";
import api from '../../services/Api'
export default function Books(){
    const [books, setbooks] = useState([]);
    const userName = localStorage.getItem('userName');
    const acessToken= localStorage.getItem('acessToken');
    const history = useHistory()
    useEffect(()=>{
        api.get('/api/BooksControll/v1', {
            headers: {
                Authorization:`Bearer ${acessToken}`
            }
        }).then(response=>{
            setbooks(response.data)
        })
    }, [acessToken])
    async function Logout(){
        try {
            await api.get('/api/AuthControllers/v1/revoke', {
                headers: {
                    Authorization:`Bearer ${acessToken}`
                }
            })
            localStorage.clear()
            history.push('/')
        } catch (error) {
            alert('Falha no Logout')
        }
    }
    async function editBook(id){
        try {
            history.push(`/book/new/${id}`)
        } catch (error) {
            alert('Falha na edição')
        }
    }
    async function deleteBook(id){
        try {
            await api.delete(`api/BooksControll/v1/${id}`, {
                headers: {
                    Authorization:`Bearer ${acessToken}`
                }
            })
            setbooks(books.filter(book=> book.id !== id))
        } catch (error) {
            alert('Falha na deleção')
        }
    }
    return(
        <div className="book-container">
            <header>
                <img src={logo} alt="Logo"/>
                <span>Welcome, <strong> {userName.toUpperCase()} </strong>!</span>
                <Link className="button" to="book/new/0">Add New Book</Link>
                <button onClick={Logout} type="button">
                    <FiPower size={18} color="#251FC5"/>
                </button>
            </header>
            <h1>Registered Books</h1>
            <ul>
                {books.map(book=>(
                    <li kay={book.id}>
                    <strong>Title:</strong>
                    <p>{book.title} </p>
                    <strong>Author:</strong>
                    <p>{book.autor}</p>
                    <strong>Descrição</strong>
                    <p>{book.descricao}</p>
                    {/* <strong>Release Date:</strong>
                    <p> {book.launchDate} </p> */}

                    <button type="button" onClick={()=> editBook(book.id)}>
                        <FiEdit size={20} color="#251FC5"></FiEdit>
                    </button>
                    <button type="button">
                        <FiTrash2 size={20} color="#251FC5" onClick= {()=>deleteBook(book.id)}></FiTrash2>
                    </button>
                </li>
                ))}
            </ul>
        </div>
    )
}