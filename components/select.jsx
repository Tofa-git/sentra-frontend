import React from 'react'

export default function Select({ multiple = false, label = '', isInvalid = false, required = true, errors = [], bgColor = 'text-light' }) {
  return (
    <div className='mt-2'>
      <div className={`form-label ${label !== '' ? 'text-dark' : bgColor}`}>
        {label !== '' ? label : '-'}
      </div>
      <div className='input-group-sm'>
        <select class={`form-select form-select-sm ${isInvalid ? 'is-invalid' : ''}`} required={required} multiple={multiple}>
          <option selected>Open this select menu</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
      </div>
      {errors.map(v => (
        <div className="form-text text-danger">{v}</div>
      ))}
    </div>
  )
}
