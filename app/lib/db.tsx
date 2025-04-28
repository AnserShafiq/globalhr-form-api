import mysql from "mysql2/promise";

let pool: mysql.Pool | null = null;

export async function connectToDatabase() {
    if (!pool) {
        try {
            pool = mysql.createPool({ 
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_DATABASE,
                waitForConnections: true,
            });
            // Test connection
            const conn = await pool.getConnection();
            conn.release();
        } catch (err) {
            console.error("Database connection failed:", err);
            pool = null;
            throw err;
        }
    }
    return pool;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function executeQuery(query: string, params: any[] = []) {
    const db = await connectToDatabase();
    // console.log('Executing params:', params);
    try{
        const [results] = await db.execute(query, params);
        return results;
    } catch (error) {
        console.error("Error executing query:", error);
        throw error;
    }
}
