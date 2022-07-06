
import jwt from "jsonwebtoken";
import connection from "./../database.js";
import bcrypt from "bcrypt";

async function signUp(name, email, password){

    if (!name || !email || !password) {
        throw {
            type: "invalid data",
            cod: "422"
        }
    }

    const existingUsers = await connection.query(
        `SELECT * FROM "users" WHERE "email"=$1`,
        [email]
      );
  
      if (existingUsers.rowCount > 0) {
        throw {
            type: "existing user",
            cod: "409"
        }
      }
  
      const hashedPassword = bcrypt.hashSync(password, 12);
  
      await connection.query(
        `INSERT INTO "users" ("name", "email", "password") VALUES ($1, $2, $3)`,
        [name, email, hashedPassword]
      );

}

async function signIn(email, password){

    if (!email || !password) {
        throw {
            type: "invalid data",
            cod: "422"
        }
      }
  
      const { rows } = await connection.query(
        `SELECT * FROM "users" WHERE "email"=$1`,
        [email]
      );
      const [user] = rows;
  
      if (!user || !bcrypt.compareSync(password, user.password)) {
        throw {
            type: "invalid credentials",
            cod: "401"
        }
      }
  
      const token = jwt.sign(
        {
          id: user.id,
        },
        process.env.JWT_SECRET
      );
  
      return token;
}

export const authRepository = {
    signUp,
    signIn
} 