import * as React from 'react';
import { nav, Image, VPage, Prop, IconText, FA, PropGrid, LMR, Page, UiSchema, Schema, UiTextItem, Form, UiTextAreaItem, UiButton, Context, UiCheckItem } from 'tonva';
import {CDataDictionary} from '../CDataDictionary'
import {Switch, Button, Checkbox} from 'element-react'
import 'element-theme-default'; 
import { type } from 'os';

export class VEnumItemEdit extends VPage<CDataDictionary>{
    enumeration:number;
    async open(item?:any){
        this.enumeration=item.enumeration;
        this.openPage(this.page,item);
    }

    private page=(item?:any)=>{
        let formdate={...item};//将参数对象的属性自动生成同名元素的Json对象
        
        let schema:Schema=[
            {name:"name", type:"string", required:true},
            {name:'displayorder' , type:'integer'},
            {name:'disabled' , type:'boolean'},
            {name:'commit', type:'submit'}
        ];

        let uis:UiSchema={
            items:{
                name:{widget:"text",label:"名称",placeholder:"请输入名称"} as UiTextItem,
                displayorder:{widget: 'updown', label: '显示顺序', disabled:true, readOnly:true},  
                disabled:{widget: 'checkbox', label: '禁用'} as UiCheckItem,  
                commit:{widget:"button",label:"提交",className:"btn btn-primary w-100"} as UiButton
            }
        };

        let caption=item.id<0?"新增选项":"编辑选项";
        return <Page header={caption} headerClassName="bg-primary" back="close">
            <Form schema={schema} uiSchema={uis} formData={formdate} fieldLabelSize={2} onButtonClick={this.buttonclick} className="m-3"/>
        </Page>
    }

    private  buttonclick= async (name:string,context:Context)=> {
        if(name=='commit')
        {
            let ret=await this.controller.saveEnumItem(this.enumeration, context.data);
            if(ret.id===0){
                context.setError("名称","名称重复");
            }
            else{
                this.closePage();
            }
        }
    }

    


}