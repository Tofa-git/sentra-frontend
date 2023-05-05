import React from 'react'

export default function Input({ type = 'text', label = '', isInvalid = false, required = true, errors = [], bgColor = 'text-light' }) {
  return (
    <div className='mt-2'>
      <div className={`form-label ${label !== '' ? 'text-dark' : bgColor}`}>
        {label !== '' ? label : '-'}
      </div>
      <div className='input-group-sm'>
        <input type={type} className={`form-control ${isInvalid ? 'is-invalid' : ''}`} required={required} />
      </div>
      {errors.map((v, i) => (
        <div key={i} className="form-text text-danger">{v}</div>
      ))}
    </div>
  )
}
