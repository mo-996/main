import { Request, Response } from 'express'
import Phones from '../models/numModel'
import { IReqAuth } from '../config/interface'
import bcrypt from 'bcrypt'

const phoneController = {
  createCategoryPhones: async (req: IReqAuth, res: Response) => {
    if(!req.user) return res.status(400).json({msg: "Invalid Authentication."})
    try {

      const { phoneNUmb, proveName } = req.body

      const newPhone = new Phones({ phoneNUmb, proveName })
      await newPhone.save()

      res.json({ newPhone })
    } catch (err: any) {
      let errMsg;

      if(err.code === 11000){
        errMsg = Object.values(err.keyValue)[0] + " tersedia."
      }else{
        let name = Object.keys(err.errors)[0]
        errMsg = err.errors[`${name}`].message
      }

      return res.status(500).json({ msg: errMsg })
    }
  },
  getPhones: async (req: Request, res: Response) => {
    try {
      const phones = await Phones.find().sort("-createdAt")
      res.json({ phones })
    } catch (err: any) {
      return res.status(500).json({ msg: err.message })
    }
  },
  updatePhone: async (req: IReqAuth, res: Response) => {
    if(!req.user) return res.status(400).json({msg: "Invalid Authentication."})

    try {
      const phone = await Phones.findOneAndUpdate({
        _id: req.params.id
      }, { phoneNUmb: (req.body.phoneNUmb), proveName: (req.body.proveName) })

      res.json({ msg: "Update Success!" })
    } catch (err: any) {
      return res.status(500).json({ msg: err.message })
    }
  },
  deletePhone: async (req: IReqAuth, res: Response) => {
    if(!req.user) return res.status(400).json({msg: "Invalid Authentication."})

    try {
      const phone = await Phones.findByIdAndDelete(req.params.id)
      if(!phone) 
        return res.status(400).json({msg: "Phones tidak tersedia."})

      res.json({ msg: "Delete Success!" })
    } catch (err: any) {
      return res.status(500).json({ msg: err.message })
    }
  }
}


export default phoneController;