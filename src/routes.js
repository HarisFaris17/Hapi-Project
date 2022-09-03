import { postNotes, getAllNotes, getSpecificNote } from "./handler.js"

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
   
]

export default routes