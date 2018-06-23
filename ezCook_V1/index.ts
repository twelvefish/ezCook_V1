import * as functions from 'firebase-functions';
import { Client, validateSignature, WebhookEvent, Message, TextMessage, TemplateMessage, VideoMessage } from "@line/bot-sdk"
import * as Dialogflow from "apiai"

import * as memberService from "./services/memberService"
import * as chefService from "./services/chefService"

import { LINE, DIALOGFLOW } from "./chatbotConfig"
import * as queryString from "query-string"

import { Chef } from "./model";

const lineClient = new Client({
    channelSecret: LINE.channelSecret,
    channelAccessToken: LINE.channelAccessToken
})

const dialogflowAgent = Dialogflow(DIALOGFLOW.agentToken)


const koreanFood = async (userId: string) => {
    const carousel: any = {
        type: "template",
        altText: "this is a carousel template",
        template: {
            type: "carousel",
            columns: [
                {
                    thumbnailImageUrl: "https://firebasestorage.googleapis.com/v0/b/ezcook-203202.appspot.com/o/%E9%9F%93%E5%BC%8F%E7%89%9B%E8%82%89%E8%B1%86%E8%85%90%E9%8D%8B.jpg?alt=media&token=32bec722-71f5-466e-bd96-0c047cc9a1fb",
                    text: "韓式牛肉豆腐鍋",
                    actions: [
                        {
                            type: "message",
                            label: "韓式牛肉豆腐鍋(食譜)",
                            text: "韓式牛肉豆腐鍋(食譜)"
                        },
                        {
                            type: "message",
                            label: "韓式牛肉豆腐鍋(影音)",
                            text: "韓式牛肉豆腐鍋(影音)"
                        }
                    ]
                }
            ]
        }
    }
    pushMessage(userId, carousel)
}

const chineseFood = async (userId: string) => {

    const carousel: any = {
        type: "template",
        altText: "this is a carousel template",
        template: {
            type: "carousel",
            columns: [
                {
                    thumbnailImageUrl: "https://firebasestorage.googleapis.com/v0/b/ezcook-203202.appspot.com/o/%E8%82%89%E7%87%A5%E9%A3%AF.PNG?alt=media&token=6278e6bb-b916-4534-b29b-377a003522b7",
                    text: "肉燥飯",
                    actions: [
                        {
                            type: "message",
                            label: "肉燥飯(食譜)",
                            text: "肉燥飯(食譜)"
                        },
                        {
                            type: "message",
                            label: "肉燥飯(影音)",
                            text: "肉燥飯(影音)"
                        }
                    ]
                },
                {
                    thumbnailImageUrl: "https://firebasestorage.googleapis.com/v0/b/ezcook-203202.appspot.com/o/%E7%B3%96%E9%86%8B%E6%8E%92%E9%AA%A8.jpg?alt=media&token=a6846aef-6ce6-4fb3-8323-730681c0415e",
                    text: "糖醋排骨",
                    actions: [
                        {
                            type: "message",
                            label: "糖醋排骨(食譜)",
                            text: "糖醋排骨(食譜)"
                        },
                        {
                            type: "message",
                            label: "糖醋排骨(影音)",
                            text: "糖醋排骨(影音)"
                        }
                    ]
                },
                {
                    thumbnailImageUrl: "https://firebasestorage.googleapis.com/v0/b/ezcook-203202.appspot.com/o/%E6%B8%85%E8%92%B8%E9%B1%88%E9%AD%9A.jpg?alt=media&token=27990013-0a2a-4404-b877-3c7265211653",
                    text: "清蒸鱈魚",
                    actions: [
                        {
                            type: "message",
                            label: "清蒸鱈魚(食譜)",
                            text: "清蒸鱈魚(食譜)"
                        },
                        {
                            type: "message",
                            label: "清蒸鱈魚(影音)",
                            text: "清蒸鱈魚(影音)"
                        }
                    ]
                }, {
                    thumbnailImageUrl: "https://firebasestorage.googleapis.com/v0/b/ezcook-203202.appspot.com/o/%E7%84%97%E7%83%A4%E5%A5%B6%E6%B2%B9%E7%99%BD%E8%8F%9C.jpg?alt=media&token=34b8043d-f312-4ef8-a3a7-77466039aeb4",
                    text: "焗烤奶油白菜",
                    actions: [
                        {
                            type: "message",
                            label: "焗烤奶油白菜(食譜)",
                            text: "焗烤奶油白菜(食譜)"
                        },
                        {
                            type: "message",
                            label: "焗烤奶油白菜(影音)",
                            text: "焗烤奶油白菜(影音)"
                        }
                    ]
                }, {
                    thumbnailImageUrl: "https://firebasestorage.googleapis.com/v0/b/ezcook-203202.appspot.com/o/%E8%8A%8B%E9%A0%AD%E7%B1%B3%E7%B2%89%E6%B9%AF.jpg?alt=media&token=d2234a32-0d45-4a2e-9be7-2ab644f6ba6f",
                    text: "芋頭米粉湯",
                    actions: [
                        {
                            type: "message",
                            label: "芋頭米粉湯(食譜)",
                            text: "芋頭米粉湯(食譜)"
                        },
                        {
                            type: "message",
                            label: "芋頭米粉湯(影音)",
                            text: "芋頭米粉湯(影音)"
                        }
                    ]
                }
            ]
        }
    }
    pushMessage(userId, carousel)
}

