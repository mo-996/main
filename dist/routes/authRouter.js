"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = __importDefault(require("../controllers/authController"));
const valid_1 = require("../middleware/valid");
const auth_1 = __importDefault(require("../middleware/auth"));
const router = express_1.default.Router();
router.post('/register', valid_1.validRegister, authController_1.default.register);
router.post('/active', authController_1.default.activeAccount);
router.post('/login', authController_1.default.login);
router.post('/logout', auth_1.default, authController_1.default.logout);
router.get('/refresh_token', authController_1.default.refreshToken);
router.get('/google_login', authController_1.default.googleLogin);
exports.default = router;
