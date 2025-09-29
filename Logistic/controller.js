import express from "express";
import { getLogisticInfo } from "./service.js";  

const logisticRoute=express.Router();
logisticRoute.get("/getLogisticInfo/:name",getLogisticInfo);

export default logisticRoute;