const chineseFood1 = async (userId: string) => {
    let columns = [
        {
            thumbnailImageUrl: "https://firebasestorage.googleapis.com/v0/b/ezcook-203202.appspot.com/o/%E8%82%89%E7%87%A5%E9%A3%AF.PNG?alt=media&token=6278e6bb-b916-4534-b29b-377a003522b7",
            text: "肉燥飯",
            actions: [
                {
                    type: "message",
                    label: "肉燥飯(食譜)",
                    text: "肉燥飯(食譜)"
                },
                {
                    type: "message",
                    label: "肉燥飯(影音)",
                    text: "肉燥飯(影音)"
                }
            ]
        },
        {
            thumbnailImageUrl: "https://firebasestorage.googleapis.com/v0/b/ezcook-203202.appspot.com/o/%E7%B3%96%E9%86%8B%E6%8E%92%E9%AA%A8.jpg?alt=media&token=a6846aef-6ce6-4fb3-8323-730681c0415e",
            text: "糖醋排骨",
            actions: [
                {
                    type: "message",
                    label: "糖醋排骨(食譜)",
                    text: "糖醋排骨(食譜)"
                },
                {
                    type: "message",
                    label: "糖醋排骨(影音)",
                    text: "糖醋排骨(影音)"
                }
            ]
        },
        {
            thumbnailImageUrl: "https://firebasestorage.googleapis.com/v0/b/ezcook-203202.appspot.com/o/%E6%B8%85%E8%92%B8%E9%B1%88%E9%AD%9A.jpg?alt=media&token=27990013-0a2a-4404-b877-3c7265211653",
            text: "清蒸鱈魚",
            actions: [
                {
                    type: "message",
                    label: "清蒸鱈魚(食譜)",
                    text: "清蒸鱈魚(食譜)"
                },
                {
                    type: "message",
                    label: "清蒸鱈魚(影音)",
                    text: "清蒸鱈魚(影音)"
                }
            ]
        }, {
            thumbnailImageUrl: "https://firebasestorage.googleapis.com/v0/b/ezcook-203202.appspot.com/o/%E7%84%97%E7%83%A4%E5%A5%B6%E6%B2%B9%E7%99%BD%E8%8F%9C.jpg?alt=media&token=34b8043d-f312-4ef8-a3a7-77466039aeb4",
            text: "焗烤奶油白菜",
            actions: [
                {
                    type: "message",
                    label: "焗烤奶油白菜(食譜)",
                    text: "焗烤奶油白菜(食譜)"
                },
                {
                    type: "message",
                    label: "焗烤奶油白菜(影音)",
                    text: "焗烤奶油白菜(影音)"
                }
            ]
        }, {
            thumbnailImageUrl: "https://firebasestorage.googleapis.com/v0/b/ezcook-203202.appspot.com/o/%E8%8A%8B%E9%A0%AD%E7%B1%B3%E7%B2%89%E6%B9%AF.jpg?alt=media&token=d2234a32-0d45-4a2e-9be7-2ab644f6ba6f",
            text: "芋頭米粉湯",
            actions: [
                {
                    type: "message",
                    label: "芋頭米粉湯(食譜)",
                    text: "芋頭米粉湯(食譜)"
                },
                {
                    type: "message",
                    label: "芋頭米粉湯(影音)",
                    text: "芋頭米粉湯(影音)"
                }
            ]
        }
    ]
    let random = Math.floor((Math.random() * 5))
    console.log("--------------", random)
    console.log(columns[random])
    const carousel: any = {
        type: "template",
        altText: "this is a carousel template",
        template: {
            type: "carousel",
            columns: [columns[random]]
        }
    }
    pushMessage(userId, carousel)
}

const chineseFood2 = async (userId: string) => {
    let textMessage: TextMessage = {
        type: "text",
        text: "請輸入食材( 請已全型逗號分隔 )"
    }
    pushMessage(userId, textMessage)
}

