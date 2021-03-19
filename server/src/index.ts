import "dotenv-safe/config";
import express from "express";
import { __prod__ } from "./constants";
import { createConnection } from 'typeorm';
import { Group } from "./entities/Group.entity";
import { GroupType } from "./entities/GroupType.entity";
import { LocalAuth } from "./entities/LocalAuth.entity";
import { Tag } from "./entities/Tag.entity";
import { User } from "./entities/User.entity";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { GroupResolver } from "./resolvers/Group.res";
import { LocalAuthResolver } from "./resolvers/LocalAuth.res";
import cors from 'cors';

import Redis from "ioredis";
import session from "express-session";
import connectRedis from "connect-redis";


const main = async () => {
    // Connect to Database
    console.log(process.env);

    const conn = await createConnection({
        type: 'postgres',
        url: process.env.DATABASE_URL,
        schema:"mcdbv83",
        logging: true,
        synchronize: true,
        entities: [
            Group,
            GroupType,
            LocalAuth,
            Tag,
            User
        ]
    });


    const app = express();

    // Set-up redis
    const RedisStore = connectRedis(session);
    const redis = new Redis(process.env.REDIS_URL);

    app.use(
        cors({
            origin: process.env.CORS_ORIGIN,
            credentials: true
        })
    );

    app.use(
        session({
            name: 'sid',
            store: new RedisStore({
                client: redis,
                disableTouch: true
            }),
            cookie:{
                maxAge: 1000 * 60 * 24 * 365, // a Year
                httpOnly: true,
                sameSite: "lax",
                secure: __prod__,
                domain: __prod__ ? "domain.com" : undefined,
            },
            saveUninitialized: false,
            secret: process.env.SESSION_SECRET,
            resave: false
        })
    );

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers : [
                GroupResolver,
                LocalAuthResolver
            ],
            validate: false
        }),
        context: ({req, res}) => ({
            req, res, redis
        })
    });

    apolloServer.applyMiddleware({app, cors: false });

    app.listen((process.env.PORT ? process.env.PORT : 4000), () => {
        console.log('server started on localhost:4000')
    });
}

main();