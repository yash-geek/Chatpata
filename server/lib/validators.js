import { body, validationResult, check, param, query } from "express-validator";
import { ErrorHandler } from "../utils/utility.js";
const validateHandler = (req, res, next) => {
    const errors = validationResult(req)
    const errorMessage = errors.array().map((error) => error.msg).join(", ") //array of errormessag
    if (errors.isEmpty())
        return next()
    else
        return next(new ErrorHandler(errorMessage, 400))
}
const registerValidator = () => [
    body("name", "Please Enter Name").notEmpty(),
    body("username")
        .notEmpty()
        .withMessage("Enter valid username")
        .isLowercase()
        .withMessage("Uppercase letters are not allowed in username"),
    body("bio", "Please Enter Bio").notEmpty(),
    body("password", "Please Enter Password").notEmpty(),
];
const loginValidator = () => [
    body("username")
        .notEmpty()
        .withMessage("Enter valid username")
        .isLowercase()
        .withMessage("Uppercase letters are not allowed in username"),
    body("password", "Please Enter Password").notEmpty(),
];
const newGroupValidator = () => [
    body("name", "Please Enter Name").notEmpty(),
    body("members")
        .notEmpty()
        .withMessage("Please Add Members")
        .isArray({ min: 2, max: 100 })
        .withMessage("Members must be between 2-100"),
];
const addMemberValidator = () => [
    body("chatId", "Please Enter Chat ID").notEmpty(),
    body("members")
        .notEmpty()
        .withMessage("Please Add Members")
        .isArray({ min: 1, max: 97 })
        .withMessage("Members must be between 1-97"),
];
const removeMemberValidator = () => [
    body("chatId", "Please Enter Chat ID").notEmpty(),
    body("userId", "Please Enter User ID").notEmpty(),

];
const sendAttachmentsValidator = () => [
    body("chatId", "Please Enter Chat ID").notEmpty()
];
const chatIdValidator = () => [
    param("id", "Please Enter Chat ID").notEmpty(),
];
const addAdminValidator = () => [
    body("chatId", "Please Enter Chat ID").notEmpty(),
];
const renameValidator = () => [
    param("id", "Please Enter Chat ID").notEmpty(),
    body("name", "Please Enter New Name").notEmpty(),
];
const sendRequestValidator = () => [
    body("userId", "Please Enter User Id").notEmpty(),
];
const acceptRequestValidator = () => [
    body("requestId", "Please Enter request Id").notEmpty(),
    body("accept")
        .notEmpty()
        .withMessage("Please Accept or Reject")
        .isBoolean()
        .withMessage("Accept must be boolean"),
    ,
];
const adminLoginValidator = () => [
    body("secretKey", "Please Enter Secret Key").notEmpty(),
];



export {
    registerValidator,
    validateHandler,
    loginValidator,
    newGroupValidator,
    addMemberValidator,
    removeMemberValidator,
    sendAttachmentsValidator,
    chatIdValidator,
    renameValidator,
    sendRequestValidator,
    acceptRequestValidator,
    adminLoginValidator,
    addAdminValidator,

}