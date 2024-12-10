/**
 * @swagger
 * tags:
 *  name : Users
 *  description : User methods like updating user info , get profile and etc.
 */

/**
 * @swagger
 * components:
 *  schemas:
 *      Deposit:
 *          type : object
 *          required: 
 *              -   amount
 *          properties:
 *              amount :
 *                  type : number
 *      UpdateInfo:
 *          type : object
 *          properties:
 *              firstname : 
 *                      type : string
 *              lastname : 
 *                      type : string
 *              email :
 *                      type : string
 *              nationalCode : 
 *                      type : string
 *              gender : 
 *                  type : string
 *                  enum : 
 *                      -   مرد
 *                      -   زن
 *              birthDate:
 *                  type : date
 *                  format : YYYY-MM-DD
 *                  example : 1403-9-18
 */

/**
 * @swagger
 * components:
 *  schemas:
 *      UpdateCreditInfo :
 *            type : object
 *            properties:
 *               creditNumber:
 *                  type : string
 *               shabaNumber : 
 *                  type : string
 *               accountNumber:
 *                  type : string
 */

/**
 * @swagger
 * /user/getProfile:
 *  get:
 *      summary : get user's profile
 *      tags:
 *          -   Users
 *      responses:
 *          200:
 *              description : Ok.
 * /user/deposit:
 *  post:
 *      summary : deposit to user's wallet.
 *      tags:
 *          -   Users
 *      requestBody:
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref : "#/components/schemas/Deposit"
 *      responses:
 *          200 : 
 *              description : Ok.
 * 
 * /user/update-info:
 *  put:
 *      summary : update or insert user's personal information,
 *      tags:
 *          -   Users
 *      requestBody:
 *          content:
 *             application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref : "#/components/schemas/UpdateInfo"
 *      responses:
 *          200:
 *              description : Ok
 * 
 * /user/update-credit-info:
 *  put:
 *      summary : update or insert user's credit info
 *      tags:
 *          -   Users
 *      requestBody:
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref:  "#/components/schemas/UpdateCreditInfo"
 *      responses:
 *          200:
 *              description : Ok.
 */