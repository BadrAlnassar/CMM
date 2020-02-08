const pool = require("../../Config/database");


module.exports = {
    createUser: (data, callback) => {
        pool.query(
            `insert into registration(firstName, lastName, gender, email, password, number)
                            values(?,?,?,?,?,?)`,
            [
             data.first_name,
             data.last_name,
             data.gender,
             data.email,
             data.password,
             data.number
            ],
            (error, results, fields) => {
                if (error){
                   return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    getUsers: (callback) => {
        pool.query(
            `SELECT id, firstName, lastName, gender, email, number FROM registration`,
            [],
            (error, results, fields) => {
                if (error){
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    getUserByID: (id, callback) => {
        pool.query(
            `SELECT id, firstName, lastName, gender, email, number FROM registration WHERE id = ?`,
            [id],
            (error, results, fields) => {
                if (error){
                    return callback(error);
                }
                return callback(null, results[0]);
            }
        );
    }, updateUser: (data, callBack) => {
        pool.query(
          `update registration set firstName=?, lastName=?, gender=?, email=?, password=?, number=? where id = ?`,
          [
            data.first_name,
            data.last_name,
            data.gender,
            data.email,
            data.password,
            data.number,
            data.id
          ],
          (error, results, fields) => {
            if (error) {
              callBack(error);
            }
            return callBack(null, results[0]);
          }
        );
      },
    deleteUser: (data, callback) => {
        pool.query(
            `delete from registration where id = ?`
        ),
        [data.id],
        (error, results, fields) => {
            if (error){
                return callback(error);
            }
            return callback(null ,results[0]);
        }
    },
    getUserByEmail: (email, callBack) => {
        pool.query(
            `select * from registration where email = ?`,
            [email],
            (error, results, fields) => {
                if (error){
                    callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    }
};