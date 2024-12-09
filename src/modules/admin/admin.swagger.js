/**
 * @swagger
 * tags:
 *  name : Admin panel
 *  description : routes that admin can access.
 */

/**
 * @swagger
 * components:
 *  schemas:
 *      FilterTransaction:
 *          type : object
 *          properties:
 *              Name :
 *                  type : string
 *              userID:
 *                  type : string
 *              orderID:
 *                  type : string
 *              date:
 *                  type : string
 *                  format : YYYY-MM-DD
 *                  example : 1403-9-19
 *      FilterUsers:
 *              type : object
 *              properties:
 *                  number : 
 *                      type : string
 *                  email :
 *                      type : string
 *                  firstname : 
 *                      type : string
 *                  lastname : 
 *                      type : string
 *                  nationalCode : 
 *                      type : string
 */

/**
 * @swagger
 * /admin/get-transactions:
 *  get:
 *      summary : get all tranactions which is exist
 *      tags:
 *        -  Admin panel
 *      responses:
 *          200:
 *              description : Ok.
 * /admin/filter-transaction:
 *  post:
 *      summary : filter transactions in the way you need.
 *      tags:
 *          -   Admin panel
 *      requestBody:
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref : "#/components/schemas/FilterTransaction"
 *      responses:
 *          200:
 *              description : Ok.
 * /admin/get-users:
 *  get:
 *      summary : get all users
 *      tags:
 *          -   Admin panel
 *      responses:
 *          200:
 *              description :   OK.
 * /admin/filter-users:
 *  post:
 *      summary : filter users in the way you need.
 *      tags:
 *          -   Admin panel
 *      requestBody :
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema :
 *                      $ref : "#/components/schemas/FilterUsers"
 *      responses:
 *          200:
 *              description :   Ok.
 */