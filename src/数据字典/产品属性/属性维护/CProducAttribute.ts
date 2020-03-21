import { CUqBase } from "tonvaApp";
import { observable } from "mobx";
import _ from 'lodash';
import { VProducAttribute } from "./VProducAttribute";

export class CProducAttribute extends CUqBase{
    /*必需的定义,可在这里进行初始化操作*/
    protected async internalStart(){


    }

    /*必需的定义,用于输出模块的展示View*/
    tab = () =>this.renderView(VProducAttribute);//必需的定义

}