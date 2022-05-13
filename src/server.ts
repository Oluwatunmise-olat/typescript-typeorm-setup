import * as http from "http";

import app from "./app";
import { AppDataSource } from "./data-source";

const PORT = parseInt(process.env.PORT || "5000");

http.createServer(app).listen(PORT, () => {
  AppDataSource.initialize()
    .then((_) => {
      console.log(`server running on port ${PORT}`);
    })
    .catch((err) => console.log(`Failed to connect to DB ${err}`));
});
