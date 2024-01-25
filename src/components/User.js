import React, { useEffect, useState } from 'react'

const User = (props) => {
    const [use, setUse] = useState({ id: '', name: '', email: '' })
    const handleSubmit = async () => {
        const response = await fetch("http://localhost:5000/api/auth/getuser", {
            method: "POST",
            headers: {
                "auth-token": localStorage.getItem('token'),
            },
        });
        const json = await response.json();
        setUse(json)
        if (!json) {
            props.showAlert("Invalid Login", "danger")
        }
    }

    useEffect(() => {
        handleSubmit();
    }, [])
    return (
        <div className='container d-flex justify-content-center' style={{ padding: '20px 0 0 0' }}>
            <div className="card border-warning mb-3" style={{ maxWidth: "18rem" }}>
                <div className="card-header">User Profile</div>
                <div className="card-body">
                    <h6>Name: {use.name}</h6>
                    <h6> Email id: {use.email}</h6>
                </div>
            </div>
        </div>
    )
}

export default User
