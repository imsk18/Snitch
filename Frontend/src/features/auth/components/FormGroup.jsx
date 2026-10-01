import React from 'react'

const FormGroup = ({type=Text,label , onChange,value,placeholder}) => {
  return (
    <div className='FormGroup'>
      <label htmlFor="{label}">{label}</label>
      <input
       type="text"
       value={value}
       placeholder={placeholder}
       id={label}

       onChange={onChange}
       />

    </div>
  )
}

export default FormGroup