const chineseFood2fallback = async (userId: string, resolvedQuery: string) => {
    let foods = ["紅蔥頭，豬絞肉，米酒，醬油，醬油膏，冰糖，鹽，白胡椒粉，五香粉，水",
        "排骨，青椒，黃椒，紅椒，洋蔥，地瓜粉，番茄醬，水，糖，白醋，太白粉水",
        "鱈魚，青蔥，薑絲，蒜片，米酒，醬油，辣椒",
        "大白菜，培根，蒜，法式蘑菇白醬，焗烤起司，油",
        "豬肉絲，醬油，米酒，胡椒粉，芋頭，米粉，紅蔥頭，蝦米，香菇，高湯，芹菜"]

    let columns = [
        {
            thumbnailImageUrl: "https://firebasestorage.googleapis.com/v0/b/ezcook-203202.appspot.com/o/%E8%82%89%E7%87%A5%E9%A3%AF.PNG?alt=media&token=6278e6bb-b916-4534-b29b-377a003522b7",
            text: "肉燥飯",
            actions: [
                {
                    type: "message",
                    label: "肉燥飯(食譜)",
                    text: "肉燥飯(食譜)"
                },
                {
                    type: "message",
                    label: "肉燥飯(影音)",
                    text: "肉燥飯(影音)"
                }
            ]
        },
        {
            thumbnailImageUrl: "https://firebasestorage.googleapis.com/v0/b/ezcook-203202.appspot.com/o/%E7%B3%96%E9%86%8B%E6%8E%92%E9%AA%A8.jpg?alt=media&token=a6846aef-6ce6-4fb3-8323-730681c0415e",
            text: "糖醋排骨",
            actions: [
                {
                    type: "message",
                    label: "糖醋排骨(食譜)",
                    text: "糖醋排骨(食譜)"
                },
                {
                    type: "message",
                    label: "糖醋排骨(影音)",
                    text: "糖醋排骨(影音)"
                }
            ]
        },
        {
            thumbnailImageUrl: "https://firebasestorage.googleapis.com/v0/b/ezcook-203202.appspot.com/o/%E6%B8%85%E8%92%B8%E9%B1%88%E9%AD%9A.jpg?alt=media&token=27990013-0a2a-4404-b877-3c7265211653",
            text: "清蒸鱈魚",
            actions: [
                {
                    type: "message",
                    label: "清蒸鱈魚(食譜)",
                    text: "清蒸鱈魚(食譜)"
                },
                {
                    type: "message",
                    label: "清蒸鱈魚(影音)",
                    text: "清蒸鱈魚(影音)"
                }
            ]
        }, {
            thumbnailImageUrl: "https://firebasestorage.googleapis.com/v0/b/ezcook-203202.appspot.com/o/%E7%84%97%E7%83%A4%E5%A5%B6%E6%B2%B9%E7%99%BD%E8%8F%9C.jpg?alt=media&token=34b8043d-f312-4ef8-a3a7-77466039aeb4",
            text: "焗烤奶油白菜",
            actions: [
                {
                    type: "message",
                    label: "焗烤奶油白菜(食譜)",
                    text: "焗烤奶油白菜(食譜)"
                },
                {
                    type: "message",
                    label: "焗烤奶油白菜(影音)",
                    text: "焗烤奶油白菜(影音)"
                }
            ]
        }, {
            thumbnailImageUrl: "https://firebasestorage.googleapis.com/v0/b/ezcook-203202.appspot.com/o/%E8%8A%8B%E9%A0%AD%E7%B1%B3%E7%B2%89%E6%B9%AF.jpg?alt=media&token=d2234a32-0d45-4a2e-9be7-2ab644f6ba6f",
            text: "芋頭米粉湯",
            actions: [
                {
                    type: "message",
                    label: "芋頭米粉湯(食譜)",
                    text: "芋頭米粉湯(食譜)"
                },
                {
                    type: "message",
                    label: "芋頭米粉湯(影音)",
                    text: "芋頭米粉湯(影音)"
                }
            ]
        }
    ]
    let index = []
    resolvedQuery.split("，").forEach(test => {
        foods.forEach(food => {
            if (food.split("，").indexOf(test) != -1) {
                console.log("---", food)
                console.log("index", foods.indexOf(food))
                if(index.indexOf(foods.indexOf(food)) == -1){
                    index.push(foods.indexOf(food))
                }
            }
        })
    })
    console.log("index", index)
    if (index.length) {
        let test = []
        index.forEach(i => {
            test.push(columns[i])
        })
        console.log("test", test)
        let textMessage: TextMessage = {
            type: "text",
            text: `以下食譜出現《${resolvedQuery}》食材`
        }
        const carousel: any = {
            type: "template",
            altText: "this is a carousel template",
            template: {
                type: "carousel",
                columns: test
            }
        }
        pushMessage(userId, [textMessage, carousel])
    } else {
        let textMessage: TextMessage = {
            type: "text",
            text: `您輸入的《${resolvedQuery}》食材未在本食譜中出現`
        }
        pushMessage(userId, textMessage)
    }

}
const japaneseFood = async (userId: string) => {

    const carousel: any = {
        type: "template",
        altText: "this is a carousel template",
        template: {
            type: "carousel",
            columns: [
                {
                    thumbnailImageUrl: "https://firebasestorage.googleapis.com/v0/b/ezcook-203202.appspot.com/o/%E5%A3%BD%E5%96%9C%E7%87%92.jpg?alt=media&token=b7df204d-a30c-4c1d-b432-cdabd7325be8",
                    text: "壽喜燒",
                    actions: [
                        {
                            type: "message",
                            label: "壽喜燒(食譜)",
                            text: "壽喜燒(食譜)"
                        },
                        {
                            type: "message",
                            label: "壽喜燒(影音)",
                            text: "壽喜燒(影音)"
                        }
                    ]
                }
            ]
        }
    }
    pushMessage(userId, carousel)
}

