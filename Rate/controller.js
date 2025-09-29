import express from "express";
import { getRateInfo } from "./service.js";  

const rateRoute=express.Router();
rateRoute.get("/getRateInfo/:name",getRateInfo);

export default rateRoute;