import express from "express";
import path from "path";

const app = express();
const port = 3000;

let notes = [];

app.set("view engine", "ejs");

app.use(express.static(path.resolve("public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 

app.get("/", (req, res) => {
    res.render("notes",{notes: notes});
});

app.post("/", (req, res) => {
    const {title, content} = req.body;
    const noteId = Date.now().toString();
    const time = new Date().toLocaleTimeString();
    notes.push({title, content, noteId, time});
    res.redirect("/");
}); 
    

app.delete("/:id", (req, res) => {
const idToDelete = req.params.id; 
    
notes = notes.filter(note => note.noteId != idToDelete);

res.status(200).send(`Note with ID ${idToDelete} has been deleted.`);
});

app.get("/create",(req, res) => {
    res.render("create");
});

app.listen(port, () => {
    console.log(`server listening to port ${port}`); 
});