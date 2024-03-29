const {Schema, model} = require('mongoose');

const EventSchema = Schema(
    {
      title: {
        type: String,
        required: true,
      },
      notes: {
        type: String,
      },
      start: {
        type: Date,
        required: true,
      },
      end: {
        type: Date,
        required: true,
      },
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
    },
    {
      toJSON: {
        transform: function(doc, ret) {
          delete ret.__v;
          return ret;
        },
      },
    },
);

module.exports = model('Event', EventSchema);
