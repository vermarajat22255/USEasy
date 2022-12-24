import React from 'react'

const FormRow=({type,name,value,onChange,labelText}) => {
    return (
        <div className='form-row'>
            <label htmlFor={name} className='form-label'>
                {labelText||name}
            </label>
            <input type={type} name={name} onChange={onChange} className='form-input' value={value} />
        </div>
    );
}

export default FormRow