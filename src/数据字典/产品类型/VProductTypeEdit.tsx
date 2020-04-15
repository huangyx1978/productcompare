import * as React from 'react';
import { nav, Image, VPage, Prop, IconText, FA, PropGrid, LMR, Page, UiSchema, Schema, UiTextItem, Form, UiTextAreaItem, UiButton, Context, UiCheckItem } from 'tonva';
import {CDataDictionary} from '../CDataDictionary'
import {Switch, Button, Checkbox} from 'element-react'
import 'element-theme-default'; 

export class VProductTypeEdit extends VPage<CDataDictionary>
{
    async open(producttype?: any){
        this.openPage(this.page,producttype);
    }


    private renderdisabled = (item: any) => {
        return <Checkbox><Switch name='disabled' onValue='1' offValue='0' onText='启用' offText='禁用'></Switch></Checkbox>;//将基础信息的内容进行组织并输出
    }

    private page=(producttype?: any)=>{
        //let formdate={no:company.no,name:company.name,abbreviation:company.abbreviation,address:company.address,telephone:company.telephone,note:company.note};
        let formdate={...producttype};//将参数对象的属性自动生成同名元素的Json对象

        let schema: Schema=[
            {name:'name', type:'string' ,required:true},
            {name:'note', type:'string'},
            {name:'disabled' , type:'string'},
            {name:'commit', type:'submit'}
        ];

        let uis: UiSchema={
            items:{
                name:{widget: 'text', label: '名称', placeholder: '请输入名称'} as UiTextItem,
                note:{widget: 'textarea', label: '备注'} as UiTextAreaItem,   
                disabled:{widget: 'checkbox', label: '禁用'} as UiCheckItem,  
                commit:{widget:'button', label: '提交',className:'btn btn-primary w-100'} as UiButton 
            }
        };

        let caption=producttype.id<0?'新增产品类型':producttype.name;
        return <Page header={caption} headerClassName="bg-primary" back="close">
            <Form schema={schema} uiSchema={uis} formData={formdate} fieldLabelSize={2} onButtonClick={this.buttonclick} className="m-3"/>
        </Page>
    }

    private  buttonclick= async (name:string,context:Context)=> {
        if(name=='commit')
        {
            let ret= await this.controller.saveproducttype(context.data);
            if(ret.id===0)
            {
                context.setError('name', '名称重复');
            }
            else
            {
            this.closePage();
            }
        }
    }


}