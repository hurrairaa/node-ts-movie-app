/** source/routes/controllers.ts */
import express from 'express';
import controller from '../controllers/controllers';

const router = express.Router();

router.post('/test', controller.test);

//router.post('/search', controller.search);
router.post('/account/create', controller.createAccount);
router.get('/login', controller.login);
router.get('/search/title', controller.searchByTitle)
router.get('/search/actor', controller.searchByActor);
router.get('/movies/actor', controller.getMoviesByActor);
router.get('/movies/id', controller.getMovieInfoById);
router.get('/actors/movie', controller.getActorInfoByMovieId);
router.get('/watchlist', controller.getWatchList);
router.post('/watchlist/add', controller.addToWatchList);
router.post('/watchlist/remove', controller.removeFromWatchList);
router.post('/rating', controller.addRating)

export = router;