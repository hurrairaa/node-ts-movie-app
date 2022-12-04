"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
/** source/routes/controllers.ts */
const express_1 = __importDefault(require("express"));
const controllers_1 = __importDefault(require("../controllers/controllers"));
const router = express_1.default.Router();
router.post('/test', controllers_1.default.test);
//router.post('/search', controller.search);
router.post('/account/create', controllers_1.default.createAccount);
router.get('/login', controllers_1.default.login);
router.get('/search/title', controllers_1.default.searchByTitle);
router.get('/search/actor', controllers_1.default.searchByActor);
router.get('/movies/actor', controllers_1.default.getMoviesByActor);
router.get('/movies/id', controllers_1.default.getMovieInfoById);
router.get('/actors/movie', controllers_1.default.getActorInfoByMovieId);
router.get('/watchlist', controllers_1.default.getWatchList);
router.post('/watchlist/add', controllers_1.default.addToWatchList);
router.post('/watchlist/remove', controllers_1.default.removeFromWatchList);
router.post('/rating', controllers_1.default.addRating);
module.exports = router;
