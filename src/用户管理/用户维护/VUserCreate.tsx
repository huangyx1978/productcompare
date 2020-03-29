import * as React from 'react';
import { Page, VPage, ImageUploader, Form, ItemSchema, UiSchema, UiTextItem, ButtonWidget, UiButton, NumSchema, UiTextAreaItem, List, LMR, FA, SearchBox } from 'tonva';
import {CUserManage} from '../CUserManage'

export class VUserCreate extends VPage<CUserManage>{
    async open(param?: any){
        this.openPage(this.page);
    }


    private page=()=>{
        return <Page header="用户维护" headerClassName="bg-info">
           
        </Page>
    }

}