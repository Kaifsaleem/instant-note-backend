/**
 * @swagger
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      required:
 *        - name
 *        - email
 *        - password
 *      properties:
 *        id:
 *          type: string
 *          description: The auto-generated ID of the user
 *        name:
 *          type: string
 *          description: User's full name
 *        email:
 *          type: string
 *          format: email
 *          description: User's email address
 *        password:
 *          type: string
 *          format: password
 *          description: User's password (min 8 characters)
 *        role:
 *          type: string
 *          enum: [user, admin]
 *          default: user
 *          description: User's role
 *        createdAt:
 *          type: string
 *          format: date-time
 *          description: User creation timestamp
 *      example:
 *        name: John Doe
 *        email: john@example.com
 *        password: password123
 *        role: user
 * 
 *    Link:
 *      type: object
 *      required:
 *        - url
 *        - title
 *        - createdBy
 *      properties:
 *        id:
 *          type: string
 *          description: The auto-generated ID of the link
 *        url:
 *          type: string
 *          description: URL of the link
 *        title:
 *          type: string
 *          description: Title of the link
 *        description:
 *          type: string
 *          description: Description of the link
 *        createdBy:
 *          type: string
 *          description: ID of the user who created the link
 *        createdAt:
 *          type: string
 *          format: date-time
 *          description: Link creation timestamp
 *        updatedAt:
 *          type: string
 *          format: date-time
 *          description: Link update timestamp
 *      example:
 *        url: https://example.com
 *        title: Example Website
 *        description: An example website for testing
 *        createdBy: 60d21b4667d0d8992e610c85
 *
 *    Error:
 *      type: object
 *      properties:
 *        status:
 *          type: string
 *          enum: [fail, error]
 *          description: Error status
 *        message:
 *          type: string
 *          description: Error message
 *      example:
 *        status: fail
 *        message: User not found
 *
 *  responses:
 *    Unauthorized:
 *      description: Authentication information is missing or invalid
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Error'
 *          example:
 *            status: fail
 *            message: You are not logged in. Please log in to get access
 *    
 *    Forbidden:
 *      description: Not enough permissions to access the resource
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Error'
 *          example:
 *            status: fail
 *            message: You do not have permission to perform this action
 * 
 *    NotFound:
 *      description: The specified resource was not found
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Error'
 *          example:
 *            status: fail
 *            message: Resource not found
 *
 *    ValidationError:
 *      description: Request validation error
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Error'
 *          example:
 *            status: fail
 *            message: Email is required
 */
