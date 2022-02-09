import { Characteristic } from "./characteristic";

export class RealEstate {
    "id" : number;
    "type" : string;
    "name" : string;
    "cityId" : number;
    "city" : string;
    "municipalityId" : number;
    "municipality" : string;
    "microlocationId" : number;
    "microlocation" : string;
    "street" : string;
    "area" : number;
    "rooms" : number;
    "constructionYear" : number;
    "state" : string;
    "heating" : string;
    "floor" : number;
    "totalFloors" : number;
    "parking" : string;
    "monthlyUtilities" : number;
    "price" : number;
    "averagePrice" : number;
    "about" : string;
    "sold" : number;
    "lastChange" : string;
    "postedAt": string;
    "images" : Array<string>;
    "transportLines" : Array<number>;
    "advertiserId" : number;
    "characteristics": Array<Characteristic>
}