import React,{ useState } from 'react'
export default props =>{
    const [value,setValue] = useState('')
    const ValueChangeHandler = event =>{
        setValue(event.target.value)
    }
    return (
        <div style={{width:"600px",margin:'auto',padding:'25px'}} className='input-group mb-3'>
            <input
             type='text'
             className='form-control'
             onChange={ValueChangeHandler}
             value={value}
             />
            <div className='input-group-prepend'>
                <button
                className='btn btn-primary btn-md'
                onClick={()=>props.onSearch(value)}
                >Seacrh
                </button>
            </div>             
        </div>
    )
}