import { IPhone } from '../../utils/TypeScript'

export const CREATE_PHONE = 'CREATE_PHONE'
export const GET_PHONES = 'GET_PHONES'
export const UPDATE_PHONE = 'UPDATE_PHONE'
export const DELETE_PHONE = 'DELETE_PHONE'


export interface ICreatePhon{
  type: typeof CREATE_PHONE
  payload: IPhone
}

export interface IGetPhones{
  type: typeof GET_PHONES
  payload: IPhone[]
}

export interface IUpdatePhone{
  type: typeof UPDATE_PHONE
  payload: IPhone
}

export interface IDeletePhone{
  type: typeof DELETE_PHONE
  payload: string
}

export type IPhoneType = 
| ICreatePhon 
| IGetPhones
| IUpdatePhone
| IDeletePhone
