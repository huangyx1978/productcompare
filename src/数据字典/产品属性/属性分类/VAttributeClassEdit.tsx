import * as React from 'react';
import { nav, Image, VPage, Prop, IconText, FA, PropGrid, LMR, Page, UiSchema, Schema, UiTextItem, Form, UiTextAreaItem, UiButton, Context, UiCheckItem,UiIdItem,tv } from 'tonva';
import {CAttributeClass} from './CAttributeClass'
import {Switch, Button, Checkbox} from 'element-react'
import 'element-theme-default'; 

export class VAttributeClassEdit extends VPage<CAttributeClass>
{
    producttype:number;
    async open(attributeclass?: any){
        this.producttype=attributeclass.producttype;
        this.openPage(this.page,attributeclass);
    }

    private producttypepickid = async (context: Context, name: string, value: number)=>{
        //let ret = await this.controller.callproducttype();
        //return ret;
        return this.producttype;
    }

    private renderProductType = (item: any) => {
        let boxId = this.controller.boxProductType(item);//根据基础信息id获取基础信息
        return tv(boxId,(values) => <span>{values.name}</span>);//将基础信息的内容进行组织并输出
        //return tv(boxId);//不带第二个参数的时候内容输出格式在 tvs.tsx中定义
    }

    private page=(attributeclass?: any)=>{
        //let formdate={no:company.no,name:company.name,abbreviation:company.abbreviation,address:company.address,telephone:company.telephone,note:company.note};
        let formdate={...attributeclass};//将参数对象的属性自动生成同名元素的Json对象

        let schema: Schema=[
            {name:'name', type:'string' ,required:true},
            {name:'note', type:'string'},
            {name:'displayorder' , type:'integer'},
            {name:'disabled' , type:'boolean'},
            {name:'producttype', type:'id'},
            {name:'commit', type:'submit'}
        ];

        let uis: UiSchema={
            items:{
                name:{widget: 'text', label: '名称', placeholder: '请输入名称'} as UiTextItem,
                note:{widget: 'textarea', label: '备注'} as UiTextAreaItem,   
                displayorder:{widget: 'updown', label: '显示顺序', disabled:true, readOnly:true},  
                disabled:{widget: 'checkbox', label: '禁用'} as UiCheckItem,  
                producttype:{widget: 'id', label: '所属产品类型', pickId:this.producttypepickid , Templet: this.renderProductType, disabled:true, readOnly:true} as UiIdItem,//通过pickId来调用打开选取公司机构的弹出窗体,Templet来调用方法用于组织显示内容
                commit:{widget:'button', label: '提交',className:'btn btn-primary w-100'} as UiButton 
            }
        };

        let caption=attributeclass.id<0?'新增属性分类':attributeclass.name;
        return <Page header={caption} headerClassName="bg-primary" back="close">
            <Form schema={schema} uiSchema={uis} formData={formdate} fieldLabelSize={2} onButtonClick={this.buttonclick} className="m-3"/>
        </Page>
    }

    private  buttonclick= async (name:string,context:Context)=> {
        if(name=='commit')
        {
            let ret= await this.controller.saveAttributeClass(this.producttype, context.data);
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