// import * as googleSheets from "../services/sheetService"
// import { groupColumn } from "../sheetColumn"
// import { Group } from "../model";
// export const deleteGroup = async (group: Group) => {
//     const auth = await googleSheets.authorize()
//     const range = encodeURI(`${groupColumn.workspace}!${groupColumn.id}${group.id}:${groupColumn.adminName}${group.id}`)
//     googleSheets.clearSheet(auth, groupColumn.sheetId, range)
// }
// export const getGroup = async (groupId: string) => {
//     const auth = await googleSheets.authorize()
//     const queryString = `select ${groupColumn.id},` +
//         `${groupColumn.groupName},` +
//         `${groupColumn.groupLineId},` +
//         `${groupColumn.adminName} ` +
//         `where ${groupColumn.groupLineId} = '${groupId}'`
//     console.log(queryString)
//     const values = await googleSheets.querySheet(auth, queryString, groupColumn.sheetId, groupColumn.gid)
//     const group = {
//         id: values[0][0],
//         groupName: values[0][1],
//         groupLineId: values[0][2],
//         adminName: values[0][3]
//     } as Group
//     return group
// }
// export const getGroups = async () => {
//     const auth = await googleSheets.authorize()
//     const values = await googleSheets.readSheet(auth, groupColumn.sheetId, encodeURI(groupColumn.workspace))
//     let groups: Array<Group> = []
//     for (let i = 1; i < values.length; i++) {
//         const groupValue = values[i]
//         let group = {
//             id: groupValue[0],
//             groupName: groupValue[1],
//             groupLineId: groupValue[2],
//             adminName: groupValue[3]
//         } as Group
//         groups.push(group)
//     }
//     return groups
// }
//# sourceMappingURL=groupService.js.map