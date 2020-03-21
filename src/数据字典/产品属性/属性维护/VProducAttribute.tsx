import * as React from 'react';
import { nav, Image, VPage, Prop, IconText, FA, PropGrid, LMR, Page, List } from 'tonva';
import {CProducAttribute} from './CProducAttribute'; 

interface MenuItem{
    caption:string,
    onClick:()=>void
}

export class VProducAttribute extends VPage<CProducAttribute>{
    /*必需的定义*/
    async open(param?: any){
        
    }

    render(){
        return <Page header="属性维护" headerClassName="bg-info">

        </Page>
    }

}