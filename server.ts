import dotenv from 'dotenv';
import app from './src/app';
import mongoConnection from './src/utils/mongo-connection';

dotenv.config();
(async () => {
  const { PORT, MONGO_URI, ACCESS_TOKEN_SECRET } = process.env;
  if (
    PORT === undefined ||
    MONGO_URI === undefined ||
    ACCESS_TOKEN_SECRET === undefined
  ) {
    console.log('Please setup environment variables');
    process.exit(1);
  }
  mongoConnection();
  app.listen(PORT, () => console.log(`Server is running at ${PORT}`));
})();
