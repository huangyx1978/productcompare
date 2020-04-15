import { CUqBase } from "tonvaApp";
import { observable } from "mobx";
import _ from 'lodash';
import { Page, QueryPager } from "tonva";
import { createNo } from "tool/tools";
import { TuidSaveResult } from "tonva/dist/uq/tuid/tuid";
import { VDataDictionary } from "./VDataDictionary";
import {VProductTypeList} from "./产品类型/VProductTypeList";
import {VMenmList} from "./枚举选项/VMenmList";
import { CProducAttribute } from './产品属性/属性维护/CProducAttribute';
import { CAttributeClass } from './产品属性/属性分类/CAttributeClass';
import {ProductAttributeMain} from './产品属性/ProductAttributeMain'
import { VProductTypeEdit } from "./产品类型/VProductTypeEdit";



export class CDataDictionary extends CUqBase{
    /*必需的定义,可在这里进行初始化操作*/
    protected async internalStart(){
        this.CAttributeClass= this.newC(CAttributeClass);
        this.CProducAttribute=this.newC(CProducAttribute)
        this.CAttributeClass.start();
    }

    productTypePage:QueryPager<any>;

    /*必需的定义,用于输出模块的展示View*/
    tab = () =>this.renderView(VDataDictionary);//必需的定义

    /*打开产品类型View*/
    showcplx=async()=>{
        this.productTypePage=new QueryPager(this.uqs.productcompare.queryproducttype,10,30);
        this.productTypePage.setItemDeepObservable();
        this.productTypePage.first({key:''});
        this.openVPage(VProductTypeList);
    }

    CProducAttribute:CProducAttribute;
    CAttributeClass:CAttributeClass;
    /*打开产品属性View*/
    showcpsx=async()=>{
        this.openVPage(ProductAttributeMain)
    }

    /*打开属性分类View*/
    showmjxx=async()=>{
        this.openVPage(VMenmList);
    }

    /************************************************************************************/
    /**************************************产品类型维护***********************************/
    /************************************************************************************/
    producttype:any;

    getemptyproducttype=():any=>{
        return {id: -1,no: '', name: '',seachcode: '', note:'' ,disabled:0} 
    }

    /**新增产品类型**/
    showNewproducttype=async()=>{
       this.producttype=this.getemptyproducttype();
        /*生成编号*/
        let newno= await this.uqs.productcompare.producttype.no();
        let no= createNo(newno);
        this.producttype.no = no;
        /*生成编号*/ 
        this.openVPage(VProductTypeEdit,this.producttype);
    }

    /**编辑产品类型**/
    showEditProductType=async(producttype:any=undefined)=>{//producttype:any=undefined 表示company参数不传值时用等号后面的值赋值,company?:any 表示company可传可不传
        if(producttype===undefined)//新建
        {
            this.producttype=this.getemptyproducttype();
        }
        else
        {
            this.producttype=producttype;
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
                this.productTypePage.items.unshift(this.producttype);
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

            if(ret.id>0)
            {

            }
            else
            {
                this.productTypePage.items[index]["disabled"]=disabled==1?0:1; 
            }
        }
    }




}