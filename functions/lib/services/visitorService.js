// import * as googleSheets from "../services/sheetService"
// import { visitorColumn } from "../sheetColumn"
// import { Record } from "../model"
// export const updateRecord = async (range: string, values: any) => {
//     const auth = await googleSheets.authorize()
//     await googleSheets.writeSheet(auth, visitorColumn.sheetId, encodeURI(range), values)
// }
// export const getListByName = async (name: string) => {
//     const auth = await googleSheets.authorize()
//     const queryString = `select ${visitorColumn.id}, ${visitorColumn.visitor}, ${visitorColumn.interviewee}, ${visitorColumn.beginTime}, ${visitorColumn.endTime}, ${visitorColumn.stayTime}, ${visitorColumn.comeCount}, ${visitorColumn.totalTime} where ${visitorColumn.visitor} = '${name}' order by A desc`
//     const values = await googleSheets.querySheet(auth, queryString, visitorColumn.sheetId, visitorColumn.gid)
//     if (values.length) {
//         const record = {
//             id: values[0][0],
//             visitor: values[0][1],
//             interviewee: values[0][2],
//             beginTime: values[0][3],
//             endTime: values[0][4],
//             stayTime: values[0][5],
//             comeCount: values[0][6],
//             totalTime: values[0][7]
//         } as Record
//         return record
//     }
//     return null
// }
// export const getListByName2 = async (name: string) => {
//     const auth = await googleSheets.authorize()
//     const queryString = `select ${visitorColumn.id}, ${visitorColumn.visitor}, ${visitorColumn.interviewee}, ${visitorColumn.beginTime}, ${visitorColumn.endTime}, ${visitorColumn.stayTime}, ${visitorColumn.comeCount}, ${visitorColumn.totalTime} where ${visitorColumn.interviewee} = '${name}' order by A desc`
//     const values = await googleSheets.querySheet(auth, queryString, visitorColumn.sheetId, visitorColumn.gid)
//     if (values.length) {
//         const record = {
//             id: values[0][0],
//             visitor: values[0][1],
//             interviewee: values[0][2],
//             beginTime: values[0][3],
//             endTime: values[0][4],
//             stayTime: values[0][5],
//             comeCount: values[0][6],
//             totalTime: values[0][7]
//         } as Record
//         return record
//     }
//     return null
// }
// export const getList = async () => {
//     const auth = await googleSheets.authorize()
//     const queryString = `select ${visitorColumn.id}, ${visitorColumn.visitor}, ${visitorColumn.interviewee}, ${visitorColumn.beginTime}, ${visitorColumn.endTime}, ${visitorColumn.stayTime}, ${visitorColumn.comeCount}, ${visitorColumn.totalTime} where 1 = 1 order by A `
//     const values = await googleSheets.querySheet(auth, queryString, visitorColumn.sheetId, visitorColumn.gid)
//     let transaction = ""
//     let count = 1
//     values.forEach(col => {
//         transaction += `序號 ：${count}\n`
//         transaction += `來訪者 ：${col[1]}\n`
//         transaction += `受訪者 ：${col[2]}\n`
//         transaction += `到訪時間 ：${col[3]}\n`
//         transaction += (col[4] === null) ? "離開時間 ：尚未離開\n" : `離開時間 ：${col[4]}\n`
//         transaction += (col[5] === null) ? "本次停留 ：尚未離開\n" : `本次停留 ：${col[5]}\n`
//         transaction += (col[7] === null) ? "累計停留 ：尚未離開\n\n" : `累計停留 ：${col[7]}\n\n`
//         count++
//     })
//     return transaction
// }
// export const getRecordbyName = async (name: string) => {
//     const auth = await googleSheets.authorize()
//     const queryString = `select ${visitorColumn.id}, ${visitorColumn.visitor}, ${visitorColumn.interviewee}, ${visitorColumn.beginTime}, ${visitorColumn.endTime}, ${visitorColumn.stayTime}, ${visitorColumn.comeCount}, ${visitorColumn.totalTime} where ${visitorColumn.visitor} = '${name}' order by A desc limit 10`
//     const values = await googleSheets.querySheet(auth, queryString, visitorColumn.sheetId, visitorColumn.gid)
//     let transaction = ""
//     values.forEach(col => {
//         transaction += `訪客編號 ：${col[0]}\n`
//         transaction += `來訪者 ：${col[1]}\n`
//         transaction += `受訪者 ：${col[2]}\n`
//         transaction += `到訪時間 ：${col[3]}\n`
//         transaction += (col[4] === null) ? "離開時間 ：尚未離開\n" : `離開時間 ：${col[4]}\n`
//         transaction += (col[5] === null) ? "本次停留 ：尚未離開\n" : `本次停留 ：${col[5]}\n`
//         transaction += (col[7] === null) ? "累計停留 ：尚未離開\n\n" : `累計停留 ：${col[7]}\n\n`
//     })
//     return transaction
// }
//# sourceMappingURL=visitorService.js.map