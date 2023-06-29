
type Last = <T>(arr: T[]) => T;
const last = (arr: any[]) => arr[arr.length - 1];


type Prepend = <T, V>(arr: T[], item: V) => (T | V)[];
const prepend: Prepend = (arr, item) => [item, ...arr];


type Mix = <T, V>(arr1: T[], arr2:V[]) => (T | V)[];
const mix:Mix = (arr1, arr2) => [...arr1, ...arr2];

type Count = <T>(arr: T[]) => number;
const count: Count = (arr) => arr.length;

type FindIndex = <T>(arr: T[], x:T)=> number | null;
const findIndex: FindIndex = (arr, x) => {
    if (arr.includes(x)) {
        return arr.indexOf(x)
    }
    else {
        return null
    }
}


/**
 *   don't use any on param type
 * 
 * 1. in FindIndex, x's type maybe not one of types in arr
 * but it doesn't matter.
 * 
 * T automatically defines type for array including x 
 * 
 * const a = findIndex([true,1,"7"], null);
 * 
 * const findIndex: <string | number | boolean | null>(
 *      arr: (string | number | boolean | null)[],
 *      x: string | number | boolean | null) 
 *   => number | null
 * 
 * console.log(a)
 * 
 * 
 * 2. if the return type is mixture of two array
 * then just use type intersection
 * 
 * type Prepend = <T, V>(arr: T[], item: V) => (T | V)[];
 */