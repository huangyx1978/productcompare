import { CUqBase } from "tonvaApp";
import { observable } from "mobx";
import _ from 'lodash';
import { VDataDictionary } from "./VDataDictionary";
import { CProducAttribute } from './产品属性/属性维护/CProducAttribute';
import { CAttributeClass } from './产品属性/属性分类/CAttributeClass';
import {ProductAttributeMain} from './产品属性/ProductAttributeMain'


export class CDataDictionary extends CUqBase{
    /*必需的定义,可在这里进行初始化操作*/
    protected async internalStart(){


    }

    CProducAttribute:CProducAttribute;
    CAttributeClass:CAttributeClass;


    /*必需的定义,用于输出模块的展示View*/
    tab = () =>this.renderView(VDataDictionary);//必需的定义

    /*打开产品类型View*/
    showcplx=async()=>{
        alert("你点击了产品类型");
    }

    /*打开产品属性View*/
    showcpsx=async()=>{
        this.CAttributeClass= this.newC(CAttributeClass);
        this.CProducAttribute=this.newC(CProducAttribute)

        this.openVPage(ProductAttributeMain)
    }

    /*打开属性分类View*/
    showmjxx=async()=>{
        alert("你点击了枚举选项");
    }

}