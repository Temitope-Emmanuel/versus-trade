export interface BaseModel {
    className?:string;
    style?:object;
}

export interface DataBaseModel {
    id:string;
    createdAt:Date | string;
}