const chefChoose = async (userId: string) => {
    const chefs: Chef[] = await chefService.getChefs()
    let columns = []
    chefs.forEach(chef => {
        console.log("chef", chef)
        columns.push(
            {
                title: "《ezCook》",
                text: `廚師 : ${chef.name}\n擅長料理 : ${chef.foodKind}`,
                actions: [
                    {
                        type: "postback",
                        label: "聯繫對方",
                        text: "聯繫對方",
                        data: "action=contact&chefId=" + chef.lineId
                    }, {
                        type: "postback",
                        label: "自我介紹",
                        text: "自我介紹",
                        data: "action=introduction&introduction=" + chef.introduction
                    }, {
                        type: "postback",
                        label: "預約時段",
                        text: "預約時段",
                        data: "action=reserve"
                    }
                ]
            }
        )
    })
    const carouselMessage: any = {
        type: "template",
        altText: "this is a carousel template",
        template: {
            type: "carousel",
            columns: columns
        }
    }
    pushMessage(userId, carouselMessage)
}

const foodPlanning = async (userId: string) => {
    const textMessage: TextMessage = {
        type: "text",
        text: "功能善未完善，敬請期待"
    }
    pushMessage(userId, textMessage)
}

const recipeCooking = async (userId: string) => {
    let columns = []
    columns.push(
        {
            title: "《ezCook》",
            text: `中式食譜`,
            actions: [
                {
                    type: "message",
                    label: "中式料理",
                    text: "中式料理"
                }, {
                    type: "message",
                    label: "抽籤(中式)",
                    text: "抽籤(中式)"
                }, {
                    type: "message",
                    label: "菜色選擇(中式)",
                    text: "菜色選擇(中式)"
                }
            ]
        }, {
            title: "《ezCook》",
            text: `日式食譜`,
            actions: [
                {
                    type: "message",
                    label: "日式料理",
                    text: "日式料理"
                }, {
                    type: "message",
                    label: "抽籤(日式)",
                    text: "抽籤(日式)"
                }, {
                    type: "message",
                    label: "菜色選擇(日式)",
                    text: "菜色選擇(日式)"
                }
            ]
        }, {
            title: "《ezCook》",
            text: `韓式食譜`,
            actions: [
                {
                    type: "message",
                    label: "韓式料理",
                    text: "韓式料理"
                }, {
                    type: "message",
                    label: "抽籤(韓式)",
                    text: "抽籤(韓式)"
                }, {
                    type: "message",
                    label: "菜色選擇(韓式)",
                    text: "菜色選擇(韓式)"
                }
            ]
        }
    )

    const carouselMessage: any = {
        type: "template",
        altText: "this is a carousel template",
        template: {
            type: "carousel",
            columns: columns
        }
    }
    pushMessage(userId, carouselMessage)
}

const demonFood = async (userId: string) => {
    const videoMessage: VideoMessage = {
        type: "video",
        originalContentUrl: "https://firebasestorage.googleapis.com/v0/b/ezcook-203202.appspot.com/o/%E9%A3%9F%E6%88%9F%E4%B9%8B%E9%9D%88%20%E9%9B%9E%E8%9B%8B%E5%A4%A9%E5%A9%A6%E7%BE%85%E8%93%8B%E9%A3%AF%20%E9%A3%9F%E6%88%9F%E3%81%AE%E3%82%BD%E3%83%BC%E3%83%9E%20%20%E9%B6%8F%E5%8D%B5%E3%81%AE%E5%A4%A9%E4%B8%BC%E3%80%90RICO%E3%80%91%E4%BA%8C%E6%AC%A1%E5%85%83%E9%A3%9F%E7%89%A9%E5%85%B7%E7%8F%BE%E5%8C%96%20EP-43%20(720p_30fps_H264-192kbit_AAC).mp4?alt=media&token=e36b2fb6-b490-4981-a5be-daf2aad78d72",
        previewImageUrl: "https://firebasestorage.googleapis.com/v0/b/ezcook-203202.appspot.com/o/%E9%9B%9E%E8%9B%8B%E5%A4%A9%E5%A9%A6%E7%BE%85.jpg?alt=media&token=90e8db22-6470-4f02-97fa-b70d38d35626"
    }
    pushMessage(userId, videoMessage)
}

const onlineShopping = async (userId: string) => {
    const textMessage: TextMessage = {
        type: "text",
        text: "功能善未完善，敬請期待"
    }
    pushMessage(userId, textMessage)
}

const systemConfig = async (userId: string) => {
    const textMessage: TextMessage = {
        type: "text",
        text: "功能善未完善，敬請期待"
    }
    pushMessage(userId, textMessage)
}

