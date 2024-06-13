import { Level } from './level.model';

export interface User {
    id: number;
    uuid: string;
    firstName: string;
    lastName: string;
    creationDate: string;
    updatedDate: string;
}

export interface Student extends  User{
    level: Level;
}
export interface Teacher extends  User{
}


