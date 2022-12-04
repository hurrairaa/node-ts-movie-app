"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
/** source/routes/controllers.ts */
const express_1 = __importDefault(require("express"));
const posts_1 = __importDefault(require("../controllers/posts"));
const router = express_1.default.Router();
router.get('/posts', posts_1.default.getPosts);
router.post('/test', posts_1.default.test);
module.exports = router;
