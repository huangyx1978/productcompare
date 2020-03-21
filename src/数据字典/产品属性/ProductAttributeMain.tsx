import * as React from 'react';
import { VPage, TabCaptionComponent, Page, Tabs, Image } from 'tonva';
import { CDataDictionary } from '../CDataDictionary';

const color = (selected: boolean) => selected === true ? 'text-primary' : 'text-muted';

export class ProductAttributeMain extends VPage<CDataDictionary> {
    async open(param?: any) {
        this.openPage(this.render);
    }

    render = (param?: any): JSX.Element => {
        /*将模块对应的controller加入到全局controller集合中,通常一个模块对应一个controller*/
        let {  CAttributeClass,CProducAttribute} = this.controller;
        /*定义主界面的Tab,一个Tab对应一个模块*/
        let faceTabs = [
            { name: 'AttributeClass', label: '属性分类', icon: 'tasks', content: CAttributeClass.tab },
            { name: 'ProducAttribute', label: '产品属性', icon: 'tasks', content: CProducAttribute.tab },
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
        
    }
}
