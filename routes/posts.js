import { Router } from 'express'
import * as postCtrl from '../controllers/posts.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

// ========= Public Routes ========= 
router.get('/', postCtrl.index)
router.get('/:id', postCtrl.show)
// router.use(decodeUserFromToken)
// router.put('/:id', checkAuth, postCtrl.update)



// ========= Protected Routes ========= 
router.use(decodeUserFromToken)
router.post('/', checkAuth, postCtrl.create)
router.put('/:id', checkAuth, postCtrl.update)
router.delete('/:id', checkAuth, postCtrl.delete)

export {
    router
}