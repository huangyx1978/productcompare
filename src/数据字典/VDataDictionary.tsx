import * as React from 'react';
import { nav, Image, VPage, Prop, IconText, FA, PropGrid, LMR, Page, List } from 'tonva';
import {CDataDictionary} from './CDataDictionary'; 
import {LMRDownUp} from 'myui/LMRDownUp'

interface MenuItem{
    caption:string,
    onClick:()=>void
}

export class VDataDictionary extends VPage<CDataDictionary>{
    /*必需的定义*/
    async open(param?: any){
        
    }

    private arr:MenuItem[]=[
        {caption:"产品类型",onClick:this.controller.showcplx},
        {caption:"产品属性",onClick:this.controller.showcpsx},
        {caption:"枚举选项",onClick:this.controller.showmjxx}
    ]

    render(){

        return <Page header="数据字典" headerClassName="bg-info">
            <ul className="list-group m-0 p-0 list-group-flush">
            <List items={this.arr} item={{render: this.renderCompany}}/>
            </ul>
        </Page>
    }

    /*单个数据项输出界面元素*/
    private renderCompany=(menuitem:any, index:number) => {
        let {caption,onClick} = menuitem;//将menuitem对象的caption属性,onClick属性自动赋值给同名的变量,一种语法糖,类似于C#中Json对象与类的实例自动转换,通过名称自动匹配
        let right = <FA name="angle-right" className="text-success mx-2" fixWidth={true}/>;//列表右侧显示的界面元素
        return <LMR className="px-3 py-2 align-items-center cursor-pointer" right={right} onClick={onClick}><b className="h6">{caption}</b></LMR>//输出包含左中右三个分区的列表项
    }

}