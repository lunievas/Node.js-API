import express from "express";

const app = express();
app.use(express.json());

const livros = [
    {id:1, "titulo": "Coisas frágeis"},
    {id:2, "titulo": "Deuses Americanos"}
]

app.get('/', (req,res)=>{
    res.status(200).send('curso de node');
});

app.get('/livros', (req, res) =>{
    res.status(200).json(livros);
});

app.get('/livros/:id', (req,res) =>{
    let index = buscaLivro(req.params.id);


    res.json(livros[index]);
    
});

app.post('/livros', (req,res) =>{
    const livro = req.body 

    livros.push(livro);

    res.status(201).send('Livro foi cadastrado com sucesso!');
});

app.put('/livros/:id', (req,res) =>{
    let index = buscaLivro(req.params.id);

    livros[index].titulo =  req.body.titulo;

    res.json(livros);
    
});

app.delete('/livros/:id', (req,res) =>{
   
    let {id} =  req.params;
   
    let index = buscaLivro(id);

    livros.splice(index,1);

    res.send(`Livro ${req.body.titulo} foi excluido `);
    
});


function buscaLivro(id){
    return livros.findIndex(livro => livro.id == id);
}

export default app;