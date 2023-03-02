import { ElementStates } from "../types/element-states";

export const swap = (arr: any[], firstIndex: number, secondIndex: number) => {
    const temp = arr[firstIndex];
    arr[firstIndex] = arr[secondIndex];
    arr[secondIndex] = temp;
    return arr;
}

export const delay = (delay: number) => {
    return new Promise<ReturnType<typeof setTimeout>>((resolve) => {
        setTimeout(resolve, delay)
    })
}

export const fibonacci = (n: number) => {
    let arr: Array<number> = [];
    let a = 0;
    let b = 1; 
    let i = 0;
    while (i <= n) {
      a += b;
      b = a - b;
      arr.push(a);
      i++;
    }
    return arr
  }

export const randomArr = (min: number, max: number) => {
    const minArr = min;
    const maxArr = max;
    const arr = [];
    const len = Math.floor(Math.random() * (maxArr - minArr + 1)) + minArr;
    for (let i = 0; i < len; i++) {
        arr.push({value: Math.floor(Math.random()*100), color: ElementStates.Default})
    }
    return arr
}
