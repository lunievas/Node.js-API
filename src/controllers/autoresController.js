import autores from "../models/Autor.js";

class AutoresController {

    static listarAutores = async (req, res) => {
        try {
            const autoresResultado = await autores.find();
            res.status(200).json(autoresResultado)
        } catch (err) {
            res.status(500).json(err);
        }
    };

    static listarAutorPorId = async(req,res)=>{
        const id = req.params.id;

        try{
            const autorPorId = await autores.findById(id);
            res.status(200).json(autorPorId);
        }catch (err){
            res.status(400).send({message: `${err.message} - Id do autor não localizado!`})
        }

    };

    static cadastrarAutor = async(req,res) =>{
        let autor = new autores(req.body);

        try{
          const autorCadastrado = await autor.save();
          res.status(200).json(autorCadastrado)
        }catch (err){
            res.status(500).send({message: `${err.message} - Falha ao cadastrar autor` })
        }

    };

    static atualizarAutor = async(req,res) =>{
        const id = req.params.id;

        try{
            const autorAtualizado = await autores.findByIdAndUpdate(id, {$set: req.body});
            res.status(200).send({message: "autor atualizado com sucesso!"});
        }catch (err){
            res.status(500).send({message: err.message});
        }
    };

    static deletarAutor = async(req, res) =>{
        const id = req.params.id;

        try{
            await autores.findByIdAndDelete(id);
            res.status(200).send({message: "autor excluido com sucesso!"});
        }catch (err){
            res.status(500).send({message: "Não foi possível encontrar o autor! "})
        }
    };

    
}



export default AutoresController;