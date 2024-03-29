// Host + /api/v1/event

const {check} = require('express-validator');
const {
  getEvents,
  createEvent,
  getEvent,
  updateEvent,
  deleteEvent,
} = require('../controllers/event');
const {validateJWT} = require('../middlewares/validate-jwt');
const {checkFields} = require('../middlewares/check-fields');
const {isDate} = require('../utils/isDate');

const router = require('express').Router();

router.use([validateJWT]);

router.get('/', getEvents);

router.post(
    '/',
    [
      check('title', 'Title is required').not().isEmpty(),
      check('start', 'start date is required').not().isEmpty(),
      check('end', 'end date is required').not().isEmpty(),
      check('start', 'should be a date').custom(isDate),
      check('end', 'should be a date').custom(isDate),
      checkFields,
    ],
    createEvent,
);

router.get('/:id', getEvent);

router.put('/:id', updateEvent);

router.delete('/:id', deleteEvent);

module.exports = router;
