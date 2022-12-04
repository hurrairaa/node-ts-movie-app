import {execute} from "./sql";

const createUser = async (params: string[]) => {
    return execute("INSERT INTO USER (FNAME, LNAME, EMAIL, PASSWORD) VALUES (?, ?, ?, ?);", params)
};

const login = async (params: string[]) => {
    const x = execute("SELECT ? = (SELECT PASSWORD FROM USER WHERE EMAIL = ?) AS login;", params)
    console.log(x);
    return x
};

const searchByTitle = async (params: string[]) => {
    const x = execute("SELECT MP.MPID, MP.TITLE FROM MOTIONPICTURE MP WHERE MP.TITLE LIKE CONCAT('%', ?, '%');", params);
    console.log(x);
    return x;
};

const searchByActor = async (params: string[]) => {
    const x = execute("SELECT A.AID, A.NAME FROM ACTOR A WHERE A.NAME LIKE CONCAT('%', ?, '%');", params);
    console.log(x);
    return x;
};

const getMoviesByActor = async (params: string[]) => {
    const x = execute("SELECT * FROM MOTIONPICTURE MP JOIN STAREDIN S on MP.MPID = S.MID WHERE S.AID = ?;", params);
    console.log(x);
    return x;
};

const getMovieInfoById = async (params: string[]) => {
    const x = execute("SELECT * FROM MOTIONPICTURE MP WHERE MPID = ?;", params);
    console.log(x);
    return x;
};

const getActorInfoByMovieId = async (params: string[]) => {
    const x = execute("SELECT * FROM ACTOR A JOIN STAREDIN S on A.AID = S.AID WHERE S.MID = ?;", params);
    console.log(x);
    return x;
};

const getWatchList = async (params: string[]) => {
    const x = execute("SELECT WE.MPID FROM WATCHLISTENTRY WE JOIN WATCHLIST W on WE.WLID = W.WID WHERE W.UID = ?;", params);
    console.log(x);
    return x;
};

const addToWatchList = async (params: string[]) => {
    await execute("INSERT INTO WATCHLISTENTRY (MPID, WLID) VALUES (?,(SELECT WID FROM WATCHLIST WHERE UID = ?));", params);

};

const ifWatchListExists = async (params: string[]) => {
    const x = execute("SELECT 1=(SELECT COUNT(*) FROM WATCHLIST WHERE UID = ?) AS exist;", params);
    console.log("If exists " + x);
    return x;
};

const ifExistsInWatchList = async (params: string[]) => {
    const x = execute("SELECT 1 = (SELECT COUNT(*) FROM WATCHLISTENTRY WHERE WLID = (SELECT WID FROM WATCHLIST WHERE UID = ?) AND MPID = ?) AS exist;", params);
    console.log("If exists " + x);
    return x;
};


const createWatchList = async (params: string[]) => {
    await execute("INSERT INTO WATCHLIST (UID) VALUES (?);", params);
};

const removeFromWatchList = async (params: string[]) => {
    await execute("DELETE FROM WATCHLISTENTRY WHERE MPID = ? AND WLID = (SELECT WID FROM WATCHLIST WHERE UID = ?);", params);

};

const addRating = async (params1: string[], params2: string[]) => {
    await execute("UPDATE MOTIONPICTURE SET RATINGCOUNT = RATINGCOUNT +1 WHERE MPID = ?;", params1);
    await execute("UPDATE MOTIONPICTURE SET RATING = ((RATING+?)/RATINGCOUNT) WHERE MPID = ?;", params2);
};

export default {
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


