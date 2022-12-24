const createJobs = async ( req, res ) => {
    res.send( 'created job' )
}
const deleteJobs = async ( req, res ) => {
    res.send( 'job deleted' )
}
const getAllJobs = async ( req, res ) => {
    res.send( 'get all jobs' )
}
const updateJobs = async ( req, res ) => {
    res.send( 'job Updated' )
}
const showStats = async ( req, res ) => {
    res.send( 'job stats' )
}
export { createJobs, deleteJobs, getAllJobs, updateJobs, showStats }