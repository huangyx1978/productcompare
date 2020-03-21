import * as React from 'react';
import { nav, Image, VPage, Prop, IconText, FA, PropGrid, LMR, Page } from 'tonva';
// import { observable } from 'mobx';
// import { observer } from 'mobx-react';
// import { EditMeInfo } from './EditMeInfo';
// import { appConfig } from 'configuration';
import { CMe } from './CMe';
import config from '../../package.json';

export class VMe extends VPage<CMe> {

    async open(param?: any) {
    }


    render(){
        return <Page header="个人中心" headerClassName="bg-info">
            <div>
           
            </div>
        </Page>
    }   
}
