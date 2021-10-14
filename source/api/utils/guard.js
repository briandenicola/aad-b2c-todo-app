const routeGuard = (accessMatrix) => {
    return (req, res, next) => {

        if (req.path.includes(accessMatrix.todolist.path)) {
            if (!accessMatrix.todolist.methods.includes(req.method)) {
                return res.status(403).json({error: 'Method not allowed'});
            }
        } else if (req.path.includes(accessMatrix.dashboard.path)) {
            if (!accessMatrix.dashboard.methods.includes(req.method)) {
                return res.status(403).json({error: 'Method not allowed'});
            }
        } else {
            return res.status(403).json({error: 'Unrecognized path'});
        }
    
        next();
    }
}

module.exports = routeGuard;