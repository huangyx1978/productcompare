import { CUqBase } from "tonvaApp";
import { QueryPager, Query, ReactBoxId } from "tonva";
import { observable } from "mobx";
import _ from 'lodash';
import { createNo } from "tool/tools";
import { TuidSaveResult } from "tonva/dist/uq/tuid/tuid";
import { VAttributeClassGroup } from "./VAttributeClassGroup";
import { VAtrributeClassList } from "./VAttributeClassList";
import { VAttributeClassEdit } from "./VAttributeClassEdit";


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


    /*必需的定义,用于输出模块的展示View*/
    tab = () =>this.renderView(VAttributeClassGroup);//必需的定义

    /*显示对应产品类型下的属性分类列表*/
    showAttributeClassList=async(proDuctType:any)=>{
        let {id}=proDuctType;
        this.classListPage=new QueryPager(this.uqs.productcompare.queryproductattributeclass,1000,1000);
        this.classListPage.setItemDeepObservable();
        this.classListPage.first({key:'',ownerproducttype:id});
        this.openVPage(VAtrributeClassList,proDuctType);
    }

    /******************************************************/
    /**********************属性分类维护*********************/
    /******************************************************/
    attributeclass:any;

    getemptyatrributeclass =():any=>{
        return {id: -1, no: '', name: '', seachcode: '', displayorder:0, producttype:-1 , note:'' , disabled:0}
    }

    boxProductType(id:number) {
        return this.uqs.productcompare.producttype.boxId(id);//boxId是根据id获取基础信息,获取字段列表为TUID里定义为main的字段
    }

    showEditAttributeClass=(producttype:any,attributecalss:any=undefined)=>{//attributecalss:any=undefined 表示attributecalss参数不传值时用等号后面的值赋值,attributecalss?:any 表示attributecalss可传可不传
        if(attributecalss===undefined)
        {
            this.attributeclass=this.getemptyatrributeclass();
            this.attributeclass.producttype=producttype.id;
            this.attributeclass.displayorder=this.classListPage.items.length + 1;
        }
        else
        {
            this.attributeclass=attributecalss;
        }
        this.openVPage(VAttributeClassEdit,this.attributeclass);
    }

    saveAttributeClass= async(producttype:number,attributeclass:any):Promise<TuidSaveResult>=>{
        let {id}=this.attributeclass;
        let {name,note,displayorder,disabled}=attributeclass;
        if(id<0)//新增
        {
             /*生成编号*/
             let newno= await this.uqs.productcompare.productattributeclass.no();
             let no= createNo(newno);
             this.attributeclass.no = no;
             /*生成编号*/ 
        }
        this.attributeclass.name=name;
        this.attributeclass.displayorder=displayorder;
        this.attributeclass.producttype=this.uqs.productcompare.producttype.boxId(producttype);
        this.attributeclass.note=note;
        this.attributeclass.disabled=disabled;

        let ret=await this.uqs.productcompare.productattributeclass.save(id,this.attributeclass);
        if(ret.id>0)//ret.id为保存后返回的的基础信息id,id=0表示失败,id>0表示成功,id<0表示未做任何更改,ret.inid调用save方法是传入的原始id值
        {
            this.attributeclass.producttype=producttype;
            if(id<0)//新增
            {
                this.attributeclass.id=ret.id;
                this.classListPage.items.push(this.attributeclass);//unshift将item放到items里的第一个,push将item放到items的末尾
                let index = this.productTypeGroupPager.items.findIndex(v => v.id === producttype)
                if(index>=0)
                {
                    let classcount=this.productTypeGroupPager.items[index].classcount;
                    this.productTypeGroupPager.items[index].classcount=classcount+1;
                }

            }
            else//修改
            {
                let index = this.classListPage.items.findIndex(v => v.id === id);//返回当前id的item在集合中的索引
                if (index>=0) 
                {
                    _.merge(this.classListPage.items[index], this.attributeclass);
                }
            }
        }

        return ret;
    }
    
    eidtAttributeClassDisabled=async(attributeClass:any)=>{
        let {id,disabled} = attributeClass;
        let index = this.classListPage.items.findIndex(v => v.id === id);
        if (index>=0) {
            this.classListPage.items[index].disabled=disabled==1?0:1;
            await this.uqs.productcompare.productattributeclass.save(id,this.classListPage.items[index]);
        }
    }
    



}