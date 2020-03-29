import * as React from 'react';
import { Page, VPage, ImageUploader, Form, ItemSchema, UiSchema, UiTextItem, ButtonWidget, UiButton, NumSchema, UiTextAreaItem, List, LMR, FA, SearchBox } from 'tonva';
import {CDataDictionary} from '../CDataDictionary'

export class VProductTypeList extends VPage<CDataDictionary>{
    async open(param?: any){
        this.openPage(this.page);
    }


    /*单个数据项输出界面元素*/
    private renderproducttype=(producttype:any, index:number) => {
        let {no,name,disabled} = producttype;//将company对象的no属性,name属性,disabled属性自动赋值给同名的变量,一种语法糖,类似于C#中Json对象与类的实例自动转换,通过名称自动匹配
        let right = <span className="align-items-center">{disabled===true?'禁用':'启用'}</span>;//列表右侧显示的界面元素
        return <LMR className="px-3 py-2 align-items-center cursor-pointer" right={right} ><b className="h6">{name}</b></LMR>//输出包含左中右三个分区的列表项
    }

    private page=()=>{
        let header=<SearchBox label="产品类型" onSearch={this.onseach} className="w-100"/>
        let right=<div className="cursor-pointer align-self-center mr-2" onClick={this.onAddClick}><FA name="plus-circle" fixWidth={true} size="lg" /></div>
        return <Page header={header} right={right} headerClassName="bg-primary align-middle" onScrollBottom={this.onScrollBottom}>
           {/*输出列表,其中属性items为数据集合,属性item可自定义集合项输出样式和指定事件处理方法,
            render用于指定自定义输出布局的方法,该方法两个参数,第一个参数就是遍历数据集合时当前数据项,第二个参数为数据项在集合中的索引
            onClick用于指定集合项在接收点击事件的处理方法*/}
            <List items={this.controller.productTypePage} item={{render: this.renderproducttype, onClick: this.onItemClick} }/> 
        </Page>
    }

    /*页面滚动到底部时触发的操作*/
    private onScrollBottom = () => {
        this.controller.productTypePage.more();//执行下一页的查询
        }

    private onseach= async (seachkey:string)=>{
        if(seachkey===null) seachkey='';
        await this.controller.productTypePage.first({key:seachkey});//将参数包装成一个Json对象的属性
     }

     private onAddClick=() =>{
        this.controller.showEditProductType();
    }

    private onItemClick = (item:any) => {
        this.controller.showEditProductType(item);
    }

}