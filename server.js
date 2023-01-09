const { addLikes, getLikes, duplicatePost, setLike, deletePost  } = require('./posts');
const express = require ('express');
const app = express();
const cors = require('cors')

app.use(express.json());
app.use(cors());
app.use(express.static('public'))

app.listen(process.env.PORT, console.log("SERVIDOR ENCENDIDO"))

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html")
})

app.get("/posts", async (req, res) => {
    const posts = await getLikes()
    res.json(posts)
})

app.post("/posts", async (req, res) => {
    try {
        const payload = req.body
        const resultDuplicate = await duplicatePost(payload)
        if (
            payload.id === "" ||
            payload.titulo === "" ||
            payload.url === "" ||
            payload.descripcion === ""
        ) {
            console.log("Faltan datos por ingresar");
        } else if (resultDuplicate[0].num > 0){
            res.send("Registro existente")
           
        } else{
            await addLikes(payload)
            res.send("Registro agregado con éxito")
        }

    } catch (error) {
        res.json({message: "Faltan campos por ingresar"});
    }  
    });

app.put("/posts/like/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await setLike(id);
        res.send("Likes agregado");
        } catch (e) {
        res.send(e);
        }
      });

      app.delete("/posts/:id", async (req, res) => {
        try {
            const { id } = req.params
            await deletePost(id)
            res.send("posts eliminado con éxito")
        } catch (error) {
            res.status(500).send(error)
            console.log(res.code);
        }
    
        })