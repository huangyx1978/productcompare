import * as React from 'react';
import { Page, VPage, ImageUploader, Form, ItemSchema, UiSchema, UiTextItem, ButtonWidget, UiButton, NumSchema, UiTextAreaItem, List, LMR, FA, SearchBox } from 'tonva';
import {CUserManage} from '../CUserManage'

export class VFormManage extends VPage<CUserManage>{
    async open(param?: any){
        this.openPage(this.page);
    }


    private page=()=>{
        return <Page header="权限分配" headerClassName="bg-info">
           
        </Page>
    }

}