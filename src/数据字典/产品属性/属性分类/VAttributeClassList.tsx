import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { nav, Image, VPage, Prop, IconText, FA, PropGrid, LMR, Page, List,SearchBox } from 'tonva';
import {CAttributeClass} from './CAttributeClass'; 

export class VAtrributeClassList extends VPage<CAttributeClass>{
    /*必需的定义*/
    producttype:any;
    async open(producttype?: any){
        this.producttype=producttype;
        this.openPage(this.page);
    }

    /*单个数据项输出界面元素*/
    private renderAttributeClass=(attributeClass:any, index:number) => {
        let {no,name,disabled} = attributeClass;//将company对象的no属性,name属性,disabled属性自动赋值给同名的变量,一种语法糖,类似于C#中Json对象与类的实例自动转换,通过名称自动匹配
        let right = <div className="row">
                        <div onClick={()=>this.disabledClick(attributeClass)}><FA name={disabled==1?"toggle-off":"toggle-on"} className="text-primary mx-1" size="lg" fixWidth={true}/></div>
                        <div onClick={()=>this.editItemClick(attributeClass)}><FA name="edit" className="text-primary mx-1" size="lg" fixWidth={true}/></div>
                        <div onClick={()=>this.displayUpClick(attributeClass)}><FA name="arrow-circle-up" className="text-primary mx-1" size="lg" fixWidth={true}/></div>
                        <div onClick={()=>this.displayDownClick(attributeClass)}><FA name="arrow-circle-down" className="text-primary mr-2" size="lg" fixWidth={true}/></div>
                    </div>;//列表右侧显示的界面元素
        return <LMR className="px-3 py-2 align-items-center cursor-pointer" right={right} ><b className="h6">{name}</b></LMR>//输出包含左中右三个分区的列表项
    }

    private page=()=>{
        let header= "属性分类" + "(" + this.producttype.name + ")";
        let right=<div className="cursor-pointer align-self-center mr-2" onClick={this.onAddClick}><FA name="plus-circle" fixWidth={true} size="lg" /></div>
        return <Page header={header} right={right} headerClassName="bg-primary align-middle">
           {/*输出列表,其中属性items为数据集合,属性item可自定义集合项输出样式和指定事件处理方法,
            render用于指定自定义输出布局的方法,该方法两个参数,第一个参数就是遍历数据集合时当前数据项,第二个参数为数据项在集合中的索引
            onClick用于指定集合项在接收点击事件的处理方法*/}
            <List items={this.controller.classListPage} item={{render: this.renderAttributeClass} }/> 
        </Page>
    }

    //更新属性分类禁用状态
    private disabledClick = (item:any) => {
        this.controller.eidtAttributeClassDisabled(item);
    }

    //新增属性分类
    private onAddClick=() =>{
        this.controller.showEditAttributeClass(this.producttype);
    }

    //编辑属性分类
    private editItemClick = (item:any) => {
        this.controller.showEditAttributeClass(this.producttype, item);
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