const contact = async (userId: string, chefId: string) => {
    const member = await memberService.getMemberByLineId(userId)
    const chef = await chefService.getChefByLineId(chefId)
    console.log("checkEmail", member.checkEmail)
    if (!member.checkEmail) {
        console.log("87")
        const textMessage: TextMessage = {
            type: "text",
            text: `請${member.name}會員\n\n至信箱驗證信件，此系統才供開放`
        }
        pushMessage(userId, textMessage)
    } else {
        const buttonsMessage: TemplateMessage = {
            type: "template",
            altText: "This is a buttons template",
            template: {
                type: "buttons",
                text: `會員 : ${member.name}來訪，請問是否接通 ?`,
                actions: [
                    {
                        type: "postback",
                        label: "確認",
                        text: "確認",
                        data: "action=correct&memberId=" + userId
                    },
                    {
                        type: "postback",
                        label: "拒絕",
                        text: "拒絕",
                        data: "action=refuse&memberId=" + userId
                    }
                ]
            }
        }
        const textMessage: TextMessage = {
            type: "text",
            text: `正在等待${chef.name}廚師回覆\n\n如果對方許久沒回應，請先瀏覽其他選單`
        }
        pushMessage(userId, textMessage)
        pushMessage(chefId, buttonsMessage)
    }
}

const correct = async (chefId: string, memberId: string) => {
    const chef = await chefService.getChefByLineId(chefId)
    const member = await memberService.getMemberByLineId(memberId)
    const textChefMessage: TextMessage = {
        type: "text",
        text: `目前已開啟1對1交談模式\n請慎言\n\n目前交談對象 : ${member.name}`
    }
    // const textMessage: TextMessage = {
    //     type: "text",
    //     text: `功能善未完善，敬請期待`
    // }
    const textMemberMessage: TextMessage = {
        type: "text",
        text: `廚師 : ${chef.name} 已接受你的邀請\n\n接下來開啟1對1交談模式\n請慎言`
    }
    pushMessage(chefId, [textChefMessage])
    pushMessage(memberId, [textMemberMessage])
}

const refuse = async (chefId: string, memberId: string) => {
    const chef = await chefService.getChefByLineId(chefId)
    const member = await memberService.getMemberByLineId(memberId)
    const textMessage: TextMessage = {
        type: "text",
        text: `親愛的${member.name}會員您好\n\n目前廚師${chef.name}不方便交談\n請重新挑選其他廚師`
    }
    const refuseMessage: TextMessage = {
        type: "text",
        text: `您已拒絕${member.name}會員對話邀請`
    }
    pushMessage(memberId, textMessage)
    pushMessage(chefId, refuseMessage)
}

const introduction = (userId: string, text: string): void => {
    var introduction = text.replace(/。/g, "\n")
    const textMessage: TextMessage = {
        type: "text",
        text: introduction
    }
    pushMessage(userId, textMessage)
}

const reserve = (userId: string): void => {
    const textMessage: TextMessage = {
        type: "text",
        text: `功能善未完善，敬請期待`
    }
    pushMessage(userId, textMessage)
}

