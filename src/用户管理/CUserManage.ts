import { CUqBase } from "tonvaApp";
import { observable } from "mobx";
import _ from 'lodash';
import { VUserManage } from "./VUserManage";

export class CUserManage extends CUqBase{
    /*必需的定义,可在这里进行初始化操作*/
    protected async internalStart(){


    }

    /*必需的定义,用于输出模块的展示View*/
    tab = () =>this.renderView(VUserManage);//必需的定义

    /*打开用户管理View*/
    showyhgl=async()=>{
        alert("你点击了用户管理");
    }

    /*打开权限分配View*/
    showqxfp=async()=>{
        alert("你点击了权限分配");
    }

}