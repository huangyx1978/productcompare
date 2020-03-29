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
           <div>
                浏览器信息{navigator.userAgent}
            </div>
            <div>
                像素比[{window.devicePixelRatio}]
            </div>
            <div>
                屏幕宽度[{window.screen.width}]
            </div>
            <div>
                屏幕高度[{window.screen.height}]
            </div>
            <div>
                url[{window.location.href}]
            </div>
        </Page>
    }

}