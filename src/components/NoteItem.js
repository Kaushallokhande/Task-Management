import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';

const NoteItem = (props) => {
    const context = useContext(noteContext);
    const { deleteNote } = context;
    const { note, updateNote } = props;

    return (
        <div className='col-md-3'>
            <div className="card my-3">
                <div className="card-body"id='cardcontainer' >
                    <div className='d-flex justify-content-between'>
                        <h5 className="card-title">{props.note.title}</h5>

                        <div>
                            <i className="fa-sharp fa-solid fa-trash mx-2" onClick={() => {
                                deleteNote(note._id);
                                props.showAlert("Deleted Successfully", "danger")
                            }}></i>
                            <i className="fa-solid fa-pen-to-square mx-2" onClick={() => {
                                updateNote(note);
                            }}></i>
                        </div>

                    </div>
                    <p className="card-text">{props.note.description}</p>
                    <h6 className="card-title">{props.note.tag}</h6>
                </div>
            </div>

            {/* 2nd */}
            {/* <div className="card text-center">
                <div className="card-header">
                    <div className='d-flex justify-content-between'>
                        <h5 className="card-title">{props.note.title}</h5>
                        <div>
                            <i className="fa-sharp fa-solid fa-trash mx-2" onClick={() => {
                                deleteNote(note._id);
                                props.showAlert("Deleted Successfully", "danger")
                            }}></i>
                            <i className="fa-solid fa-pen-to-square mx-2" onClick={() => {
                                updateNote(note);
                            }}></i>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <h6 className="card-title"><p className="card-text">{props.note.description}</p>
                    </h6>
                </div>
                <div className="card-footer text-body-secondary">
                    <h5 className="card-title">{props.note.tag}</h5>
                </div>
            </div> */}
            
        </div>
    )
}

export default NoteItem
