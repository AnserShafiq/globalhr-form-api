import mysql from "mysql2/promise";

let pool: mysql.Pool | null = null;

export async function connectToDatabase() {
    console.log('Connect to DB')
    if(!pool){
        pool = mysql.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0,
        });
    }
    return pool;
}
export async function executeQuery(query: string, params: any[] = []) {
    const db = await connectToDatabase();
    console.log('Executing params:', params);
    try{
        const [results] = await db.execute(query, params);
        return results;
    } catch (error) {
        console.error("Error executing query:", error);
        throw error;
    }
}
