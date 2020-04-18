import * as React from 'react';
import classNames from 'classnames';
import { Page, VPage, ImageUploader, Form, ItemSchema, UiSchema, UiTextItem, ButtonWidget, UiButton, NumSchema, UiTextAreaItem, List, LMR, FA, SearchBox } from 'tonva';
import {CDataDictionary} from '../CDataDictionary'

export class VEnumerationList extends VPage<CDataDictionary>{
    async open(param?: any){
        this.openPage(this.page);
    }

    /*单个数据项输出界面元素*/
    private renderitem=(item:any, index:number) => {
        let {name,disabled} = item;
        let right = <div className="row">
                        <div onClick={()=>this.onDisabledClick(item)}><FA name={disabled==1?"toggle-off":"toggle-on"} className={classNames(disabled==1?"text-primary":"text-primary","mx-1")} size="lg" fixWidth={true}/></div>
                        <div onClick={()=>this.editEnumClick(item)}><FA name="edit" className="text-primary mx-1" size="lg" fixWidth={true}/></div>
                        <div onClick={()=>this.editEnumItemClick(item)}><FA name="list" className="text-primary mr-2" size="lg" fixWidth={true}/></div>
                    </div>;//列表右侧显示的界面元素
        return <LMR className="px-3 py-2 align-items-center cursor-pointer" right={right}><b className="h6">{name}</b></LMR>//输出包含左中右三个分区的列表项
    }
        

    private page=()=>{
        let header=<SearchBox label="枚举选项" onSearch={this.onsearch} allowEmptySearch={true} className="w-100"/>
        let right=<div className="cursor-pointer align-self-center mr-2" onClick={this.onAddClick}><FA name="plus-circle" fixWidth={true} size="lg" /></div>
        return <Page header={header} headerClassName="bg-primary" right={right} onScrollBottom={this.onScrollBottom}>
           <List items={this.controller.enumerationPage} item={{render: this.renderitem} }/>
        </Page>
    }

    /*页面滚动到底部时触发的操作*/
    private onScrollBottom = () => {
        this.controller.enumerationPage.more();//执行下一页的查询
    }

    /*查询码检索*/
    private onsearch= async (searchkey:string)=>{
        if(searchkey===null || searchkey===undefined) searchkey='';
        await this.controller.enumerationPage.first({key:searchkey});//将参数包装成一个Json对象的属性
     }

     /*禁用枚举*/
     private onDisabledClick=(item:any) => {
        this.controller.updateEnumerationDisabled(item);
    }

    /*新增枚举*/
    private onAddClick=() =>{
        this.controller.showEditEnumeration();
    }

    //编辑枚举
    private editEnumClick = (item:any) => {
        this.controller.showEditEnumeration(item);
    }

    //编辑枚举选项
    private editEnumItemClick = (item:any) => {
        this.controller.showEnumItemsView(item);
    }





}