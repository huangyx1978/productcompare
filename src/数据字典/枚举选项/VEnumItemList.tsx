import * as React from 'react';
import classNames from 'classnames';
import { Page, VPage, ImageUploader, Form, ItemSchema, UiSchema, UiTextItem, ButtonWidget, UiButton, NumSchema, UiTextAreaItem, List, LMR, FA, SearchBox } from 'tonva';
import {CDataDictionary} from '../CDataDictionary'

export class VEnumItemList extends VPage<CDataDictionary>{
    enumeration:any;
    async open(enumeration?: any){
        this.enumeration=enumeration;
        this.openPage(this.page);
    }

    /*单个数据项输出界面元素*/
    private renderitem=(item:any, index:number) => {
        let {name,disabled} = item;
        let right = <div className="row">
                        <div onClick={()=>this.onDisabledClick(item)}><FA name={disabled==1?"toggle-off":"toggle-on"} className={classNames(disabled==1?"text-primary":"text-primary","mx-1")} size="lg" fixWidth={true}/></div>
                        <div onClick={()=>this.editEnumClick(item)}><FA name="edit" className="text-primary mx-1" size="lg" fixWidth={true}/></div>
                        <div onClick={()=>this.displayUpClick(item)}><FA name="arrow-circle-up" className="text-primary mx-1" size="lg" fixWidth={true}/></div>
                        <div onClick={()=>this.displayDownClick(item)}><FA name="arrow-circle-down" className="text-primary mr-2" size="lg" fixWidth={true}/></div>
                    </div>;//列表右侧显示的界面元素
        return <LMR className="px-3 py-2 align-items-center cursor-pointer" right={right}><b className="h6">{name}</b></LMR>//输出包含左中右三个分区的列表项
    }
        

    private page=()=>{
        let header=this.enumeration.name;
        let right=<div className="cursor-pointer align-self-center mr-2" onClick={this.onAddClick}><FA name="plus-circle" fixWidth={true} size="lg" /></div>
        return <Page header={header} headerClassName="bg-primary" right={right}>
           <List items={this.controller.enumitemspager} item={{render: this.renderitem} }/>
        </Page>
    }


     /*禁用枚举*/
     private onDisabledClick=(item:any) => {
        this.controller.updateEnumItemDisabled(item);
    }

    /*新增枚举*/
    private onAddClick=() =>{
        this.controller.showEnumItemsEdit(this.enumeration);
    }

    //编辑枚举
    private editEnumClick = (item:any) => {
        this.controller.showEnumItemsEdit(this.enumeration, item);
    }

    //显示顺序上升
    private displayUpClick = async(item:any)=>{
        alert("你在"+item["name"]+"上按了上升按钮");
    }

    //显示顺序下降
    private displayDownClick = async(item:any)=>{
        alert("你在"+item["name"]+"上按了下降按钮");
    }




}