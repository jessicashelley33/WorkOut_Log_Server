const Express = require('express');
const router = Express.Router();
const { LogModel } = require("../models")
const {validateSession} = require('../middleware');

router.get("/", async (req, res) =>{
    try {
      const getLogs = await LogModel.findAll();
      res.status(200).json(getLogs);
    } catch (err) {
      res.status(500).json({
        error: err,
      })
    }
  })
  router.post("/", validateSession, async (req, res) => {
    const {
        description,
        definition,
        result,
        owner_id,
    } = req.body;
    try {
      const Log = await LogModel.create({
      description,
      definition,
      result,
      owner_id,
      });
      res.status(201).json({
        message: "Log was successfully created",
        Log,
      });
    } catch (err) {
      console.log(err)
      res.status(500).json({
        message: `Failed to create logs: ${err}`
      })    }
  })
  // findOne()
  router.get("/:id", async (req, res) => {
    try {
      const inputedLogs = await LogModel.findOne({
        where: {
          owner_id: req.params.id
        }
      });
      res.status(200).json({
        message: "Log was successfully retrieved",
        inputedLogs,
      });
    } catch (err) {
      res.status(500).json({
        message: `Failed to retrieve Logs: ${err}`,
      });
    }
  });

//UPDATE
router.put("/:id", async (req, res) => {
    const {
      description,
      definition,
      result,
      owner_id,
      } = req.body;
    try {
      await LogModel.update(
        { description, definition, result, owner_id },

        { where: { id: req.params.id }, returning: true }
      ).then((result) => {
        res.status(200).json({
          message: "Log was successfully updated",
          updatedLog: result,
        });
      });
    } catch (err) {
      res.status(500).json({
        message: `Failed to update Log: ${err}`,
      });
    }
  });
  
  //DELETE
  router.delete("/:id", async (req, res) => {
      try{
          await LogModel.destroy({
              where: { 
                  id: req.params.id
              },
          }).then((result) => {
              res.status(200).json({
                  message: "Log was sucessfully deleted",
                  deletedLog: result,
              });
          });
      } catch(err) {
          res.status(500) ({
              message: `Failed to sucessfully delete Log: ${err}`
          })
      }
    });
  
  module.exports = router
  
  


module.exports = router;