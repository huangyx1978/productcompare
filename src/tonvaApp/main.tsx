import * as React from 'react';
import { VPage, TabCaptionComponent, Page, Tabs, Image } from 'tonva';
import { CApp } from '../CApp';

const color = (selected: boolean) => selected === true ? 'text-primary' : 'text-muted';

export class VMain extends VPage<CApp> {
    async open(param?: any) {
        this.openPage(this.render);
    }

    render = (param?: any): JSX.Element => {
        /*将模块对应的controller加入到全局controller集合中,同常一个模块对应一个controller*/
        let {  cMe } = this.controller;
        /*定义主界面的Tab,一个Tab对应一个模块*/
        let faceTabs = [
            { name: 'me', label: '个人中心', icon: 'user', content: cMe.tab }
        ].map(v => {
            let { name, label, icon, content/*, notify, onShown*/ } = v;
            return {
                name: name,
                caption: (selected: boolean) => TabCaptionComponent(label, icon, color(selected)),
                content: content,
                //notify: notify,
                //onShown: onShown,
            }
        });
        return <Page header={false} headerClassName={"bg-info"} >
            <Tabs tabs={faceTabs} />
        </Page>;
        //
    }
}
