"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    res.send('Fetching all diaries!');
});
// router.post('/', (_req, res) => {
//   res.send('Saving a diary!');
// });
exports.default = router;
