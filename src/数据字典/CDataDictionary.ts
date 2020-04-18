import { CUqBase } from "tonvaApp";
import { observable } from "mobx";
import _ from 'lodash';
import { Page, QueryPager } from "tonva";
import { createNo } from "tool/tools";
import { TuidSaveResult } from "tonva/dist/uq/tuid/tuid";
import { VDataDictionary } from "./VDataDictionary";
import {VProductTypeList} from "./产品类型/VProductTypeList";
import {VEnumerationList} from "./枚举选项/VEnumerationList";
import { CProducAttribute } from './产品属性/属性维护/CProducAttribute';
import { CAttributeClass } from './产品属性/属性分类/CAttributeClass';
import {ProductAttributeMain} from './产品属性/ProductAttributeMain'
import { VProductTypeEdit } from "./产品类型/VProductTypeEdit";
import { VEnumerationEidt } from "./枚举选项/VEnumerationEdit";
import { VEnumItemList } from "./枚举选项/VEnumItemList";
import { VEnumItemEdit } from "./枚举选项/VEnumItemEdit";



export class CDataDictionary extends CUqBase{
    /*必需的定义,可在这里进行初始化操作*/
    protected async internalStart(){
        this.CAttributeClass= this.newC(CAttributeClass);
        this.CProducAttribute=this.newC(CProducAttribute)
        //this.CAttributeClass.start();
    }

    /*必需的定义,用于输出模块的首个展示View*/
    tab = () =>this.renderView(VDataDictionary);//必需的定义


    /************************************************************************************/
    /**************************************产品类型维护***********************************/
    /************************************************************************************/
    productTypePage:QueryPager<any>;
    producttype:any;

    /*打开产品类型View*/
    showcplx=async()=>{
        this.productTypePage=new QueryPager(this.uqs.productcompare.queryproducttype,10,30);
        this.productTypePage.setItemDeepObservable();
        this.productTypePage.first({key:''});
        this.openVPage(VProductTypeList);
    }

    getemptyproducttype=():any=>{
        return {id: -1,no: '', name: '',seachcode: '', note:'' ,disabled:0} 
    }

    /**编辑产品类型**/
    showEditProductType=(item:any=undefined)=>{//producttype:any=undefined 表示company参数不传值时用等号后面的值赋值,company?:any 表示company可传可不传
        if(item===undefined)//新建
        {
            this.producttype=this.getemptyproducttype();
        }
        else
        {
            this.producttype=item;
        }
        this.openVPage(VProductTypeEdit,this.producttype);
    }
    
    /*保存产品类型*/
    saveproducttype = async (producttype:any):Promise<TuidSaveResult>=>{//因是异步调用,所以返回类型需要写成Promise<返回类型>
        let {id} = this.producttype;
        let {name,note,disabled} = producttype;
        if(id<0)//新增产品类型
        {
            /*生成编号*/
            let newno= await this.uqs.productcompare.producttype.no();
            let no= createNo(newno);
            this.producttype.no = no;
            /*生成编号*/ 
        }

        this.producttype.name=name;
        this.producttype.note=note;
        this.producttype.disabled=Number(disabled);

        let ret= await this.uqs.productcompare.producttype.save(id, this.producttype);//id传-1或0是显示表示新增,id>0显示的更新,id为undefined则先拿no查id,然后以id来进行更新,如果查不要到id则新增
        if(ret.id>0)//ret.id为保存后返回的的基础信息id,id=0表示失败,id>0表示成功,id<0表示为做任何更改,ret.inid调用save方法是传入的原始id值,
        {
            if(id<0)//新增的            
            {   
                this.producttype.id=ret.id;
                //this.productTypePage.items.unshift(this.producttype);//unshift将item放到items里的第一个,push将item放到items的末尾
                this.productTypePage.items.push(this.producttype);//unshift将item放到items里的第一个,push将item放到items的末尾
            }
            else//修改
            {
                let index = this.productTypePage.items.findIndex(v => v.id === id);
                if (index>=0) {
                    _.merge(this.productTypePage.items[index], this.producttype);
                }
            }
        }

        return ret;
    }

    updateProductTypeDisabled = async(producttype:any) =>{
        let{id,disabled}=producttype;
        let index = this.productTypePage.items.findIndex(v => v.id === id);
        if (index>=0) {
            this.productTypePage.items[index]["disabled"]=disabled==1?0:1;
            let ret=await this.uqs.productcompare.producttype.save(id,this.productTypePage.items[index]);

            if(ret.id<=0)
            {
                this.productTypePage.items[index]["disabled"]=disabled==1?0:1; 
            }
        }
    }

    /************************************************************************************/
    /**********************************打开产品属性TabView********************************/
    /************************************************************************************/

    /*打开产品属性View*/
    CProducAttribute:CProducAttribute;
    CAttributeClass:CAttributeClass;
    showcpsx=async()=>{
        await this.CAttributeClass.start();
        this.openVPage(ProductAttributeMain)
    }

    /************************************************************************************/
    /**************************************枚举维护***********************************/
    /************************************************************************************/
    enumerationPage:QueryPager<any>;
    enumeration:any;

    /*打开枚举选项View*/
    showmjxx=async()=>{
        this.enumerationPage=new QueryPager(this.uqs.productcompare.queryenum,10,30);
        this.enumerationPage.setItemDeepObservable();
        this.enumerationPage.first({key:''});
        this.openVPage(VEnumerationList);
    }

