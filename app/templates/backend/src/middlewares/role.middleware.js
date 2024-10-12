export const ROLES = {
    superAdmin: 'superAdmin',
    ramalingamAdmin: 'ramalingamAdmin',
  };
  
  export const checkRole = (...roles) => (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).send('Unauthorized');
      }
      // console.log(roles, "from roles midd")
      // console.log(req.user, "from roles midd")
      const hasRole = roles.find(role => req.user.role === role);
      if (!hasRole) {
        return res.status(403).send('You are not allowed to make this request.');
      }
      return next();
  
    } catch (error) {
      next(error);
    }
  };