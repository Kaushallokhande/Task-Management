import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext';

const AddNote = (props) => {
  const context = useContext(noteContext)
  const { addNote } = context;
  const [note, setNote] = useState({ title: "", description: "", tag: "" })

  const onHandle = (e) => {
    e.preventDefault(); //use to stop reload when btn click
    addNote(note.title, note.description, note.tag)
    setNote({ title: "", description: "", tag: "" })
    props.showAlert("Added new note successfully", "success")
  }
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }

  return (
    <div className='container my-3'>
      <h2 id='addHead'>Add Notes</h2>
      <form id='addnotes'>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" value={note.title} onChange={onChange} minLength={3} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={onChange} minLength={5} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">Tag</label>
          <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange} minLength={3} required/>
        </div>
        <button disabled= {note.title.length < 4 || note.description < 6 || note.tag.length < 4} type="submit" className="btn btn-primary" onClick={onHandle}>Add Note</button>
      </form>
    </div>
  )
}

export default AddNote
