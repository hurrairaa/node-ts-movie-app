"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const querries_1 = __importDefault(require("../sql/querries"));
const test = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("test");
    res.status(200).send("test").end();
});
const createAccount = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const out = querries_1.default.createUser([req.body.fname, req.body.lname, req.body.email, req.body.password]);
    console.log(out);
    res.status(200).send("Account Created!").end();
});
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.query.email + " " + req.query.password);
    const out = yield querries_1.default.login([String(req.query.password), String(req.query.email)]);
    console.log(out);
    if (JSON.parse(JSON.stringify(out))[0]['login']) {
        res.status(200).send("Logged In!").end();
    }
    else {
        res.status(401).send("Invalid Login").end();
    }
});
const searchByTitle = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Search criteria: " + req.query.title);
    const out = yield querries_1.default.searchByTitle([String(req.query.title)]);
    res.status(200).send(JSON.stringify(out)).end();
});
const searchByActor = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Search criteria: " + req.query.actor);
    const out = yield querries_1.default.searchByActor([String(req.query.actor)]);
    res.status(200).send(JSON.stringify(out)).end();
});
const getMoviesByActor = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Search criteria: " + req.query.aid);
    const out = yield querries_1.default.getMoviesByActor([String(req.query.aid)]);
    res.status(200).send(JSON.stringify(out)).end();
});
const getMovieInfoById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Search criteria: " + req.query.mpid);
    const out = yield querries_1.default.getMovieInfoById([String(req.query.mpid)]);
    res.status(200).send(JSON.stringify(out)).end();
});
const getActorInfoByMovieId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Search criteria: " + req.query.mpid);
    const out = yield querries_1.default.getActorInfoByMovieId([String(req.query.mpid)]);
    res.status(200).send(JSON.stringify(out)).end();
});
const getWatchList = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Search criteria: " + req.query.uid);
    const out = yield querries_1.default.getWatchList([String(req.query.uid)]);
    res.status(200).send(JSON.stringify(out)).end();
});
const addToWatchList = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Search criteria: " + req.body.uid + " " + req.body.mpid);
    const out1 = yield querries_1.default.ifWatchListExists([req.body.uid]);
    if (!JSON.parse(JSON.stringify(out1))[0]['exist']) {
        yield querries_1.default.createWatchList([req.body.uid]);
    }
    const out2 = yield querries_1.default.ifExistsInWatchList([req.body.uid, req.body.mpid]);
    console.log(out2);
    if (!JSON.parse(JSON.stringify(out2))[0]['exist']) {
        yield querries_1.default.addToWatchList([req.body.mpid, req.body.uid]);
        res.status(200).send("Added To Watchlist!").end();
    }
    else {
        res.status(304).send("Already In Watchlist!").end();
    }
});
const removeFromWatchList = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Search criteria: " + req.body.uid + " " + req.body.mpid);
    yield querries_1.default.removeFromWatchList([req.body.mpid, req.body.uid]);
    res.status(200).send("Removed From Watchlist!").end();
});
const addRating = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Search criteria: " + req.body.mpid + " " + req.body.rating);
    yield querries_1.default.addRating([req.body.mpid], [req.body.rating, req.body.mpid]);
    res.status(200).send("Rating Updated!").end();
});
exports.default = {
    test,
    createAccount,
    login,
    searchByTitle,
    searchByActor,
    getWatchList,
    addToWatchList,
    removeFromWatchList,
    addRating,
    getMoviesByActor,
    getMovieInfoById,
    getActorInfoByMovieId
};
