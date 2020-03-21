import * as React from 'react';
import { Page, VPage, ImageUploader, Form, ItemSchema, UiSchema, UiTextItem, ButtonWidget, UiButton, NumSchema, UiTextAreaItem, List, LMR, FA, SearchBox } from 'tonva';
import {CProductType} from './CProductType'

export class VProductTypeList extends VPage<CProductType>{
    async open(param?: any){
        this.openPage(this.page);
    }


    private page=()=>{
        return <Page header="产品类型" headerClassName="bg-primary align-middle">
           
        </Page>
    }

}