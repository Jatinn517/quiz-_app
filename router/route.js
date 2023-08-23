import { Router } from 'express'
const router = Router();

// import controller
import * as controller from '../controller/controllers.js'

//Questions Routes from API
// router.get('/questions',controller.getQuestions)
// router.post('/questions',controller.insertQuestions)

router.route('/questions')
    .get(controller.getQuestions)
    .post(controller.insertQuestions)
    .delete(controller.dropQuestions)

router.route('/result')
    .get(controller.getResult)
    .post(controller.storeResult)
    .delete(controller.dropResult)

export default router;
