import { Injectable } from '@angular/core';
import { HttpClient, HttpInterceptor} from '@angular/common/http';
//import { Http } from '@angular/http'; 
import { Observable } from 'rxjs';
import { User } from './user.model';

@Injectable()

export class UserService {
    randomuser = 'https://randomuser.me/api/?results=10';
    constructor(private _http: HttpClient) {}

    public getJsonObjects(): Observable<any> {
        return this._http.get(this.randomuser);
    }

    public setDataToLocalStorage(key: string, data: User[]) {
        let dataStringfiy = JSON.stringify(data);
        try{
            localStorage.setItem(key, dataStringfiy);
        }catch(error){
            console.log("Error in saving data to local storage:  "+error);
        }
    }

    public getDataFromLocalStorage(key: string): User[]{
        try{
            return JSON.parse(localStorage.getItem(key));
        }catch(error) {
            console.log("Error in getting data from local storage:  "+error);
        }
    }

    public getIndividualUserByUuid(key: string, uuid: string): User{
        let user: User = null;
        let result;
        result = this.getDataFromLocalStorage(key);

        for(let i=0; i < result.length; i++){
            console.log("result[i].login.uuid  "+result[i].login.uuid);
            if(uuid === result[i].login.uuid){
                user = result[i];
                break;
            }
        }
        return user;
    }
}