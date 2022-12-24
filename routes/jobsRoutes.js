import express from "express";
import { getAllJobs, createJobs, deleteJobs, showStats, updateJobs } from "../controller/jobsController.js";

const router = express.Router()

router.route( '/' ).post( createJobs ).get( getAllJobs );
// remember about :id, this has to be the last route other wise request to stats will go to :id as parameter of stats
router.route( '/stats' ).get( showStats );
router.route( '/:id' ).delete( deleteJobs ).patch( updateJobs );

export default router;