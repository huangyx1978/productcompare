import { Tuid, Map, Query, Action, Sheet, Pending } from "tonva";

export interface productcompare {
    producttype:Tuid;
    productattribute:Tuid;
    productattributeclass:Tuid;
    queryproducttype:Query;
    queryproductypegroup:Query;
    queryproductattributeclass:Query;
}

export interface UQs {
    productcompare: productcompare;
}

