const express = require("express");
const router = express.Router();

const { mercadolivre, mercadolivreGet } = require("../controllers/site");

router.post("/mercadolivre", mercadolivre);
router.get("/mercadolivre", mercadolivreGet);

module.exports = router;
