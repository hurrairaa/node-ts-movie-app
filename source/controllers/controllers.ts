/** source/controllers/controllers.ts */
import {Request, Response, NextFunction} from 'express';
import axios, {AxiosResponse} from 'axios';
import querries from "../sql/querries";

const test = async (req: Request, res: Response, next: NextFunction) => {
    console.log("test");
    res.status(200).send("test").end();
};

const createAccount = async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
    const out = querries.createUser([req.body.fname, req.body.lname, req.body.email, req.body.password]);
    console.log(out);
    res.status(200).send("Account Created!").end();
};

const login = async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.query.email + " " + req.query.password);
    const out = await querries.login([String(req.query.password), String(req.query.email)]);
    console.log(out)
    if (JSON.parse(JSON.stringify(out))[0]['login']) {
        res.status(200).send("Logged In!").end();
    } else {
        res.status(401).send("Invalid Login").end();
    }
};

const searchByTitle = async (req: Request, res: Response, next: NextFunction) => {
    console.log("Search criteria: " + req.query.title);
    const out = await querries.searchByTitle([String(req.query.title)]);
    res.status(200).send(JSON.stringify(out)).end();
};

const searchByActor = async (req: Request, res: Response, next: NextFunction) => {
    console.log("Search criteria: " + req.query.actor);
    const out = await querries.searchByActor([String(req.query.actor)]);
    res.status(200).send(JSON.stringify(out)).end();
};

const getMoviesByActor = async (req: Request, res: Response, next: NextFunction) => {
    console.log("Search criteria: " + req.query.aid);
    const out = await querries.getMoviesByActor([String(req.query.aid)]);
    res.status(200).send(JSON.stringify(out)).end();
}

const getMovieInfoById = async (req: Request, res: Response, next: NextFunction) => {
    console.log("Search criteria: " + req.query.mpid);
    const out = await querries.getMovieInfoById([String(req.query.mpid)]);
    res.status(200).send(JSON.stringify(out)).end();
}

const getActorInfoByMovieId = async (req: Request, res: Response, next: NextFunction) => {
    console.log("Search criteria: " + req.query.mpid);
    const out = await querries.getActorInfoByMovieId([String(req.query.mpid)]);
    res.status(200).send(JSON.stringify(out)).end();
}

const getWatchList = async (req: Request, res: Response, next: NextFunction) => {
    console.log("Search criteria: " + req.query.uid);
    const out = await querries.getWatchList([String(req.query.uid)]);
    res.status(200).send(JSON.stringify(out)).end();
};

const addToWatchList = async (req: Request, res: Response, next: NextFunction) => {
    console.log("Search criteria: " + req.body.uid + " " + req.body.mpid);
    const out1 = await querries.ifWatchListExists([req.body.uid]);
    if (!JSON.parse(JSON.stringify(out1))[0]['exist']) {
        await querries.createWatchList([req.body.uid]);
    }
    const out2 = await querries.ifExistsInWatchList([req.body.uid, req.body.mpid]);
    console.log(out2)
    if (!JSON.parse(JSON.stringify(out2))[0]['exist']) {
        await querries.addToWatchList([req.body.mpid, req.body.uid]);
        res.status(200).send("Added To Watchlist!").end();
    }else{
        res.status(304).send("Already In Watchlist!").end();
    }

};

const removeFromWatchList = async (req: Request, res: Response, next: NextFunction) => {
    console.log("Search criteria: " + req.body.uid + " " + req.body.mpid);
    await querries.removeFromWatchList([req.body.mpid, req.body.uid]);
    res.status(200).send("Removed From Watchlist!").end();
};

const addRating = async (req: Request, res: Response, next: NextFunction) => {
    console.log("Search criteria: " + req.body.mpid + " " + req.body.rating);
    await querries.addRating([req.body.mpid], [req.body.rating, req.body.mpid]);
    res.status(200).send("Rating Updated!").end();
};


export default {
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