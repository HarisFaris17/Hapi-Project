import fetch from 'node-fetch';
import  {nanoid} from 'nanoid';
import notes from './notes.js';


const postNotes = (request,h)=>{
    const {title, tags, body} = request.payload;
    let id = nanoid(16);
    // this will return time now in string
    let createdAt = new Date().toISOString();
    let updatedAt = createdAt;
    notes.push({id,title,createdAt,updatedAt,tags,body});
    // the filter need the callback function that returns true or false. if the anonymous function only contain 1 line code we can omit the curly braces '{}'
    let note = notes.filter((note)=>note.id==id);
    if(note.length>0){
        let bodyResponse = {
            status: "success",
            message: "Notes has been added",
            data: {
              noteId: id
            }
        }
        console.log(`Succeed ${bodyResponse}`)
        return h.response(JSON.stringify(bodyResponse)).code(201).type('application/json')
    }else{
        let bodyResponseError = {
            status: "error",
            message: "Note failed to be saved"
          }
        return h.response(JSON.stringify(bodyResponseError)).code(500)
    }
}

const getAllNotes = (request,h)=>{
    let bodyResponse = {
        status : "success",
        data : {
            notes
        }
    }
    console.log(bodyResponse)
    return h.response(JSON.stringify(bodyResponse)).code(200).header('Access-Control-Allow-Origin', '*').header('Content-Type','application/json')
}

const getSpecificNote = (request,h)=>{
    const {id} = request.params;
    let note = notes.filter(note=>note.id===id)
    if(note.length>0){
        return h.response(JSON.stringify({
            status : "success",
            data : {
                note : note[0]
            }
        })).code(200);
    }
    else {return h.response(JSON.stringify({
        status : "failed",
        message : "note id you request doesn't exist"
    })).code(200);}
}

const updateNote = (request,h)=>{
    // the filter need the callback function that returns true or false. if the anonymous function only contain 1 line code we can omit the curly braces '{}'
    const {id} = request.params;
    let index = notes.findIndex((note)=>note.id==id);
    if(index!==-1){
        const {title, tags, body} = request.payload;
        // this will return time now in string
        let updatedAt = new Date().toISOString();
        notes[index]={...notes[index],title,updatedAt,tags,body};
        let bodyResponse = {
            status: "success",
            message: "Notes has been updated",
        }
        console.log(`Succeed ${bodyResponse}`)
        return h.response(JSON.stringify(bodyResponse)).code(200).type('application/json')
    }else{
        let bodyResponseError = {
            status: "error",
            message: "Note failed to be updated"
          }
        return h.response(JSON.stringify(bodyResponseError)).code(500)
    }
}

const deleteNote = (request,h)=>{
    const {id} = request.params;
    let index = notes.findIndex(note=>note.id===id)
    if(index!==-1) {
        if(index===0) notes.shift()
        else if(index==notes.length) notes.pop()
        else {
            let container = notes[0];
            notes[0] = notes[index];
            notes[index] = container;
            notes.shift();
        }
        let bodyResponse = {
            status: "success",
            message: "Notes has been deleted",
        }
        return h.response(JSON.stringify(bodyResponse)).code(200).type('application/json')
    }else{
        let bodyResponse = {
            status: "failed",
            message: "Notes can't be deleted since the requested id doesn't exist",
        }
        return h.response(JSON.stringify(bodyResponse)).code(404).type('application/json')
    }
}


export {postNotes,getAllNotes,getSpecificNote,updateNote,deleteNote}