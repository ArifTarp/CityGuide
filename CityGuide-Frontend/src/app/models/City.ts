import { Photo } from './Photo';

export class City {
    id:number;
    userId:number;
    description:string;
    name:string;
    photoUrl:string;
    addedDateOfPhoto:Date;
    photos:Photo[];
}
