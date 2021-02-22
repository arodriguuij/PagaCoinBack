const express = require("express");
const router = express.Router();
const TransactionController = require("../controllers/Transaction");

router.get("/", TransactionController.getTransactions);
router.get("/sent/:id", TransactionController.getSentTransactionById);
router.get("/received/:id", TransactionController.getReceivedTransactionById);
router.get(
  "/sentByWallet/:id",
  TransactionController.getSentTransactionByWallet
);
router.get(
  "/receivedByWallet/:id",
  TransactionController.getReceivedTransactionByWallet
);
router.post("/", TransactionController.postTransaction);

module.exports = router;
