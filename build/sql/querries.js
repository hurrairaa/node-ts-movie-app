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
Object.defineProperty(exports, "__esModule", { value: true });
const sql_1 = require("./sql");
const createUser = (params) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, sql_1.execute)("INSERT INTO USER (FNAME, LNAME, EMAIL, PASSWORD) VALUES (?, ?, ?, ?);", params);
});
const login = (params) => __awaiter(void 0, void 0, void 0, function* () {
    const x = (0, sql_1.execute)("SELECT ? = (SELECT PASSWORD FROM USER WHERE EMAIL = ?) AS login;", params);
    console.log(x);
    return x;
});
const searchByTitle = (params) => __awaiter(void 0, void 0, void 0, function* () {
    const x = (0, sql_1.execute)("SELECT MP.MPID, MP.TITLE FROM MOTIONPICTURE MP WHERE MP.TITLE LIKE CONCAT('%', ?, '%');", params);
    console.log(x);
    return x;
});
const searchByActor = (params) => __awaiter(void 0, void 0, void 0, function* () {
    const x = (0, sql_1.execute)("SELECT A.AID, A.NAME FROM ACTOR A WHERE A.NAME LIKE CONCAT('%', ?, '%');", params);
    console.log(x);
    return x;
});
const getMoviesByActor = (params) => __awaiter(void 0, void 0, void 0, function* () {
    const x = (0, sql_1.execute)("SELECT * FROM MOTIONPICTURE MP JOIN STAREDIN S on MP.MPID = S.MID WHERE S.AID = ?;", params);
    console.log(x);
    return x;
});
const getMovieInfoById = (params) => __awaiter(void 0, void 0, void 0, function* () {
    const x = (0, sql_1.execute)("SELECT * FROM MOTIONPICTURE MP WHERE MPID = ?;", params);
    console.log(x);
    return x;
});
const getActorInfoByMovieId = (params) => __awaiter(void 0, void 0, void 0, function* () {
    const x = (0, sql_1.execute)("SELECT * FROM ACTOR A JOIN STAREDIN S on A.AID = S.AID WHERE S.MID = ?;", params);
    console.log(x);
    return x;
});
const getWatchList = (params) => __awaiter(void 0, void 0, void 0, function* () {
    const x = (0, sql_1.execute)("SELECT WE.MPID FROM WATCHLISTENTRY WE JOIN WATCHLIST W on WE.WLID = W.WID WHERE W.UID = ?;", params);
    console.log(x);
    return x;
});
const addToWatchList = (params) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, sql_1.execute)("INSERT INTO WATCHLISTENTRY (MPID, WLID) VALUES (?,(SELECT WID FROM WATCHLIST WHERE UID = ?));", params);
});
const ifWatchListExists = (params) => __awaiter(void 0, void 0, void 0, function* () {
    const x = (0, sql_1.execute)("SELECT 1=(SELECT COUNT(*) FROM WATCHLIST WHERE UID = ?) AS exist;", params);
    console.log("If exists " + x);
    return x;
});
const ifExistsInWatchList = (params) => __awaiter(void 0, void 0, void 0, function* () {
    const x = (0, sql_1.execute)("SELECT 1 = (SELECT COUNT(*) FROM WATCHLISTENTRY WHERE WLID = (SELECT WID FROM WATCHLIST WHERE UID = ?) AND MPID = ?) AS exist;", params);
    console.log("If exists " + x);
    return x;
});
const createWatchList = (params) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, sql_1.execute)("INSERT INTO WATCHLIST (UID) VALUES (?);", params);
});
const removeFromWatchList = (params) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, sql_1.execute)("DELETE FROM WATCHLISTENTRY WHERE MPID = ? AND WLID = (SELECT WID FROM WATCHLIST WHERE UID = ?);", params);
});
const addRating = (params1, params2) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, sql_1.execute)("UPDATE MOTIONPICTURE SET RATINGCOUNT = RATINGCOUNT +1 WHERE MPID = ?;", params1);
    yield (0, sql_1.execute)("UPDATE MOTIONPICTURE SET RATING = ((RATING+?)/RATINGCOUNT) WHERE MPID = ?;", params2);
});
exports.default = {
    createUser,
    login,
    searchByTitle,
    searchByActor,
    getMoviesByActor,
    getMovieInfoById,
    getActorInfoByMovieId,
    getWatchList,
    addToWatchList,
    ifWatchListExists,
    createWatchList,
    removeFromWatchList,
    addRating,
    ifExistsInWatchList
};
