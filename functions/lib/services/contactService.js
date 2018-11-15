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
exports.getMember = (userId) => __awaiter(this, void 0, void 0, function* () {
    const auth = yield googleSheets.authorize();
    const queryString = `select ${sheetColumn_1.contactColumn.id}, ${sheetColumn_1.contactColumn.name}, ${sheetColumn_1.contactColumn.department}, ${sheetColumn_1.contactColumn.phone}, ${sheetColumn_1.contactColumn.lineId} where ${sheetColumn_1.contactColumn.lineId} = '${userId}'`;
    console.log(queryString);
    const values = yield googleSheets.querySheet(auth, queryString, sheetColumn_1.contactColumn.sheetId, sheetColumn_1.contactColumn.gid);
    console.log(values);
    const member = {
        id: values[0][0],
        name: values[0][1],
        department: values[0][2],
        phone: values[0][3],
        lineId: values[0][4]
    };
    return member;
});
exports.getMemberByLineId = (lineId) => __awaiter(this, void 0, void 0, function* () {
    const auth = yield googleSheets.authorize();
    const queryString = `select ${sheetColumn_1.contactColumn.id}, ${sheetColumn_1.contactColumn.name}, ${sheetColumn_1.contactColumn.department}, ${sheetColumn_1.contactColumn.phone}, ${sheetColumn_1.contactColumn.lineId} where ${sheetColumn_1.contactColumn.lineId} = '${lineId}'`;
    const values = yield googleSheets.querySheet(auth, queryString, sheetColumn_1.contactColumn.sheetId, sheetColumn_1.contactColumn.gid);
    console.log(values);
    if (values.length) {
        const member = {
            id: values[0][0],
            name: values[0][1],
            department: values[0][2],
            phone: values[0][3],
            lineId: values[0][4]
        };
        console.log(member);
        return member;
    }
    return null;
});
exports.getMemberByName = (name) => __awaiter(this, void 0, void 0, function* () {
    const auth = yield googleSheets.authorize();
    const queryString = `select ${sheetColumn_1.contactColumn.id}, ${sheetColumn_1.contactColumn.name}, ${sheetColumn_1.contactColumn.department}, ${sheetColumn_1.contactColumn.phone}, ${sheetColumn_1.contactColumn.lineId} where ${sheetColumn_1.contactColumn.name} = '${name}'`;
    const values = yield googleSheets.querySheet(auth, queryString, sheetColumn_1.contactColumn.sheetId, sheetColumn_1.contactColumn.gid);
    console.log(values);
    if (values.length) {
        const member = {
            id: values[0][0],
            name: values[0][1],
            department: values[0][2],
            phone: values[0][3],
            lineId: values[0][4]
        };
        console.log(member);
        return member;
    }
    return null;
});
exports.getContacts = () => __awaiter(this, void 0, void 0, function* () {
    const auth = yield googleSheets.authorize();
    const queryString = `select ${sheetColumn_1.contactColumn.id}, ${sheetColumn_1.contactColumn.name}, ${sheetColumn_1.contactColumn.department}, ${sheetColumn_1.contactColumn.phone}, ${sheetColumn_1.contactColumn.lineId} where 1 = 1`;
    const values = yield googleSheets.querySheet(auth, queryString, sheetColumn_1.contactColumn.sheetId, sheetColumn_1.contactColumn.gid);
    let transaction = "";
    values.forEach(col => {
        transaction += `序號 ：${col[0]}\n`;
        transaction += `姓名 ：${col[1]}\n`;
        transaction += `單位 ：${col[2]}\n`;
        transaction += `手機 ：${col[3]}\n\n`;
    });
    return transaction;
});
//# sourceMappingURL=contactService.js.map