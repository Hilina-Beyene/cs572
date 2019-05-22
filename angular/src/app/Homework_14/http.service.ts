import { Http, Headers, Response, RequestOptions, RequestMethod, Request } from '@angular/http';
import { Injectable } from '@angular/core';
import { Router, } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { SettingService } from '../../shared/services/setting-service';
import { CookieService } from 'angular2-cookie/core';
import { CommandBase, Setting } from '../../shared/models/common-models';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AppMessageService } from '../../shared/services/app-message.service';
//import { Message } from 'primeng/primeng';
import { SecureLocalStorage } from '../../core/services/secure-localstorage.service';
@Injectable()
export class HttpService {
    private requestOptions: RequestOptions;

    private command: Setting[];
    public commandApiUrl: string;
    public queryApiUrl: string;
    public loggerApiUrl: string;
    public uploadApiUrl: string;
    public imagePath: string;
    public disablePing: boolean;
    public userId: string;
    public systemToken: string;
    public PartyId: string;
    public PartyName: string;
    public isLoggedin: boolean;
    public requireChange: boolean;
    public returnUrl: string;
    public serverPath: string;
    public userName: string;
    public sessionId: string;
    public visitorId: string;
    public showLoadingBehaviorSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public showQueryLoadingBehaviorSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public showGuideBehaviourSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    public cVersion: BehaviorSubject<string> = new BehaviorSubject<string>(null);
    public qVersion: BehaviorSubject<string> = new BehaviorSubject<string>(null);
    public ipAddress: string;
    //  public messageBehaviorSubject: BehaviorSubject<Message> = new BehaviorSubject<Message>(null);

