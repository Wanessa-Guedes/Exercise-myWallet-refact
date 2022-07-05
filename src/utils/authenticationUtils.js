
export function authentication(authorization){
    const token = authorization.replace("Bearer ", "");
    if (!token) {
            throw {type:"not authorized", cod:"401"}
        }
    
        let user;
    
        try {
            user = jwt.verify(token, process.env.JWT_SECRET);
        } catch {
            throw {type:"not authorized", cod:"401"}
        }

        return {token, user};
}