const actionDispatcher = (userId: string, result: any): void => {
    console.log(JSON.stringify(result, null, 4))
    let textMessage: any
    const action = result.action
    const resolvedQuery = result.resolvedQuery
    switch (action) {
        case "chefChoose":
            chefChoose(userId)
            break
        case "foodPlanning":
            foodPlanning(userId)
            break
        case "recipeCooking":
            recipeCooking(userId)
            break
        case "demonFood":
            demonFood(userId)
            break
        case "onlineShopping":
            onlineShopping(userId)
            break
        case "systemConfig":
            systemConfig(userId)
            break
        case "koreanFood":
        case "koreanFood1":
            koreanFood(userId)
            break
        case "chineseFood":
            chineseFood(userId)
            break
        case "chineseFood1":
            chineseFood1(userId)
            break
        case "chineseFood2":
            chineseFood2(userId)
            break
        case "japaneseFood":
        case "japaneseFood1":
            japaneseFood(userId)
            break
        case "korean1Recipe":
            textMessage = {
                type: "text",
                text: "食材 : \n牛肉 200 克\n嫩豆腐 1 塊\n雞蛋 2 顆\n紅辣椒 1 根\n蔥 1 根\n洋蔥 200 克\n高湯 2 杯\n麻油 1 小匙\n蒜泥 1 小匙\n辣椒粉 2 大匙\n醬油 1 大匙\n\n1.用小火將麻油、蒜泥、辣椒粉炒至香氣出來。\n2.倒入牛肉、洋蔥拌炒，再加入高湯。\n3.待高湯煮滾後，放入嫩豆腐，用湯匙將豆腐切成大塊，再倒入醬油。\n4.撈掉上面的浮末後加入蛋白。\n5.最後，灑上辣椒、蔥花即可。"
            }
            pushMessage(userId, textMessage)
            break
        case "korean1Video":
            textMessage = {
                type: "video",
                originalContentUrl: "https://firebasestorage.googleapis.com/v0/b/ezcook-203202.appspot.com/o/%E9%9F%93%E5%BC%8F%E7%89%9B%E8%82%89%E8%B1%86%E8%85%90%E9%8D%8B.mp4?alt=media&token=9b3bd465-f5c1-4c95-8e12-5091f2efe511",
                previewImageUrl: "https://firebasestorage.googleapis.com/v0/b/ezcook-203202.appspot.com/o/%E9%9F%93%E5%BC%8F%E7%89%9B%E8%82%89%E8%B1%86%E8%85%90%E9%8D%8B.jpg?alt=media&token=32bec722-71f5-466e-bd96-0c047cc9a1fb"
            }
            pushMessage(userId, textMessage)
            break
        case "japanese1Recipe":
            textMessage = {
                type: "text",
                text: "食材 : \n油 20克\n大蔥 1根\n洋蔥 80克\n高麗菜 80克\n金針菇 100克\n鴻喜菇 100克\n香菇 1朵\n紅蘿蔔 50克\n凍豆腐 4個\n蒟蒻絲 3個\n豬五花肉片 200克\n調味醬汁\n水 100毫升\n日式醬油 200毫升\n味醂 50毫升\n米酒 100毫升\n\n1.鍋中下油，稍微炒香大蔥與洋蔥，再加入高麗菜，煮至微軟化。\n2.加入金針菇、鴻喜菇、香菇、紅蘿蔔、凍豆腐、蒟蒻絲，拌炒至菇類稍微軟化。\n3.中間撥出空洞，倒入肉片，再倒入所有調味醬汁。\n4.蓋上鍋蓋燉煮10分鐘即完成。"
            }
            pushMessage(userId, textMessage)
            break
        case "japanese1Video":
            textMessage = {
                type: "video",
                originalContentUrl: "https://firebasestorage.googleapis.com/v0/b/ezcook-203202.appspot.com/o/%E5%A3%BD%E5%96%9C%E7%87%92.mp4?alt=media&token=7f84b7ec-a0a3-4fa9-9be2-fbd6e3d96480",
                previewImageUrl: "https://firebasestorage.googleapis.com/v0/b/ezcook-203202.appspot.com/o/%E5%A3%BD%E5%96%9C%E7%87%92.jpg?alt=media&token=b7df204d-a30c-4c1d-b432-cdabd7325be8  "
            }
            pushMessage(userId, textMessage)
            break
        case "chinese1Recipe":
            textMessage = {
                type: "text",
                text: "食材 : \n紅蔥頭 7顆\n豬絞肉 1台斤\n米酒 20毫升\n醬油 45毫升\n醬油膏 45毫升\n冰糖 5克\n鹽 10克\n香料共和國白胡椒粉 10克\n香料共和國五香粉 10克\n水 250毫升\n\n1.鍋中下油，紅蔥頭爆香，下豬絞肉，拌炒至變色。\n2.倒入米酒、醬油、醬油膏、冰糖、鹽、胡椒粉、五香粉，拌炒均勻。\n3.倒入水，蓋鍋小火悶煮入味，即完成囉～"
            }
            pushMessage(userId, textMessage)
            break
        case "chinese1Video":
            textMessage = {
                type: "video",
                originalContentUrl: "https://firebasestorage.googleapis.com/v0/b/ezcook-203202.appspot.com/o/%E8%82%89%E7%87%A5%E9%A3%AF.mp4?alt=media&token=b4e56cf0-4985-4eee-a857-2558f8a4328e",
                previewImageUrl: "https://firebasestorage.googleapis.com/v0/b/ezcook-203202.appspot.com/o/%E8%82%89%E7%87%A5%E9%A3%AF.PNG?alt=media&token=6278e6bb-b916-4534-b29b-377a003522b7"
            }
            pushMessage(userId, textMessage)
            break
        case "chinese2Recipe":
            textMessage = {
                type: "text",
                text: "食材 : \n排骨 400克\n青椒 半顆\n黃椒 半顆\n紅椒 半顆\n洋蔥 1/4顆\n地瓜粉 適量\n番茄醬 30克\n水 60毫升\n糖 30克\n白醋 30毫升\n太白粉水 適量\n\n1.排骨與醬油、米酒、糖、胡椒粉、蒜末、蛋黃拌勻抓醃。\n2.將醃製過後的排骨，均勻沾裹地瓜粉。\n3.放入150度油鍋，油炸約3分鐘，待表面金黃後取出備用。\n4.另一炒鍋，下油，蒜末爆香，放入青椒、黃椒、紅椒、洋蔥，稍微拌炒，下番茄醬、水、糖、白醋，拌炒均勻。\n5.加入太白粉水勾芡，混合均勻，最後下炸過的排骨，均勻裹上醬汁即完成囉～"
            }
            pushMessage(userId, textMessage)
            break
        case "chinese2Video":
            textMessage = {
                type: "video",
                originalContentUrl: "https://firebasestorage.googleapis.com/v0/b/ezcook-203202.appspot.com/o/%E7%B3%96%E9%86%8B%E6%8E%92%E9%AA%A8.mp4?alt=media&token=ac26ace2-55b4-4ca2-a43b-730d301b9104",
                previewImageUrl: "https://firebasestorage.googleapis.com/v0/b/ezcook-203202.appspot.com/o/%E7%B3%96%E9%86%8B%E6%8E%92%E9%AA%A8.jpg?alt=media&token=a6846aef-6ce6-4fb3-8323-730681c0415e"
            }
            pushMessage(userId, textMessage)
            break
        case "chinese3Recipe":
            textMessage = {
                type: "text",
                text: "食材 : \n鱈魚 1片\n青蔥 2根\n薑絲 3片\n蒜片 2瓣\n米酒 2小匙\n醬油 1大匙\n辣椒 1根\n\n1.鱈魚洗淨並用廚房紙巾擦乾表面，將米酒倒入盤中，鱈魚兩面沾上米酒去腥。\n2.將醬油淋在鱈魚片上，放上薑絲、蔥段及蒜片。電鍋外鍋一杯水，蒸煮約20分鐘。\n3.電鍋跳起後，拿走蔥段，放入捲蔥絲、辣椒絲再悶2分鐘即可"
            }
            pushMessage(userId, textMessage)
            break
        case "chinese3Video":
            textMessage = {
                type: "video",
                originalContentUrl: "https://firebasestorage.googleapis.com/v0/b/ezcook-203202.appspot.com/o/%E6%B8%85%E8%92%B8%E9%B1%88%E9%AD%9A.mp4?alt=media&token=206e93ac-8494-4179-ad4a-850dc94568c0",
                previewImageUrl: "https://firebasestorage.googleapis.com/v0/b/ezcook-203202.appspot.com/o/%E6%B8%85%E8%92%B8%E9%B1%88%E9%AD%9A.jpg?alt=media&token=27990013-0a2a-4404-b877-3c7265211653"
            }
            pushMessage(userId, textMessage)
            break
        case "chinese4Recipe":
            textMessage = {
                type: "text",
                text: "食材 : \n大白菜 1片\n培根 1/2片\n蒜 1/2顆\n法式蘑菇白醬 11/2tbsp\n焗烤起司 15g\n油 適量\n\n1.培根切小片，蒜也切小片。\n2.白菜洗淨，以手或刀切成適當大小。再用熱水先汆燙備用。\n3.鍋中放入少許油，炒香培根及蒜片。\n4.放入汆燙過的白菜，翻炒均勻。可加入一點點的鹽或黑胡椒。因法式蘑菇白醬已有鹹味所以要斟酌放唷。\n5.將培根白菜放入烤盅裡。\n6.擺上法式蘑菇白醬，也可將白醬與白菜混均勻後再擺入烤盅。\n7.鋪上焗烤起司，送入烤箱烤到金黃。\n8.熱騰騰奶香十足的焗烤奶油白菜，冷冷的天氣吃來分外溫暖！"
            }
            pushMessage(userId, textMessage)
            break
        case "chinese4Video":
            textMessage = {
                type: "video",
                originalContentUrl: "https://firebasestorage.googleapis.com/v0/b/ezcook-203202.appspot.com/o/%E7%84%97%E7%83%A4%E5%A5%B6%E6%B2%B9%E7%99%BD%E8%8F%9C.mp4?alt=media&token=83d241a2-5573-4e24-909e-5ca2e33e71eb",
                previewImageUrl: "https://firebasestorage.googleapis.com/v0/b/ezcook-203202.appspot.com/o/%E7%84%97%E7%83%A4%E5%A5%B6%E6%B2%B9%E7%99%BD%E8%8F%9C.jpg?alt=media&token=34b8043d-f312-4ef8-a3a7-77466039aeb4"
            }
            pushMessage(userId, textMessage)
            break
        case "chinese5Recipe":
            textMessage = {
                type: "text",
                text: "食材 : \n豬肉絲 100克\n醬油 20毫升\n米酒 20毫升\n胡椒粉 5克\n芋頭 300克\n米粉 200克\n紅蔥頭 10克\n蝦米 5克\n香菇 10克\n高湯1500毫升\n芹菜 1支\n適量\n\n1.豬肉絲加入醬油、米酒、胡椒粉混合均勻，冷藏醃1小時。\n2.芋頭切塊後，油炸至表面微酥，取出備用。\n3.備另一熱水鍋，放入米粉，蓋鍋悶煮10分鐘，取出備用。\n4.鍋中下油，紅蔥頭、蝦米以小火爆香，放入香菇絲、醃漬過的肉絲、炸過的芋頭，拌炒至肉絲變色。\n5.倒入高湯，以中大火煮滾，下煮熟的米粉、芹菜丁，撒點胡椒粉，攪拌均勻後，蓋鍋悶煮5分鐘即完成囉～"
            }
            pushMessage(userId, textMessage)
            break
        case "chinese5Video":
            textMessage = {
                type: "video",
                originalContentUrl: "https://firebasestorage.googleapis.com/v0/b/ezcook-203202.appspot.com/o/%E8%8A%8B%E9%A0%AD%E7%B1%B3%E7%B2%89%E6%B9%AF.mp4?alt=media&token=0c996a41-37b1-4abb-81fe-8313a74441e0",
                previewImageUrl: "https://firebasestorage.googleapis.com/v0/b/ezcook-203202.appspot.com/o/%E8%8A%8B%E9%A0%AD%E7%B1%B3%E7%B2%89%E6%B9%AF.jpg?alt=media&token=d2234a32-0d45-4a2e-9be7-2ab644f6ba6f"
            }
            pushMessage(userId, textMessage)
            break
        case "chineseFood2.chineseFood2-fallback":
            chineseFood2fallback(userId, resolvedQuery)
            break
        default:
            break
    }
}

