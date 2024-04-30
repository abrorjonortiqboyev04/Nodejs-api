const http = require('http')
const fs = require('fs')
const path = require('path')
const url = require('url')
const { allBooks, addBookPage, addBook, oneBook, deleteBook } = require('./controller')



const app = http.createServer((req,res)=>{

    const urlParse = url.parse(req.url, true)
    const oneUrl = `/${urlParse.pathname.split('/')[1]}/${urlParse.pathname.split('/')[2]}`
    const reqParamsId = Number(urlParse.pathname.split('/')[3])

    
    // Barcha kitoblar ro'yhati
    if(req.url==='/books' && req.method==='GET'){ allBooks(req,res) }
    
    // Kitob qo'shish sahifasi
    else if(req.url==='/books/add' && req.method==='GET'){ addBookPage(req,res) }

    // Kitob qo'shish 
    else if(req.url==='/books/add' && req.method==='POST'){ addBook(req,res) }

    // Id qidirish
    else if(oneUrl==='/books/one' && req.method==='GET'){ oneBook(reqParamsId,res)  }

    // Id bo'yicha kitob o'chirish
    else if( oneUrl==='/books/delete' && req.method==='GET' ) { deleteBook(reqParamsId,res) }

    // Yangilash id bo'yicha
    else if(oneUrl==='/books/updete' && req.method==='POST') {

    }
}) 

app.listen(3001, ()=>{
    console.log('Server running on port 3001')
})