import connection from "../config/dbConnection.js";

const checkData = async (query, data, next) => {
  let conn = null;
  try {
    conn = await connection();
    const [rows] = await conn.execute(query, data);
    return rows;
  } catch (error) {
    next(error);
  } finally {
    if (conn) {
      conn.end();
    }
  }
};

const insertData = async (query, data, next) => {
  let conn = null;
  try {
    conn = await connection();
    const [result] = await conn.execute(query, data);
    return result;
  } catch (error) {
    next(error);
  } finally {
    if (conn) {
      conn.end();
    }
  }
};

const getAllSchools = async (query, next) => {
  let conn = null;
  try {
    conn = await connection();
    const [rows] = await conn.execute(query);
    return rows;
  } catch (error) {
    next(error);
  } finally {
    if (conn) {
      conn.end();
    }
  }
};

export { checkData, insertData, getAllSchools };
