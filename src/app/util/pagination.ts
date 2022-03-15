import { max } from 'rxjs/operators';

export interface PageQuery {
    first: number;
    max: number;
}

export interface PageQueryRegs {
    page: number;
    registros: Array<any>;
}

export interface SortMeta {
    field: string;
    order: number;
}

export interface FilterMetadata {
    value?: any;
    matchMode?: string;
}

export class PaginationLoadLazy {

    first?: number;
    rows?: number;
    sortField?: string;
    sortOrder?: number;
    multiSortMeta?: SortMeta[];
    filters?: {[s: string]: FilterMetadata; };
    globalFilter?: any;

}
