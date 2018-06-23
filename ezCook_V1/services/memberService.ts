import * as googleSheets from "../services/sheetService"
import { memberColumn } from "../sheetColumn"
import { Member } from "../model";

export const getMemberByLineId = async (userId: string) => {
    const auth = await googleSheets.authorize()
    const queryString = `select ${memberColumn.id}, ${memberColumn.name}, ${memberColumn.phone}, ${memberColumn.email}, ${memberColumn.lineId}, ${memberColumn.joinTime}, ${memberColumn.checkEmail} where ${memberColumn.lineId} = '${userId}'`
    const values = await googleSheets.querySheet(auth, queryString, memberColumn.sheetId, memberColumn.gid)
    console.log("values", values)
    const member = {
        id: values[0][0],
        name: values[0][1],
        phone: values[0][2],
        email: values[0][3],
        lineId: values[0][4],
        joinTime: values[0][5],
        checkEmail:values[0][6]
    } as Member
    return member
}

export const checkMemberByEmail = async (email: string) => {
    const auth = await googleSheets.authorize()
    const queryString = `select ${memberColumn.id}, ${memberColumn.name}, ${memberColumn.phone}, ${memberColumn.email}, ${memberColumn.lineId} where ${memberColumn.email} = '${email}'`
    const values = await googleSheets.querySheet(auth, queryString, memberColumn.sheetId, memberColumn.gid)
    await googleSheets.writeSheet(auth, memberColumn.sheetId, memberColumn.workspace + "!G" + (values[0][0] + 1), [["True"]])
    console.log("values", values)
    const member = {
        id: values[0][0],
        name: values[0][1],
        phone: values[0][2],
        email: values[0][3],
        lineId: values[0][4]
    } as Member
    return member
}