const postbackDispatcher = (userId: string, postbackData: string): void => {
    const event = queryString.parse(postbackData)
    console.log("event", event)
    switch (event.action) {
        case "lateRegister":
            const textMessage: TextMessage = {
                type: "text",
                text: "稍後如想設定\n請至右下角Menu設定點選"
            }
            pushMessage(userId, textMessage)
            break;
        case "contact":
            contact(userId, event.chefId)
            break
        case "correct":
            correct(userId, event.memberId)
            break
        case "refuse":
            refuse(userId, event.memberId)
            break
        case "introduction":
            introduction(userId, event.introduction)
            break;
        case "reserve":
            reserve(userId)
            break;
        default:
            break
    }
}

const replyJoinMessage = (replyToken: string, groupId: string): Promise<any> => {

    const url = `https://docs.google.com/forms/d/e/1FAIpQLScN0U6JORBzJRhxdwYyiyjBbpRlyYxgCzPwJAno73N7THr4JQ/viewform?usp=pp_url&entry.198699825=${groupId}`
    const lineMessage: TextMessage = {
        type: "text",
        text: `我是《圓桌教育基金會》\n很高興受邀加入貴群組\n請你填表讓我知道這個群組的相關資料`
    }
    const buttonsMessage: TemplateMessage = {
        type: "template",
        altText: "This is a buttons template",
        template: {
            type: "buttons",
            title: "《圓桌教育基金會》",
            text: "請填寫表單",
            actions: [
                {
                    type: "uri",
                    label: "點擊填寫",
                    uri: url
                }
            ]
        }
    }
    return replyMessage(replyToken, [lineMessage, buttonsMessage])
}

