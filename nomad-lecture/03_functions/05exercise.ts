type Last = <T>(arr: T[]) => T;
const last = (arr) => arr[arr.length - 1];

type Prepend = <T, V>(arr: T[], item: V) => (T | V)[];
const prepend: Prepend = (arr, item) => [item, ...arr];

type Mix = <T, V>(arr1: T[], arr2: V[]) => (T | V)[];
const mix: Mix = (arr1, arr2) => [...arr1, ...arr2];

type Count = <T>(arr: T[]) => number;
const count: Count = (arr) => arr.length;

type FindIndex = <T>(arr: T[], x: T) => number | null;


const findIndex: FindIndex = (arr, x) => {
  if (arr.includes(x)) {
    return arr.indexOf(x);
  } else {
    return null;
  }
};

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
 * then just use type union type
 *
 * type Prepend = <T, V>(arr: T[], item: V) => (T | V)[];
 */

const last = <T>(arr: T[]): T | undefined => (arr.length === 0 ? undefined : arr[arr.length - 1]);

const prepend = <T,V>(arr: T[], item: V):(T|V)[] => [item, ...arr];

const mix = <T,V>(array1: T[], array2:V[]): (T|V)[] =>{
    const mergedArray = [...array1, ...array2];
    
    for (let i = 0; i < mergedArray.length ;i++){
        const randomIndex = Math.floor(Math.random() * mergedArray.length);
        [mergedArray[i], mergedArray[randomIndex]] = [mergedArray[randomIndex], mergedArray[i]];
        }
    
    return mergedArray;
}

const count = <T>(arr:T[]):number => arr.length;

const findindex = <T>(arr:T[], item:T): number | null =>{
    for (let i = 0; i< arr.length; i++){
        if (arr[i] === item){
            return i
        }
    }
    return null;
}

const slice = <T>(arr:T[], startIndex: number, endIndex = arr.length): T[] => {
    const result: T[] = [];
    for (let i = startIndex; i < endIndex; i++){
        result.push(arr[i])
    }
    return result;
}


