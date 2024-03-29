const {connect} = require('mongoose');

const dbConnection = async () => {
  try {
    await connect(process.env.DB_CNN, {
      dbName: 'Calendar',
    });
    console.log('DB Online');
  } catch (error) {
    console.log(error);
    throw new Error('Error while initializing the DB');
  }
};

module.exports = {
  dbConnection,
};
