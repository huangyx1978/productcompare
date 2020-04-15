import { CAppBase, IConstructor } from "tonva";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js'
import { CUqBase } from "./tonvaApp/CBase";
import { UQs } from "./tonvaApp/uqs";
import { VMain } from './tonvaApp/main';
import { CMe } from "个人中心/CMe";
import {CUserManage} from '用户管理/CUserManage';
import { CDataDictionary } from "数据字典/CDataDictionary";

export class CApp extends CAppBase {
    get uqs(): UQs { return this._uqs };
    /*在此定义模块类*/
    cMe: CMe;
    CUserManage:CUserManage;
    CDataDictionary:CDataDictionary;
    

    protected newC<T extends CUqBase>(type: IConstructor<T>): T {
        return new type(this);
    }

    protected async internalStart() {

        this.CUserManage=this.newC(CUserManage);
        this.CDataDictionary=this.newC(CDataDictionary);
        this.CDataDictionary.start();
        this.cMe = this.newC(CMe); 
        this.showMain();
    }

    showMain(initTabName?: string) {
        this.openVPage(VMain, initTabName);
    }
}
