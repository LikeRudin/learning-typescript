declare module "lodash" {

    function head<T>(array: T[]): T | undefined;
    
    function hasIn(obj: Object, key: string): boolean;
    function isBoolean(value: any): boolean;
    function toString(value: any): string;
    function split(str: string, seperator: RegExp | string, limit: number): Array<string>;
    function hasPath<T>(obj: Object, path: T[] | string): boolean;
    function filter<T>(array: Array<T>, predicate: Function): Array<T>;
    function every<T>(array: Array<T>, predicate: Function): boolean;
    function map<T>(array: Array<T>, predicate: Function): Array<T>;
    
    }