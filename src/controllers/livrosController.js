import livros from "../models/Livro.js";

class LivroController {

    static listarLivros = async (req, res) => {
        try {
            const livrosResultado = await livros.find().populate('autor');
            res.status(200).json(livrosResultado);
        } catch (err) {
            res.status(500).json(err);
        }
    };

    static listarLivroPorId = async(req,res)=>{
        const id = req.params.id;

        try{
            const livroPorId = await livros.findById(id).populate('autor','nome');
            res.status(200).json(livroPorId);
        }catch (err){
            res.status(400).send({message: `${err.message} - Id do livro não localizado!`})
        }

    };

    static cadastrarLivro = async(req,res) =>{
        let livro = new livros(req.body);

        try{
          const livroCadastrado = await livro.save();
          res.status(200).json(livroCadastrado)
        }catch (err){
            res.status(500).send({message: `${err.message} - Falha ao cadastrar livro` })
        }

    };

    static atualizarLivro = async(req,res) =>{
        const id = req.params.id;

        try{
            const livroAtualizado = await livros.findByIdAndUpdate(id, {$set: req.body});
            res.status(200).send({message: "Livro atualizado com sucesso!"});
        }catch (err){
            res.status(500).send({message: err.message});
        }
    };

    static deletarLivro = async(req, res) =>{
        const id = req.params.id;

        try{
            await livros.findByIdAndDelete(id);
            res.status(200).send({message: "Livro excluido com sucesso!"});
        }catch (err){
            res.status(500).send({message: "Não foi possível encontrar o livro! "})
        }
    };

    static listarLivroPorEditora = async(req,res) =>{
        const editora = req.query.editora;

        try{
            await livros.find({"editora": editora}, {}).exec();
            res.json(livros);
        }catch(err){
            res.status(500);
        }
    }

    
}



export default LivroController;