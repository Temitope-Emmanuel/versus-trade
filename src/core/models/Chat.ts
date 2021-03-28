export interface SendMessageToUser { 
    id:string;
    chatId:string;
    text:string;
    when:Date | string;
    personId:string;
    ownerIsCurrentUser?:boolean;
}

export interface IChat {
    id:string;
    receiverId:string;
    message:SendMessageToUser[]
}
