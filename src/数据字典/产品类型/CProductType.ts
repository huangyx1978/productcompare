import { CUqBase } from "tonvaApp";
import { QueryPager, Query, NumSchema } from "tonva";
import { observable } from "mobx";
import _ from 'lodash';
import { TuidSaveResult } from "tonva/dist/uq/tuid/tuid";
import { createNo } from "tool/tools";
import {VProductTypeList} from "./VProductTypeList";

export class CProductType extends CUqBase{
    pager: QueryPager<any>;//定义全局的支持分页查询的操作对象,在此定义的全局对象,在后面的View里都能通过this.controller来调用

    /*必需的定义*/
    protected async internalStart(){

    }

    tab = () =>this.renderView(VProductTypeList);//必需的定义

    showProductType = async()=>{
        this.pager=new QueryPager(this.uqs.productcompare.queryproducttype,10,30);
        this.pager.setItemDeepObservable();//执行这个方法后可实现绑定了当前paper的View自动刷新显示
        await this.pager.first({key:''});//执行第一次查询,前面需要加await,因为这是异步查询
        this.openVPage(VProductTypeList);//openVPage可以传第二个参数,如果有传第二个参数,则对应view里面的open方法需要定义入参用于接收改参数,query的查询结果对应数组类型any[]
    }

}