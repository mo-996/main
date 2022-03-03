import * as types from '../types/phoneType'
import { IPhone } from '../../utils/TypeScript'

const phoneReducer = (
  state: IPhone[] = [], action: types.IPhoneType
): IPhone[] => {
  switch (action.type) {
    case types.CREATE_PHONE:
      return [action.payload, ...state]

    case types.GET_PHONES:
      return action.payload

    case types.UPDATE_PHONE:
      return state.map(item => (
        item._id === action.payload._id
        ? { ...item, phoneNUmb: action.payload.phoneNUmb, 
            proveName: action.payload.proveName}
        : item
      ))

    case types.DELETE_PHONE:
      return state.filter(item => item._id !== action.payload)
      
    default:
      return state;
  }
}

export default phoneReducer;