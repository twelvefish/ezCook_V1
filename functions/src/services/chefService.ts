import * as googleSheets from "../services/sheetService"
import { chefColumn } from "../sheetColumn"
import { Chef } from "../model";

export const getChefs = async () => {
    const auth = await googleSheets.authorize()
    const queryString = `select ${chefColumn.id}, ${chefColumn.name}, ${chefColumn.phone}, ${chefColumn.email}, ${chefColumn.lineId}, ${chefColumn.foodKind}, ${chefColumn.introduction} where 1 = 1 order by A`
    const values = await googleSheets.querySheet(auth, queryString, chefColumn.sheetId, chefColumn.gid)
    console.log("values", values)
    const chefs = []
    values.forEach(value => {
        if (value[0] && value[1] && value[2] && value[3] && value[4] && value[5] && value[6]) {
            chefs.push(
                {
                    id: value[0],
                    name: value[1],
                    phone: value[2],
                    email: value[3],
                    lineId: value[4],
                    foodKind: value[5],
                    introduction: value[6]
                } as Chef
            )
        }
    })
    return chefs
}

export const getChefByLineId = async (userId: string) => {
    const auth = await googleSheets.authorize()
    const queryString = `select ${chefColumn.id}, ${chefColumn.name}, ${chefColumn.phone}, ${chefColumn.email}, ${chefColumn.lineId}, ${chefColumn.foodKind}, ${chefColumn.introduction} where ${chefColumn.lineId} = '${userId}'`
    const values = await googleSheets.querySheet(auth, queryString, chefColumn.sheetId, chefColumn.gid)
    console.log("values", values)
    const chef = {
        id: values[0][0],
        name: values[0][1],
        phone: values[0][2],
        email: values[0][3],
        lineId: values[0][4],
        foodKind: values[0][5],
        introduction: values[0][6],
    } as Chef
    return chef
}

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