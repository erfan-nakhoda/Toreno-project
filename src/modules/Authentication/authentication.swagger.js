/**
 * @swagger
 * tags:
 *  name : Authentication
 *  description : Authenticating users.
 */


/**
 * @swagger
 * components:
 *  schemas:
 *      SendOTP:
 *          type : object
 *          required : 
 *              -   number
 *          properties:
 *              number:
 *                  type : string
 *      CheckOTP:
 *          type : object
 *          required:
 *               -  number
 *               -  code
 *          properties:
 *              number:
 *                  type : string
 *              code:
 *                  type : string
 */

/**
 * @swagger
 * /auth/send-otp:
 *  post:
 *      summary : send otp(one time password) to a user
 *      tags:
 *          -   Authentication
 *      requestBody :
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref : "#/components/schemas/SendOTP"
 *      responses:
 *          200:
 *              description : ok.
 *          201:
 *              description : created.
 * /auth/check-otp:
 *  post:
 *      summary : checking user's otp(one time password)
 *      tags:
 *          -   Authentication
 *      requestBody:
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: "#/components/schemas/CheckOTP"
 *      responses:
 *          200:
 *              description : OK.
 * /auth/logout:
 *  get:
 *      summmary : user log out.
 *      tags:
 *          -   Authentication
 *      responses:
 *          200:
 *              description : ok.
 */