    constructor(private http: Http,
        private settingService: SettingService,
        private cookieService: CookieService,
        private router: Router,
        private messageService: AppMessageService, private secureLocalstorage: SecureLocalStorage) {

        let headers = new Headers({ 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' });
        this.requestOptions = new RequestOptions({ headers: headers });
        settingService.getSettingValue().subscribe(result => {
            this.command = result.json();
            this.commandApiUrl = this.command.filter(x => x.id === 'command-api')[0].value;
            this.queryApiUrl = this.command.filter(x => x.id === 'query-api')[0].value;
            this.serverPath = this.command.filter(x => x.id === "server-path")[0].value;
            this.loggerApiUrl = this.command.filter(x => x.id === "logger-api")[0].value;
            this.uploadApiUrl = this.command.filter(x => x.id === "upload-api")[0].value;
            this.imagePath = this.command.filter(x => x.id === "image-path")[0].value;
            this.disablePing = this.command.filter(x => x.id === "disable-ping")[0].value;
            this.getversion();
        });
        this.userId = this.cookieService.get('userId') ? this.cookieService.get('userId') : '';
        this.systemToken = this.cookieService.get('systemToken') ? this.cookieService.get('systemToken') : 'system';
        this.PartyId = this.cookieService.get('partyId') ? this.cookieService.get('partyId') : '';
        this.isLoggedin = this.cookieService.get('userId') ? true : false;
        this.requireChange = this.cookieService.get('requireChange') ? true : false;
        this.userName = this.cookieService.get('userName') ? this.cookieService.get('userName') : '';
        this.PartyName = this.cookieService.get('partyName') ? this.cookieService.get('partyName') : '';
        this.sessionId = this.cookieService.get('sessionId') ? this.cookieService.get('sessionId') : '';
        this.visitorId = localStorage.getItem('visitorId') ? localStorage.getItem('visitorId') : '';
        console.log("HttpService started...");
        
    }
    executeCommand(commandName: string, commandObject: CommandBase): Observable<any> {
        commandObject.SecurityToken = this.systemToken;
        commandObject.VisitorId = this.visitorId;
        commandObject.SessionId = this.sessionId;
        let body = JSON.stringify(commandObject);
        let cmdUrl = this.commandApiUrl + commandName;
        this.showLoading();
        return this.http.post(cmdUrl, body, this.requestOptions)
            .map((res: Response) => {
                this.hideLoading();
                return this.extractData(res);
            })
            .share()
            .catch((err: any) => {
                this.hideLoading();
                this.messageService.showErrorMessage("Error occured");
                return this.handleError(err);
            });
    }
    executeCommandQuery(commandName: string, commandObject: CommandBase, cond?: boolean, type?: string): Observable<any> {
        commandObject.SecurityToken = this.systemToken;
        commandObject.VisitorId = this.visitorId;
        commandObject.SessionId = this.sessionId;
        let body = JSON.stringify(commandObject);
        let cmdUrl = this.commandApiUrl + commandName;
        if (!cond)
            this.showLoading();
        if (type === 'query')
            this.showQueryLoading();
        return this.http.post(cmdUrl, body, this.requestOptions)
            .map((res: Response) => {
                if (!cond)
                    this.hideLoading();
                if (type === 'query')
                    this.hideQueryLoading();
                return this.extractQueryData(res);
            })
            .share()
            .catch((err: any) => {
                if (!cond) {
                    this.hideLoading();
                }
                if (type = 'query')
                    this.hideQueryLoading();
                this.messageService.showErrorMessage("Error occured");
                return this.handleError(err);
            });
    }
    uploadFile(commandName: string, data: FormData): Observable<any> {
        let cmdUrl = this.uploadApiUrl + commandName;
        var headers = new Headers();
        headers.append("Accept", 'application/json');
        headers.delete("Content-Type");
        var requestoptions = new RequestOptions({
            method: RequestMethod.Post,
            url: cmdUrl,
            headers: headers,
            body: data
        });
        return this.http.request(new Request(requestoptions))
            .map((res: Response) => {
                if (res) {
                    return { status: res.status, json: res.json() }
                }
            });
    }
    executeQuery(urlArgs: string, queryObject?: any): Observable<any> {
        if (!queryObject) {
            return this.http.get(this.queryApiUrl + urlArgs, this.requestOptions)
                .map((response: Response) => response.json())
                .catch(err => this.handleError(err));
        }
        let body = JSON.stringify(queryObject);
        return this.http.post(this.queryApiUrl + urlArgs, body, this.requestOptions)
            .map((response: Response) => response.json())
            .catch(err => this.handleError(err));
    }

    executeQueryGet(urlArgs: string): Observable<any> {
        this.showQueryLoading();
        return this.http.get(this.queryApiUrl + urlArgs, this.requestOptions)
            .map((response: Response) => {
                this.hideQueryLoading();
                return response.json()
            })
            .catch((err: any) => {
                this.hideQueryLoading();
                return this.handleError(err);
            });

    }
    executePing(url: string): Observable<any> {
        let commandObject = new CommandBase();
        commandObject.SecurityToken = this.systemToken;
        commandObject.VisitorId = this.visitorId;
        commandObject.SessionId = this.sessionId;
        let body = JSON.stringify(commandObject);
        return this.http.post(this.commandApiUrl + url, body, this.requestOptions)
            .map((response: Response) => {
                return response.status;
            })
            .catch((err: any) => {
                return err.status;
            });
    }
    executeQueryPost(urlArgs: string, queryObject: any): Observable<any> {
        let body = JSON.stringify(queryObject);
        this.showQueryLoading();
        return this.http.post(this.queryApiUrl + urlArgs, body, this.requestOptions)
            .map((response: Response) => {
                this.hideQueryLoading();
                return response.json()
            })
            .catch((err: any) => {
                this.hideQueryLoading();
                return this.handleError(err);
            });
    }
    getCVersion(): Observable<string> {
        return this.http.get(this.commandApiUrl + "version", this.requestOptions).map((response: Response) => {
            return response.json();
        });
    }

    getQVersion(): Observable<string> {
        return this.http.get(this.queryApiUrl + "Version").map((response: Response) => {
            return response.json();
        })
    }
    getversion() {
        this.getQVersion().subscribe(result => {
            this.cookieService.put("qVersion", result);
        });
        this.getCVersion().subscribe(result => {
            this.cookieService.put("cVersion", result);
        });
    }
    resetCookie() {
        this.cookieService.remove("requireChange");
    }

    navigate(url: string): Promise<boolean> {
        return this.router.navigate(['/apps/' + url]);
    }

    remoteLog(value: any) {
        try {
            let body = JSON.stringify(value);
            this.http.post(this.loggerApiUrl, body, this.requestOptions)
                .map((response: Response) => {
                    response.json();
                })
                .subscribe();
        }
        catch (ex) {
            console.log("unable to log error");
        }
    }
    // taken from https://angular.io/docs/ts/latest/guide/server-communication.html
    extractData(res: Response) {
        if (res.status >= 200 || res.status < 300) {
            this.messageService.showSuccessMessage('Success');
            return res.json();
        }
        throw new Error('This request has failed ' + res.status);
    }
    // does not show success message in the UI
    extractQueryData(res: Response) {
        if (res.status >= 200 || res.status < 300) {
            return res.json();
        }
        throw new Error('This request has failed ' + res.status);
    }
    handleError(error: Response | any): any {
        let errMsg = new ErrorModel();
        if (error instanceof Response) {
            try {
                const body = error.json() || '';
                const err = body.error || JSON.stringify(body);
                errMsg.message = `${error.status} - ${error.statusText || ''} ${err}`;
            } catch (ex) {
                errMsg.message = `${error.status} - ${error.statusText || ''}`;
            }

        } else {
            errMsg.message = error.message ? error.message : error.toString();
            errMsg.name = error.name ? error.name : "";
            errMsg.stack = error.stack ? error.stack : "";
        }
        this.remoteLog(errMsg);
        let val = errMsg.message.split(":");
        this.messageService.showInfoMessage(val[1]);
        return Observable.throw(errMsg.message);
    }

    showLoading() {
        this.showLoadingBehaviorSubject.next(true);
    }
    hideLoading() {
        this.showLoadingBehaviorSubject.next(false);
    }
    showQueryLoading() {
        this.showQueryLoadingBehaviorSubject.next(true);
    }
    hideQueryLoading() {
        this.showQueryLoadingBehaviorSubject.next(false);
    }


}

export class ErrorModel {
    public message: any;
    public stack: any;
    public name: any;
}
export class GuideModel {
    public element: string
    public intro: string;
    public position: string;
}