    getEmptyEnumeration=()=>{
        return {id:-1, no:'', name:'', note:'', disabled:0};
    }

    showEditEnumeration=(item:any=undefined)=>{//producttype:any=undefined 表示company参数不传值时用等号后面的值赋值,company?:any 表示company可传可不传
        if(item===undefined){//新增
            this.enumeration=this.getEmptyEnumeration();
        }
        else{//修改
            this.enumeration=item;
        }

        this.openVPage(VEnumerationEidt,this.enumeration);
    }

    saveEnumeration= async(item:any):Promise<TuidSaveResult>=>{
        let {id}=this.enumeration;
        let {name,note,disabled}=item;

        if(id<0){
             /*生成编号*/
            let newno=await this.uqs.productcompare.enumeration.no();
            let no=createNo(newno);
            this.enumeration.no=no;
             /*生成编号*/
        }

        this.enumeration.name=name;
        this.enumeration.note=note;
        this.enumeration.disabled=disabled;
    
        let ret=await this.uqs.productcompare.enumeration.save(id,this.enumeration);//ret.id为保存后返回的的基础信息id,id=0表示失败,id>0表示成功,id<0表示为做任何更改,ret.inid调用save方法是传入的原始id值
        if(ret.id>0){//保存成功
            if(id<0){//新增
                this.enumeration.id=ret.id;
                this.enumerationPage.items.push(this.enumeration);
            }
            else{
                let index=this.enumerationPage.items.findIndex(vi => vi.id === id);
                if(index>0)
                {
                    _.merge(this.enumerationPage.items[index],this.enumeration);
                }
            }
        }

        return ret;
    }

    
    updateEnumerationDisabled = async(enumeration:any) =>{
        let{id,disabled}=enumeration;
        let index = this.enumerationPage.items.findIndex(v => v.id === id);
        if (index>=0) {
            this.enumerationPage.items[index]["disabled"]=disabled==1?0:1;
            let ret=await this.uqs.productcompare.enumeration.save(id,this.enumerationPage.items[index]);

            if(ret.id<=0)
            {
                this.productTypePage.items[index]["disabled"]=disabled==1?0:1; 
            }
        }
    }

    /************************************************************************************/
    /**************************************枚举选项维护***********************************/
    /************************************************************************************/
    enumitemspager:QueryPager<any>;
    enumitem:any;

    showEnumItemsView = (enumeration:any) =>{
        let {id} = enumeration;
        this.enumitemspager=new QueryPager(this.uqs.productcompare.queryenumitems,1000,1000);
        this.enumitemspager.setItemDeepObservable();
        this.enumitemspager.first({key:'',ownerenum:id});
        this.openVPage(VEnumItemList,enumeration);
    }

    getemptyitem =() =>{
        return {id:-1, no:'', name:'', displayorder:0, enumeration:-1, disabled:0};
    }

    showEnumItemsEdit = (enumeration:any, item:any=undefined) =>{
        if(item===undefined){
            this.enumitem=this.getemptyitem();
            this.enumitem.enumeration=enumeration.id;
            this.enumitem.displayorder=this.enumitemspager.items.length + 1;
        }
        else{
            this.enumitem=item;
        }

        this.openVPage(VEnumItemEdit,this.enumitem)
    }

    saveEnumItem = async(enumeration:number, item:any):Promise<TuidSaveResult>=>{
        let {id}=this.enumitem;
        let {name,displayorder,disabled}=item;

        if(id<0){
             /*生成编号*/
            let newno=await this.uqs.productcompare.enumitems.no();
            let no=createNo(newno);
            this.enumitem.no=no;
             /*生成编号*/
        }

        this.enumitem.name=name;
        this.enumitem.displayorder=displayorder;
        this.enumitem.disabled=disabled;
        this.enumitem.enumeration=this.uqs.productcompare.enumeration.boxId(enumeration);
    
        let ret=await this.uqs.productcompare.enumitems.save(id,this.enumitem);//ret.id为保存后返回的的基础信息id,id=0表示失败,id>0表示成功,id<0表示为做任何更改,ret.inid调用save方法是传入的原始id值
        if(ret.id>0){//保存成功
            this.enumitem.enumeration=enumeration;
            if(id<0){//新增
                this.enumitem.id=ret.id;
                this.enumitemspager.items.push(this.enumitem);
            }
            else{
                let index=this.enumitemspager.items.findIndex(vi => vi.id === id);
                if(index>0)
                {
                    _.merge(this.enumitemspager.items[index],this.enumitem);
                }
            }
        }

        return ret;
    }

    updateEnumItemDisabled = async(enumitem:any) =>{
        let{id,disabled}=enumitem;
        let index = this.enumitemspager.items.findIndex(v => v.id === id);
        if (index>=0) {
            this.enumitemspager.items[index]["disabled"]=disabled==1?0:1;
            let enumeration=this.enumitemspager.items[index].enumeration;
            this.enumitemspager.items[index].enumeration=this.uqs.productcompare.enumeration.boxId(enumeration);
            let ret=await this.uqs.productcompare.enumitems.save(id,this.enumitemspager.items[index]);
            this.enumitemspager.items[index].enumeration=enumeration;
            if(ret.id<=0)
            {
                this.enumitemspager.items[index]["disabled"]=disabled==1?0:1; 
            }
        }
    }


}