import { Router } from "express";
import { apiRoutes } from "./api";
import { htmlRoutes } from "./html";

export const router = Router();

router.use("/api", apiRoutes);

router.use(htmlRoutes);
