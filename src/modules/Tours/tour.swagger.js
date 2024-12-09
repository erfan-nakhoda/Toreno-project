/**
 * @swagger
 * tags:
 *  name : Tours
 *  description : Tour apies (CRUD and etc.)
 */


/**
 * @swagger
 * components:
 *  schemas:
 *       CreateTour:
 *          type : object
 *          required:
 *              -   tourName
 *              -   capacity
 *              -   tourLeader
 *              -   departingTime
 *              -   arrivalTime
 *              -   origin
 *              -   destination
 *              -   transportBy
 *              -   price
 *          properties:
 *              tourName : 
 *                  type : string
 *              capacity:   
 *                  type : number
 *              price : 
 *                  type : number
 *              tourLeader:
 *                  type : string
 *              origin : 
 *                  type : string
 *              destination : 
 *                  type : string
 *              transportBy : 
 *                  type : string
 *                  enum :
 *                      -   اتوبوس
 *                      -   هواپیما
 *                      -   قطار
 *              departingTime : 
 *                  type : string
 *                  format : YYYY-MM-DD
 *                  example : 1403-9-14
 *              arrivalTime : 
 *                  type : string
 *                  format : YYYY-MM-DD
 *                  example : 1403-9-15
 *              insuranceType : 
 *                  type : string
 *       UpdateTour:
 *          type : object
 *          properties:
 *              tourName : 
 *                  type : string
 *              capacity:   
 *                  type : number
 *              price : 
 *                  type : number
 *              tourLeader:
 *                  type : string
 *              origin : 
 *                  type : string
 *              destination : 
 *                  type : string
 *              transportBy : 
 *                  type : string
 *                  enum :
 *                      -   اتوبوس
 *                      -   هواپیما
 *                      -   قطار
 *              departingTime : 
 *                  type : string
 *                  format : YYYY-MM-DD
 *                  example : 1403-9-14
 *              arrivalTime : 
 *                  type : string
 *                  format : YYYY-MM-DD
 *                  example : 1403-9-15
 *              insuranceType : 
 *                  type : string
 *       BuyTour : 
 *          type : object
 *          required:
 *              -   fullname
 *              -   gender
 *              -   birthDate
 *              -   nationalCode
 *          properties:
 *              fullname : 
 *                  type : string
 *              nationalCode : 
 *                  type : string
 *              gender : 
 *                  type : string
 *                  enum : 
 *                      -   مرد
 *                      -   زن
 *              birthDate:
 *                  type : string
 *                  format : date
 *                  example : 1385-8-28
 */

/**
 * @swagger
 * /tour/get:
 *  get:
 *      summary : get all Tours
 *      tags:
 *          -   Tours
 *      responses:
 *          200:
 *              description : OK.
 * /tour/create:
 *  post:
 *      summary : create a Tour
 *      tags:
 *          -   Tours
 *      requestBody:
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref : "#/components/schemas/CreateTour"
 *      responses:
 *          200:
 *              description: Ok.
 * 
 * /tour/update/{tourName}:
 *  put:
 *      summary : update a tour
 *      parameters:
 *          -   name : tourName
 *              in : path
 *      tags:
 *          -   Tours
 *      requestBody:
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref : "#/components/schemas/UpdateTour"
 *      responses:
 *          200:
 *              description : Ok.
 * /tour/buy/{tourID}:
 *  post:
 *      summary : buy a tour
 *      tags:
 *          -   Tours
 *      parameters:
 *          -   name : tourID
 *              in : path   
 *      requestBody:
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref : "#/components/schemas/BuyTour"
 *      responses:
 *         200:
 *              description : Ok.
 * 
 * /tour/filter:
 *  get:
 *      summary : filter tours by origin,destination and date of departing
 *      tags:
 *          -   Tours
 *      parameters:
 *          -   name : origin
 *              in   : query
 *              example : بوشهر
 *          -   name : destination
 *              in   : query
 *              example : شیراز
 *          -   name : departingTime
 *              in   : query
 *              schema:
 *                  type : string
 *                  format : YYYY-MM-DD
 *                  example : 1403-9-15
 *      responses:
 *          200:
 *              description : Ok
 * 
 * /tour/delete/{tourID}:
 *  delete:
 *      summary : delete a tour by its tourID
 *      tags:
 *          -   Tours
 *      parameters:
 *          -   name : tourID
 *              in : path
 *      responses:
 *          200:
 *              description : ok.
 */