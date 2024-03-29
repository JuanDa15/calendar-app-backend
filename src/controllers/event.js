const { response, request } = require('express');

const CalendarEvent = require('../models/event');
const { serverError } = require('../utils/server-error');
const httpResponse = require('../utils/httpResponse');

const getEvents = async (req, res = response) => {
  try {
    const events = await CalendarEvent.find().populate('user', '_id name');
    res.json(
      httpResponse(true, 'Events list', {
        count: events.length,
        list: events,
      })
    );
  } catch (error) {
    serverError(error);
  }
};

const getEvent = async (req, res = response) => {
  const eventId = req.params.id;
  try {
    const event = await CalendarEvent.findOne({ _id: eventId }).populate(
      'user',
      '_id name'
    );
    res.json(httpResponse(true, 'Events list', event));
  } catch (error) {
    serverError(error);
  }
};

const createEvent = async (req = request, res = response) => {
  const event = new CalendarEvent({ ...req.body, user: req.uid });

  try {
    const savedEvent = await event.save();

    res.json(
      httpResponse(true, 'event created successfully', savedEvent.toJSON())
    );
  } catch (error) {
    serverError(error);
  }
};

const updateEvent = async (req, res = response) => {
  const eventId = req.params.id;
  const body = req.body;
  try {
    const event = await CalendarEvent.findById(eventId);

    if (!event)
      return res.status(404).json(httpResponse(false, 'Event not found'));

    if (event.user.toString() !== req.uid)
      return res.status(401).json(httpResponse(false, 'Unauthorized'));

    const newEvent = await CalendarEvent.findByIdAndUpdate(
      eventId,
      {
        ...body,
      },
      { new: true }
    );

    res.json(httpResponse(true, 'Event updated', newEvent));
  } catch (error) {
    serverError(error);
  }
};

const deleteEvent = async (req, res = response) => {
  const eventId = req.params.id;
  try {
    const event = await CalendarEvent.findById(eventId);

    if (!event)
      return res.status(404).json(httpResponse(false, 'Event not found'));

    if (event.user.toString() !== req.uid)
      return res.status(401).json(httpResponse(false, 'Unauthorized'));

    await CalendarEvent.findByIdAndDelete(eventId);

    res.json(httpResponse(true, 'Event deleted'));
  } catch (error) {
    serverError(error);
  }
};

module.exports = {
  getEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
};