const messageDispatcher = (userId: string, message: string): void => {
    const request = dialogflowAgent.textRequest(message, { sessionId: userId })
    request.on("response", response => actionDispatcher(userId, response.result)).end()
    request.on("error", error => console.log("Error: ", error))
}

const followMessage = async (replyToken: string, userId: string): Promise<any> => {
    
    const imageMap: any = {
        type: "imagemap",
        baseUrl: "https://storage.googleapis.com/ezcook-203202.appspot.com/follow",
        altText: "歡迎加入《ezCook》簡單、方便、好上手",
        baseSize: {
            "height": 1040,
            "width": 1040
        },
        actions: []
        // type: "text",
        // text: "歡迎加入《ezCook》\n簡單、方便、好上手"
    }
    let member = "https://docs.google.com/forms/d/e/1FAIpQLSd_geTe6Xg43u8YtlFLV8SdbGjErpQ1fTq6ivx_1wC6dzTrgQ/viewform?usp=pp_url"
    member += `&entry.994524359=${userId}`
    let chef = "https://docs.google.com/forms/d/e/1FAIpQLScAvgtopkyAFPMr3XCK9D5XJjVJ2QpSrbz3fPIB0btakSJ9sw/viewform?usp=pp_url"
    chef += `&entry.1782739058=${userId}`
    const buttonsMessage: TemplateMessage = {
        type: "template",
        altText: "This is a buttons template",
        template: {
            type: "buttons",
            title: "《ezCook》",
            text: "讓我成為你的料理好幫手",
            actions: [
                {
                    type: "uri",
                    label: "註冊會員",
                    uri: member
                },
                {
                    type: "uri",
                    label: "註冊廚師",
                    uri: chef
                }, {
                    type: "postback",
                    label: "稍後註冊",
                    data: "action=lateRegister"
                }
            ]
        }
    }
    await replyMessage(replyToken, [imageMap, buttonsMessage])
}

const eventDispatcher = (event: any): void => {
    const userId = event.source.userId
    console.log("event :", event);
    switch (event.type) {
        case "follow":
            followMessage(event.replyToken, userId)
            break
        case "join":
            if (event.source.type == "group")
                replyJoinMessage(event.replyToken, event.source.groupId)
            break
        case "message":
            if (event.message.type === "text")
                messageDispatcher(userId, event.message.text)
            break
        case "postback":
            postbackDispatcher(userId, event.postback.data);
            break
        default:
            break
    }
}

const replyMessage = (replyToken: string, lineMessage: Message | Array<Message>): Promise<any> => {
    return lineClient.replyMessage(replyToken, lineMessage)
}

const pushMessage = (userId: string, lineMessage: Message | Array<Message>): Promise<any> => {
    return lineClient.pushMessage(userId, lineMessage)
}

export const webhook = functions.https.onRequest((req, res) => {
    const signature = req.headers["x-line-signature"] as string
    if (validateSignature(JSON.stringify(req.body), LINE.channelSecret, signature)) {
        const events = req.body.events as Array<WebhookEvent>
        events.forEach(event => eventDispatcher(event))
    }
    res.sendStatus(200)
})

export const pushTextMessage = functions.https.onRequest((req, res) => {
    const message = req.body.message
    const lineId = req.body.lineId
    const textMessage: TextMessage = {
        type: "text",
        text: message
    }
    pushMessage(lineId, textMessage)
    res.sendStatus(200)
})

export const checkEmail = functions.https.onRequest(async (req, res) => {
    const email = req.query.email
    console.log("email", email)
    await memberService.checkMemberByEmail(email)
    res.send("ezCook信箱認證成功")
})