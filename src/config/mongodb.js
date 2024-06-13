import { MongoClient, ServerApiVersion } from 'mongodb';
import { env } from '~/config/environment';

// Khởi tạo = null vì chưa connect db
let trelloDatabaseInstance = null;

const mongoClientInstance = new MongoClient(env.MONGODB_URI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

// Connect Database
export const CONNECT_DB = async () => {
    await mongoClientInstance.connect();
    trelloDatabaseInstance = mongoClientInstance.db(env.DATABASE_NAME);
};

export const GET_DB = () => {
    if (!trelloDatabaseInstance) throw new Error('Must connect to Database first!');
    return trelloDatabaseInstance;
};

// Close connect Database
export const CLOSE_DB = async () => {
    await mongoClientInstance.close();
};
