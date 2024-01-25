import React, { useState } from 'react'

const Contact = (props) => {
    const [details, setDetails] = useState({ name: '', email: '' });
    const { showAlert } = props;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/contacts/addcontact", {
            method: "POST",
            headers: {
                "auth-token": localStorage.getItem('token'),
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: details.name, email: details.email })
        });
        const json = await response.json();
        setDetails({ name: '', email: '' });
        showAlert("Submitted successfully","primary")
    }

    const onChange = (e) => {
        setDetails({ ...details, [e.target.name]: e.target.value })
    }
    return (
        <div className='container ' style={{ padding: '30px 0 0 0' }}>
            <h2>Contact</h2>
            <form onSubmit={handleSubmit} id='contactfrom'>
                <div className="md-3">
                    <label for="name" className="form-label">Enter Name</label>
                    <input type="text" className="form-control" id="name" name='name' value={details.name} onChange={onChange} required />
                </div>
                <div className="mb-3">
                    <label for="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" onChange={onChange} value={details.email} required />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="d-flex justify-content-center">
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default Contact
