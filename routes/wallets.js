const express = require("express");
const router = express.Router();
const WalletController = require("../controllers/Wallete");

router.get("/", WalletController.getWallets);
router.get("/ByHashId/:id", WalletController.getWalletByHashId);
router.get("/:id", WalletController.getWalletById);
router.post("/", WalletController.postWallet);
router.patch("/ByHashId/:id", WalletController.updateWalletByHashId);
router.patch("/:id", WalletController.updateWallet);
router.delete("/:id", WalletController.deleteWallet);

module.exports = router;
