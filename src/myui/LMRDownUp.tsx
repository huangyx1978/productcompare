import * as React from 'react';
import {observer} from 'mobx-react';
import classNames from 'classnames';
import {LMR,List,LMRProps } from 'tonva';
import 'css/va-lmr.css';
import { on } from 'cluster';


export interface LMRDUProps extends LMRProps {

}


@observer
export class LMRDownUp extends React.Component<LMRDUProps>{
    render() {
        let {className, left, children, right, onClick} = this.props;

        return  <div className="list-group-item p-1">
                    <LMR className={classNames(className,"list-group-item")} left={left} right={right} onClick={onClick}>{children}</LMR>
                    <div className="row w-100">
                        998
                    </div>
                        {/*<div className="card-header p-0">
                        <LMR className={classNames(className,"list-group-item")} left={left} right={right} onClick={onClick}>{children}</LMR>
                        </div>
                        <ul className="list-group m-0 p-0 list-group-flush" >
                            <div className="list-group-item">Cras justo odio</div>
                            <div className="list-group-item">Dapibus ac facilisis in</div>
                            <div className="list-group-item">Vestibulum at eros</div>
                        </ul>*/}
                </div>;

        {/*<div className="list-group-item d-flex justify-content-between align-items-center w-100 p-0 m-0 border-0">
                    {children}
                    <span className="badge badge-primary badge-pill">14</span>
                </div>;*/}
            
    }
}