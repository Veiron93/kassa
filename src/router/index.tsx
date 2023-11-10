import { createBrowserRouter } from "react-router-dom";

import app from "./app";
import auth from "./auth";

const router = createBrowserRouter([...app, ...auth]);

export default router;
