"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const googleSheets = require("../services/sheetService");
const sheetColumn_1 = require("../sheetColumn");
exports.getChefs = () => __awaiter(this, void 0, void 0, function* () {
    const auth = yield googleSheets.authorize();
    const queryString = `select ${sheetColumn_1.chefColumn.id}, ${sheetColumn_1.chefColumn.name}, ${sheetColumn_1.chefColumn.phone}, ${sheetColumn_1.chefColumn.email}, ${sheetColumn_1.chefColumn.lineId}, ${sheetColumn_1.chefColumn.foodKind}, ${sheetColumn_1.chefColumn.introduction} where 1 = 1 order by A`;
    const values = yield googleSheets.querySheet(auth, queryString, sheetColumn_1.chefColumn.sheetId, sheetColumn_1.chefColumn.gid);
    console.log("values", values);
    const chefs = [];
    values.forEach(value => {
        if (value[0] && value[1] && value[2] && value[3] && value[4] && value[5] && value[6]) {
            chefs.push({
                id: value[0],
                name: value[1],
                phone: value[2],
                email: value[3],
                lineId: value[4],
                foodKind: value[5],
                introduction: value[6]
            });
        }
    });
    return chefs;
});
exports.getChefByLineId = (userId) => __awaiter(this, void 0, void 0, function* () {
    const auth = yield googleSheets.authorize();
    const queryString = `select ${sheetColumn_1.chefColumn.id}, ${sheetColumn_1.chefColumn.name}, ${sheetColumn_1.chefColumn.phone}, ${sheetColumn_1.chefColumn.email}, ${sheetColumn_1.chefColumn.lineId}, ${sheetColumn_1.chefColumn.foodKind}, ${sheetColumn_1.chefColumn.introduction} where ${sheetColumn_1.chefColumn.lineId} = '${userId}'`;
    const values = yield googleSheets.querySheet(auth, queryString, sheetColumn_1.chefColumn.sheetId, sheetColumn_1.chefColumn.gid);
    console.log("values", values);
    const chef = {
        id: values[0][0],
        name: values[0][1],
        phone: values[0][2],
        email: values[0][3],
        lineId: values[0][4],
        foodKind: values[0][5],
        introduction: values[0][6],
    };
    return chef;
});
// export const getContacts = async () => {
//     const auth = await googleSheets.authorize()
//     const queryString = `select ${contactColumn.id}, ${contactColumn.name}, ${contactColumn.department}, ${contactColumn.phone}, ${contactColumn.lineId} where 1 = 1`
//     const values = await googleSheets.querySheet(auth, queryString, contactColumn.sheetId, contactColumn.gid)
//     let transaction = ""
//     values.forEach(col => {
//         transaction += `序號 ：${col[0]}\n`
//         transaction += `姓名 ：${col[1]}\n`
//         transaction += `單位 ：${col[2]}\n`
//         transaction += `手機 ：${col[3]}\n\n`
//     })
//     return transaction
// }
//# sourceMappingURL=chefService.js.map