import connection from "./../database.js";

async function insertFinancial(id, value, type){
    await connection.query(
        `INSERT INTO "financialEvents" ("userId", "value", "type") VALUES ($1, $2, $3)`,
        [id, value, type]
    );
}

async function getFinancial(id){

    const events = await connection.query(
        `SELECT * FROM "financialEvents" WHERE "userId"=$1 ORDER BY "id" DESC`,
        [id]
    );

    return events.rows

}

async function getSumFinancial(id){
    const events = await connection.query(
        `SELECT * FROM "financialEvents" WHERE "userId"=$1 ORDER BY "id" DESC`,
        [id]
    );

    return events.rows;
}

export const financialRepository = {
    insertFinancial,
    getFinancial,
    getSumFinancial
} 