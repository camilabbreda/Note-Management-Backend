"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_user_1 = __importDefault(require("../domain/controller/controller-user"));
const auth_middleware_1 = require("../common/util/auth/auth-middleware");
const controller_note_1 = __importDefault(require("../domain/controller/controller-note"));
const router = (0, express_1.Router)();
router.get('/user', controller_user_1.default.getAllUsers);
router.get('/user/:_id', controller_user_1.default.getUserById);
router.post('/user/register', controller_user_1.default.createUser);
router.post('/user/login', controller_user_1.default.loginUser);
router.put('/user/register/:_id', auth_middleware_1.authMiddleware, controller_user_1.default.updateUser);
router.delete('/user/register/:_id', auth_middleware_1.authMiddleware, controller_user_1.default.deleteUser);
router.get('/note/user/:userId', auth_middleware_1.authMiddleware, controller_note_1.default.getNotesByUserId);
router.get('/note', controller_note_1.default.getAllNotes);
router.get('/note/:_id', auth_middleware_1.authMiddleware, controller_note_1.default.getNoteById);
router.post('/note', auth_middleware_1.authMiddleware, controller_note_1.default.createNote);
router.put('/note/:_id', auth_middleware_1.authMiddleware, controller_note_1.default.updateNote);
router.delete('/note/:_id', auth_middleware_1.authMiddleware, controller_note_1.default.deleteNote);
exports.default = (app) => {
    app.use(router);
};
