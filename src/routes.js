import { postNotes, getAllNotes, getSpecificNote, updateNote, deleteNote } from "./handler.js"

const routes = [
    {
        method : 'GET',
        path : '/notes',
        handler: getAllNotes,
        options: {
            cors: true
        }
    },
    {
        method : 'GET',
        path : '/notes/{id}',
        handler : getSpecificNote
    },
    {
        method : 'POST',
        path : '/notes',
        handler:postNotes
    },
    {
        method : "PUT",
        path : '/notes/{id}',
        handler : updateNote
    },
    {
        method : 'DELETE',
        path : '/notes/{id}',
        handler : deleteNote
    }
   
]

export default routes