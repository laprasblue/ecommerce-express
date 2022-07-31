import { connect, connection } from 'mongoose';

const mongoConnection = () => {
  const MONGO_URI = process.env.MONGO_URI!;
  connect(MONGO_URI);

  connection.on('connected', () => {
    console.log(`Mongoose connection open to ${MONGO_URI}`);
  });

  connection.on('error', (err) => {
    console.error(`Mongoose connection error: ${err}`);
  });

  connection.on('disconnected', () => {
    console.error('Mongoose connection disconnected');
  });

  process.on('SIGINT', () => {
    connection.close(() => {
      console.log('Mongoose connection disconnected through app termination');
      process.exit(0);
    });
  });
};

export default mongoConnection;
