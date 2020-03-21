import * as React from 'react';
import { nav, Image, VPage, Prop, IconText, FA, PropGrid, LMR, Page, List } from 'tonva';
import {CAttributeClass} from './CAttributeClass'; 

interface MenuItem{
    caption:string,
    onClick:()=>void
}

export class VAttributeClass extends VPage<CAttributeClass>{
    /*必需的定义*/
    async open(param?: any){
        
    }

    render(){
        return <Page header="属性分类" headerClassName="bg-info">

        </Page>
    }

}