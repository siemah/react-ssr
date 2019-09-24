/**
 * parse cookies list to an object  
 * @param {Application.Request} req request details
 * @param {Application.Response} res response object
 * @param {Application.NextFunction} next next funtion
 * @see expressjs 
 */
export const parseCookies = function (req, res, next) {
  const cookies = req.get('cookie');
  if(!!cookies) 
    req.cookies = cookies
      .split(';')
      .reduce((acc, e) => {
        let trimedVal = e.trim();
        let [key, val] = trimedVal.split('=');
        return {...acc, [key]: val};
      },{})
  next();
}