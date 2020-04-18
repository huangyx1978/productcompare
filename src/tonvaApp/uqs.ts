import { Tuid, Map, Query, Action, Sheet, Pending } from "tonva";

export interface productcompare {
    producttype:Tuid;
    productattribute:Tuid;
    productattributeclass:Tuid;
    enumeration:Tuid;
    enumitems:Tuid;
    queryproducttype:Query;
    queryproductypegroup:Query;
    queryproductattributeclass:Query;
    queryenum:Query;
    queryenumitems:Query;
}

export interface UQs {
    productcompare: productcompare;
}

