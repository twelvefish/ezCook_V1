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
exports.getMemberByLineId = (userId) => __awaiter(this, void 0, void 0, function* () {
    const auth = yield googleSheets.authorize();
    const queryString = `select ${sheetColumn_1.memberColumn.id}, ${sheetColumn_1.memberColumn.name}, ${sheetColumn_1.memberColumn.phone}, ${sheetColumn_1.memberColumn.email}, ${sheetColumn_1.memberColumn.lineId}, ${sheetColumn_1.memberColumn.joinTime}, ${sheetColumn_1.memberColumn.checkEmail} where ${sheetColumn_1.memberColumn.lineId} = '${userId}'`;
    const values = yield googleSheets.querySheet(auth, queryString, sheetColumn_1.memberColumn.sheetId, sheetColumn_1.memberColumn.gid);
    console.log("values", values);
    const member = {
        id: values[0][0],
        name: values[0][1],
        phone: values[0][2],
        email: values[0][3],
        lineId: values[0][4],
        joinTime: values[0][5],
        checkEmail: values[0][6]
    };
    return member;
});
exports.checkMemberByEmail = (email) => __awaiter(this, void 0, void 0, function* () {
    const auth = yield googleSheets.authorize();
    const queryString = `select ${sheetColumn_1.memberColumn.id}, ${sheetColumn_1.memberColumn.name}, ${sheetColumn_1.memberColumn.phone}, ${sheetColumn_1.memberColumn.email}, ${sheetColumn_1.memberColumn.lineId} where ${sheetColumn_1.memberColumn.email} = '${email}'`;
    const values = yield googleSheets.querySheet(auth, queryString, sheetColumn_1.memberColumn.sheetId, sheetColumn_1.memberColumn.gid);
    yield googleSheets.writeSheet(auth, sheetColumn_1.memberColumn.sheetId, sheetColumn_1.memberColumn.workspace + "!G" + (values[0][0] + 1), [["True"]]);
    console.log("values", values);
    const member = {
        id: values[0][0],
        name: values[0][1],
        phone: values[0][2],
        email: values[0][3],
        lineId: values[0][4]
    };
    return member;
});
//# sourceMappingURL=memberService.js.map