import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "https://inotebook-server-hwch.onrender.com"
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial);

  //All note
  const getNotes = async () => {
    //fetch Api
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      }
    });
    const json = await response.json();
    setNotes(json)
  }

  //Add note
  const addNote = async (title, description, tag) => {
    //fetch Api
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    });

    //logic(frontend part)
    const note = await response.json();
    setNotes(notes.concat(note))
  }

  //Delete note
  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      }
    });

    const json = await response.json();
    console.log(json);
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
  }

  //Edit note
  const editNote = async (id, title, description, tag) => {
    //fetch Api
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = await response.json();
    console.log(json);

    //logic 
    let newNote = JSON.parse(JSON.stringify(notes))
    for (let i = 0; i < newNote.length; i++) {
      const e = newNote[i];
      if (e._id === id) {
        e.title = title;
        e.description = description;
        e.tag = tag;
        break;
      }
    }
    setNotes(newNote)
  }

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState