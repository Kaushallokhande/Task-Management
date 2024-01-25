import React from 'react'

const Alertx = (props) => {
    return (
        <div>
            {props.alert && <div className={`alert alert-${props.alert.type}`} role="alert">
                <strong>{props.alert.mss}</strong>
            </div>}
        </div>
    )
}

export default Alertx
