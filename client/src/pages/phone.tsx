import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { FormSubmit, RootStore, IPhone } from '../utils/TypeScript'

import { createPhone, updatePhone, deletePhone } from '../redux/actions/phoneAction'

const Phone = () => {
    const [phoneNUmb, SetPhoneNUmb] = useState('')
    const [proveName, SetProveName] = useState('')
    const [edit, setEdit] = useState<IPhone | null>(null)
  
    const { auth, phones } = useSelector((state: RootStore) => state)
    const dispatch = useDispatch()
  
    useEffect(() => {
      if(edit) 
        SetPhoneNUmb(edit.phoneNUmb)
    },[edit])

    useEffect(() => {
        if(edit) 
        SetProveName(edit.proveName)
      },[edit])
  
    const handleSubmit = (e: FormSubmit) => {
      e.preventDefault()
      if(!auth.access_token || !phoneNUmb) return;
  
      if(edit){
        if(edit.phoneNUmb === phoneNUmb) return;
        const data = {...edit, phoneNUmb, proveName}
        dispatch(updatePhone(data, auth.access_token))
      }else{
        dispatch(createPhone(phoneNUmb, proveName, auth.access_token))
      }
      SetPhoneNUmb('')
      SetProveName('')
      setEdit(null)
    }
  
  
    const handleDelete = (id: string) => {
      if(!auth.access_token) return;
      if(window.confirm('Are you sure to delete this phone?')){
        dispatch(deletePhone(id, auth.access_token))
      }
    }

        return (
            <div className="row">
            <div className="col-md-6">
              <h5>Create</h5>
              <form onSubmit={handleSubmit}>
                <div className="form-group position-relative">
                    <input type="number" className="form-control" id="phone"
                    value={phoneNUmb} name="phoneNUmb" onChange={e => SetPhoneNUmb(e.target.value)}/>

                    <small className="text-muted position-absolute"
                    style={{ bottom: 0, right: '3px', opacity: '0.3'}}>
                    {phoneNUmb.length}/25
                    </small>
                </div>

                <div className="form-group my-3">

                    <input type="text" className="form-control" id="phone"
                    value={proveName} name="proveName" onChange={e => SetProveName(e.target.value)}/>

                   
                </div>


                        <button className="btn btn-dark mt-2 d-block mx-auto"> submit </button>
                    
                
                
                </form>
            </div>
    
            <div className="col-md-6">
              <h5>Preview</h5>
              {
          phones.map(phone => (
            <div className="category_row" key={phone._id}>
              <p className="m-0 text-capitalize">{phone.proveName}</p>
              <p className="m-0 text-capitalize">{phone.phoneNUmb}</p>
              <div>
                <i className="fas fa-edit mx-2"
                onClick={() => setEdit(phone)} />
                <i className="fas fa-trash-alt"
                onClick={() => handleDelete(phone._id)} />
              </div>
            </div>
          ))
        }
            </div>
          </div>  
        )
}

export default Phone