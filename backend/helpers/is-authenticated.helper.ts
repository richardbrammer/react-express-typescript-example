export const isAuthenticated = (req: any, res: any, next: any) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.send(403);
}