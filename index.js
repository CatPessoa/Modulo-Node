const express = require('express')
const exphbs = require('express-handlebars')
const { Pool } = require('pg')
const app = express()

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')
app.use(express.urlencoded({
    extended: true,
}));


app.use(express.static('public'))

const port = 3000

app.get('/', (req, res) => {
    res.render('home')
})
//insertando ddos no banco

app.post('/books/insertbook',async (req, res) => {
    const{title, author, publication_year} = req.body;

    const query = 'INSERT INTO books (title, author, publication_year) VALUES($1, $2, $3)'

    try {
        await pool.query(query, [title, author, publication_year]);
        res.redirect('/')
    } catch (err) {
        console.log('Erro ao inserir livro $(err)')
        res.status(500).send('erro ao inserir livro')
    }
})

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'BemVindo!',
    port: 5432,
})

pool.connect((err) => {
    if (err) {
        console.log('Erro ao conectar com o Postgres', err)
    } else {
        console.log('Conectou com o Postgres')
        app.listen(port, () => {
            console.log('Servidor rodando na porta 3000')
        })
    }
})

module.exports = pool;