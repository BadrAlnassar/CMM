const { 
    createUser,
    getUsers,
    getUserByID,
    updateUser,
    deleteUser,
    getUserByEmail
     } = require("./user.service");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign} = require("jsonwebtoken");


module.exports = {
    createUser: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        createUser(body, (err, results) => {
            if (err){
                console.log(err)
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }else 
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    getUsers: (req, res) => {
        getUsers((err, results) => {
            if (err){
                console.log(err)
                return;
            }
            return res.json({
                success: 1,
                data: results
            });
        })
    },
    getUserByID: (req, res) => {
        const id = req.params.id;
        getUserByID(id, (err, results) => {
            if (err){
                console.log(err)
                return;
            }
            if (!results){
                return res.json({
                    success: 0,
                    message: "Record not founded!"
                });
            }
            return res.json({
                success: 1,
                data: results
            });
        })
    }, 
    updateUser: (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    updateUser(body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        message: "updated successfully"
      });
    });
  },
    deleteUser: (req, res) => {
        const data = req.body;
        deleteUser(data, (err, results) => {
          if (err) {
            console.log(err);
            return;
          }
          if (!results) {
            return res.json({
              success: 0,
              message: "Record Not Found"
            });
          }
          return res.json({
            success: 1,
            message: "user deleted successfully"
          });
        });
      },
      login: (req, res) => {
          const body = req.body;
          getUserByEmail(body.email, (err, results) => {
              if (err){
                  console.log(err);
              }
              if (!results){
                  return res.json({
                      success: 0,
                      data: "invalid email or password"
                  });
              }
              const result = compareSync(body.password, results.password);
              if (result){
                results.password = undefined;
                const jsonToken = sign({ result: results }, process.env.TOKEN_KEY, {
                    expiresIn: "2h"
                });
                return res.json({
                    success: 1,
                    message: "login successfully",
                    token: jsonToken
                });
              } else {
                  return res.json({
                    success: 0,
                    data: "invalid email or password"
                  });
              }
          });
      }
    };