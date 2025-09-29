import express from "express";
import { getAppInfo } from "./service.js";

const appRoute=express.Router();
appRoute.get("/getAppInfo/:name",getAppInfo);

export default appRoute;