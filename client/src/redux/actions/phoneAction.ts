import { Dispatch } from 'redux'
import { ALERT, IAlertType } from '../types/alertType'

import { postAPI, getAPI, patchAPI, deleteAPI } from '../../utils/FetchData'
import { IPhone } from '../../utils/TypeScript'

import { 
  CREATE_PHONE, 
  IPhoneType, 
  GET_PHONES,
  UPDATE_PHONE,
  DELETE_PHONE
} from '../types/phoneType'

import { checkTokenExp } from '../../utils/checkTokenExp'

export const createPhone = (phoneNUmb: string, proveName: string, token: string) => 
async(dispatch: Dispatch<IAlertType | IPhoneType>) => {
  const result = await checkTokenExp(token, dispatch)
  const access_token = result ? result : token
  try {
    dispatch({ type: ALERT, payload: { loading: true }})

    const res = await postAPI('phone', { phoneNUmb, proveName }, access_token)

    dispatch({
      type: CREATE_PHONE,
      payload: res.data.newPhone
    })

    dispatch({ type: ALERT, payload: { loading: false }})
  } catch (err: any) {
    dispatch({ type: ALERT, payload: { errors: err.response.data.msg }})
  }
}

export const getPhones = () => 
async(dispatch: Dispatch<IAlertType | IPhoneType>) => {
  try {
    dispatch({ type: ALERT, payload: { loading: true }})

    const res = await getAPI('phone')
    
    dispatch({
      type: GET_PHONES,
      payload: res.data.phones
    })

    dispatch({ type: ALERT, payload: { loading: false }})
  } catch (err: any) {
    dispatch({ type: ALERT, payload: { errors: err.response.data.msg }})
  }
}

export const updatePhone = (data: IPhone, token: string) => 
async(dispatch: Dispatch<IAlertType | IPhoneType>) => {
  const result = await checkTokenExp(token, dispatch)
  const access_token = result ? result : token
  try {

    dispatch({ type: UPDATE_PHONE, payload: data })

    await patchAPI(`phone/${data._id}`, { 
        phoneNUmb: data.phoneNUmb, proveName: data.proveName 
    }, access_token)

  } catch (err: any) {
    dispatch({ type: ALERT, payload: { errors: err.response.data.msg }})
  }
}

export const deletePhone = (id: string, token: string) => 
async(dispatch: Dispatch<IAlertType | IPhoneType>) => {
  const result = await checkTokenExp(token, dispatch)
  const access_token = result ? result : token
  try {
    
    dispatch({ type: DELETE_PHONE, payload: id })
    await deleteAPI(`phone/${id}`, access_token)

  } catch (err: any) {
    dispatch({ type: ALERT, payload: { errors: err.response.data.msg }})
  }
}