import { CUqBase } from "tonvaApp";
import { observable } from "mobx";
import _ from 'lodash';
import { VAttributeClassGroup } from "./VAttributeClassGroup";
import { QueryPager, Query } from "tonva";
import { VAtrributeClassList } from "./VAttributeClassList";

export class CAttributeClass extends CUqBase{
    /*必需的定义,可在这里进行初始化操作*/
    protected async internalStart(){
        /*初始化时提供数据*/
        this.productTypeGroupPager=new QueryPager(this.uqs.productcompare.queryproductypegroup,10,30);
        this.productTypeGroupPager.setItemDeepObservable();
        await this.productTypeGroupPager.first({key:''});
    }

    productTypeGroupPager:QueryPager<any>;
    classListPage:QueryPager<any>;
    ;


    /*必需的定义,用于输出模块的展示View*/
    tab = () =>this.renderView(VAttributeClassGroup);//必需的定义


    /*显示对应产品类型下的属性分类列表*/
    showAttributeClassList=async(proDuctType:any)=>{
        let {id}=proDuctType;
        this.classListPage=new QueryPager(this.uqs.productcompare.queryproductattributeclass,1000,1000);
        this.classListPage.setItemDeepObservable();
        this.classListPage.first({key:'',ownerproducttype:id});
        this.openVPage(VAtrributeClassList);
    }

    showNewAttributeClass=()=>{

    }


    showEditAttributeClass=(attributeclass:any)=>{

    }

    saveAttributeClass=(attributeclass:any)=>{
        
    }
    


    eidtAttributeClassDisabled=(attributeClass:any)=>{
        let {id,disabled} = attributeClass;
        let index = this.classListPage.items.findIndex(v => v.id === id);
        if (index>=0) {
            this.classListPage.items[index].disabled=disabled==1?0:1;
            this.uqs.productcompare.productattributeclass.save(id,this.classListPage.items[index]);
        }
    }
    



}