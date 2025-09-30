import express from "express";
import { getAllocationInfo } from "./service.js";

const allocationRoute=express.Router();
allocationRoute.get("/getAllocationInfo/:name",getAllocationInfo);

export default allocationRoute;