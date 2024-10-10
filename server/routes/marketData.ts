import Router from 'express'
import * as db from '../db/market'
import { Symbols, Symbol } from '../../models/market'

const router = Router()

//GET 'api/v1/market/symbols
router.get('/', async (req, res) => {
  try {
    const symbols = await db.getAllSymbols()
    res.json(symbols)
  } catch (error) {
    console.error(`Data base error ${error}`)
    res.sendStatus(500)
  }
})

//GET 'api/v1/market/symbol:type

//POST '/api/v1/market/symbols
router.post('/', async (req, res) => {
  const data: Symbols = req.body
  try {
    await db.addSymbols(data)
    res.sendStatus(200)
  } catch (error) {
    console.error(`Database error ${error}`)
    res.sendStatus(500)
  }
})
export default router
