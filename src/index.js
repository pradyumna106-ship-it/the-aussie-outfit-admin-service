import 'dotenv/config';
import { connectAdminDatabase } from './config/database.js';
import app from './app.js';


const startServer = async () => {
  try {
    await connectAdminDatabase();

    app.on("error", (error) => {
      console.error("ERROR", error);
      throw error;
    });

    const port = process.env.PORT || 5001;

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("MongoDB Connection failed", error);
    process.exit(1);
  }
};


startServer();