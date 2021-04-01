import React, {useState, useEffect} from 'react'
import './style.css'
import api from '../../services/Api'
import logo from "../../img/logo.svg";
import {Link, useHistory, useParams} from 'react-router-dom'
import {FiArrowLeft} from 'react-icons/fi'

export default function NewBook(){
    const [id, setId] = useState(null)
    const [title, settitle] = useState('')
    const [Descricao, setDescricao] = useState('')
    const [Autor, setAutor] = useState('')
    const {bookId} = useParams()
    const history = useHistory();    
    const acessToken= localStorage.getItem('acessToken');
    const Authorization= {
        headers: {
            Authorization:`Bearer ${acessToken}`
        }
    }
    useEffect(()=>{
        if(bookId==='0') return;
        else loadBook()
    }, bookId)

    async function loadBook(){
        try {
            const response = await api.get(`api/BooksControll/v1/${bookId}`, Authorization)
            setId(response.data.id)
            settitle(response.data.title)
            setDescricao(response.data.descricao)
            setAutor(response.data.autor)
        } catch (error) {
            alert("Error recovering book")
            history.push('/books')
        }
    }

    async function SaveOrCreatBook(e){
        e.preventDefault()
        const data ={
            title,
            Descricao,
            Autor
        }
        try {
            if(bookId === '0'){
                await api.post('api/BooksControll/v1', data, Authorization)
            }
            else{
                data.id = id;
                await api.put('api/BooksControll/v1', data, Authorization)
            }
        } catch (error) {
            alert("Falha ao criar livro")
        }
        history.push('/books')
    }
    return(
        <div className="new-book-container">
            <div className="content">
                <section>
                    <img src={logo} className="img" alt="Logo"/>
                    <h1>{bookId==='0' ? 'Add New': 'Update Book'}</h1>
                    <p>Enter the book information and click on {bookId==='0' ? `Add ${bookId}`: `Update ${bookId}`}</p>
                    <Link className="back-link" to="/books">
                        <FiArrowLeft size={16} color="#251Fc5" />Back To Books
                    </Link>
                </section>
                <form onSubmit={SaveOrCreatBook}>
                    <input type="text" placeholder="Title" value={title}
                    onChange={e=> settitle(e.target.value)}/>
                    <input type="text" placeholder="Author" value={Autor}
                    onChange={e=> setAutor(e.target.value)}/>
                    {/* <input type="date"/> */}
                    <input type="text" placeholder="Descrição" value={Descricao}
                    onChange={e=> setDescricao(e.target.value)}/>
                    <button className="button" type="submit"> {bookId==='0' ? 'Add': 'Update'} </button>
                </form>
            </div>
        </div>
    );
}