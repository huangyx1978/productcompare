import * as React from 'react';
import { Page, VPage, ImageUploader, Form, ItemSchema, UiSchema, UiTextItem, ButtonWidget, UiButton, NumSchema, UiTextAreaItem, List, LMR, FA, SearchBox } from 'tonva';
import {CDataDictionary} from '../CDataDictionary'

export class VMenmList extends VPage<CDataDictionary>{
    async open(param?: any){
        this.openPage(this.page);
    }


    private page=()=>{
        return <Page header="枚举选项" headerClassName="bg-info">
           
        </Page>
    }

}