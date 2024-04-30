const fs = require('fs')
const path = require('path')

// Barcha kitoblarni ko'rish
exports.allBooks = (req,res)=>{
    const data = fs.readFileSync(path.join(__dirname, 'books.json'), 'utf8')
        if(!data[2]){
           return res.end('Malumotlar topilmadi')
        } 
        return res.end(data)  
}


// Yangi book qo'shish sahifasi
exports.addBookPage = (req,res)=>{
    res.end(`
    <html>
      <form action="/books/add" method="POST">
      title:
         <input type="text" name="name">
      <br><br>
      author: 
         <input type="text" name="age">
         <button type="submit">Send</button>
      </form>
    </html>
 `)
}

// Yangi kitob qo'shish so'rovi
exports.addBook = async (req,res)=>{
    let data = []
    let name, age
    req.on('data', (chunk)=>{
        data.push(chunk)
    })
    
    req.on('end', ()=>{
        const body = Buffer.concat(data).toString()
        name = body.split('&')[0].split('=')[1]
        age = body.split('&')[1].split('=')[1]

        const book = {
            id: Date.now(),
            name, age
        }
        fs.readFile(path.join(__dirname, 'books.json'), 'utf8', (error, data)=>{
            if(error) throw error
            
            const malumot = JSON.parse(data)
            
            malumot.push(book)

            fs.writeFile(path.join(__dirname, 'books.json'), JSON.stringify(malumot), (err)=>{
                if(err) throw err
            })

        })
    })
    
    res.end('Qabul qilindi')
}

// Id Bo'yicha Bitta kitobni olish
exports.oneBook = (reqBodyId,res)=>{

        fs.readFile(path.join(__dirname, 'books.json'), 'utf8', (error, data)=>{
            if(error) throw error
            let findData
            const malumot = JSON.parse(data)
            
            malumot.forEach(element => {
                if(element.id==reqBodyId){
                    findData=element
                }
            });

            if(!findData){
                return res.end('Topilmadi.!')
            }
            
            res.end(JSON.stringify(findData))
        })
    }


// Id bo'yicha kitob o'chirish
exports.deleteBook = (reqBodyId,res)=>{

        fs.readFile(path.join(__dirname, 'books.json'), 'utf8', (error, data)=>{
            if(error) throw error
            let findData
            const malumot = JSON.parse(data)
            const newDate = []

            malumot.forEach(element => {
                if(element.id!==reqBodyId){
                    newDate.push(element)
                }
            });
            res.end(JSON.stringify(newDate))
        })
    }