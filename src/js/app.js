const addNoteBtn = document.querySelector('#btn-save-note');
const ResetBtn = document.getElementById('btn-Reset');
const PopUp = document.getElementById('exampleModal');
const addedNoteContainer = document.querySelector('.container');
const errorMsg = document.getElementById('error-message');
const updateBtn = document.querySelector('.btn btn-primary');
let noteTitle = document.getElementById('title-name');
let noteText = document.getElementById('note-text');


const Months = ["January", "February","March","April","May","June","July","August","September","October","November","December"];

const notes = JSON.parse(localStorage.getItem('notes') || "[]");

let isUpdated = false, updateId;


PopUp.addEventListener('show.bs.modal', ()=>{
    addNoteBtn.innerHTML = "Add a Note";
    document.querySelector('.modal-title').innerHTML = "Add note";
    noteTitle.value = '';
    noteText.value = '';
    errorMsg.innerHTML = '';
    document.querySelector('form div').classList.remove('incorrect');
});

function showNotes(){
    document.querySelectorAll('.note-box').forEach((note)=> note.remove());
    notes.forEach((note, index) => {
        let noteBox = `
            <div class="note-box">
                <div class="details">
                    <h3>${note.title}</h3>
                    <hr width="98%">
                    <p>${note.description}</p>
                    <hr width="98%">
                </div>
                <div class="bottom-content">
                    <span>${note.date}</span>
                    <div class="settings">
                        <i class="fa fa-trash" onclick = "deleteNote(${index})"></i>   <i class="fa fa-pencil" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo" onclick = "updateNotes(${index}, '${note.title}','${note.description}')"></i> 
                    </div>
                </div>
                
            </div>
        `;
        addedNoteContainer.insertAdjacentHTML('beforeend', noteBox);
    });
}

showNotes();

function deleteNote(noteId){
    notes.splice(noteId, 1);
    localStorage.setItem("notes", JSON.stringify(notes)); 
    showNotes();
}


function updateNotes(noteId, title, desc){
    isUpdated = true;
    updateId = noteId;
    noteTitle.value = title;
    noteText.value = desc;
    addNoteBtn.innerHTML = "Update Note";
    document.querySelector('.modal-title').innerHTML = "Update a note";
}



const createNote = (noteTitle, noteText)=>{

    let mmddyy= new Date(),
     month = Months[mmddyy.getMonth()],
     day = mmddyy.getDate(),
     year = mmddyy.getFullYear();

     let noteInfo = {
        title : noteTitle, description : noteText,
        date: `${month} ${day}, ${year}`
     }

     if(!isUpdated){
        notes.push(noteInfo);
     }else{
        isUpdated = false;
        notes[updateId] = noteInfo;
     }
    
    
    localStorage.setItem("notes", JSON.stringify(notes)); 
}




const validateNote = (noteTitle, noteText) => {
    let errors = [];

    if(noteTitle === ""){
        errors.push("Veuillez donner un titre à la note !");
        document.querySelector('form div').classList.add('incorrect');
    } 

    if(noteText === ""){
        errors.push("Veuillez entrer une note !");
        document.querySelector('form div').classList.add('incorrect');
    } 

    if(noteTitle.length > 30){
        errors.push("Le titre de la note doit contenir maximum  30 caractères !");
        document.querySelector('form div').classList.add('incorrect');
    }
    if(noteText.length > 250){
        errors.push("La note doit contenir maximun 250 caractères !");
        document.querySelector('form div').classList.add('incorrect');
    }
    
    document.querySelector('form div').classList.add('incorrect');
    return errors;
}

function handleAddNote(){
    let errors = [];
    errors = validateNote(noteTitle.value, noteText.value);
   
    if(errors.length > 0){
        errorMsg.innerText  = errors.join(". ");
    }else{
        createNote(noteTitle.value, noteText.value);
        showNotes();
        resetForm();
    }
}

function resetForm(){
    noteTitle.value = '';
    noteText.value = '';
    errorMsg.innerHTML = '';
    document.querySelector('form div').classList.remove('incorrect');
}



addNoteBtn.addEventListener('click', handleAddNote);





