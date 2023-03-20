import { NumberItem } from "../components/sorting-page/sorting-page";
import { Direction } from "../types/direction";
import { ElementStates } from "../types/element-states";

export const swap = (arr: any[], firstIndex: number, secondIndex: number) => {
    const temp = arr[firstIndex];
    arr[firstIndex] = arr[secondIndex];
    arr[secondIndex] = temp;
    return arr;
}

export const reverseStringCounter = (string: string):number => {
    const arr = string.split('');
    let start = 0;
    let end = arr.length -1;
    let counter = 0;

      while (start < end) {
          swap(arr, start, end);
          start++;
          end--;
          counter++;
      }
      return counter;
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


export const selectionSort = (arr: Array<NumberItem> | [], direction: Direction) => {
    let last = arr.length - 1;
    for (let i = 0; i < last; i++) {
      let startInd = i;

      for (let j = i + 1; j < arr.length; j++) {

        if (direction === Direction.Ascending) {
          if (arr[startInd].value > arr[j].value) {
            startInd = j;
          }
        } else if (direction === Direction.Descending) {
          if (arr[startInd].value < arr[j].value) {
            startInd = j;
          }
        }
      }
      swap(arr, i, startInd);
    }
    return arr;
  }

  export const bubbleSort = (arr: Array<NumberItem> | [], direction: Direction) => {

    let last = arr.length - 1;
    let boofer = arr;

    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < last - i; j++) {

        (direction === Direction.Ascending && j === boofer.length - i - 2 && boofer[j].value > boofer[j + 1].value) 
        ? swap(boofer, j, j + 1) : boofer[j].color = ElementStates.Changing;
        (direction === Direction.Descending && j === boofer.length - i - 2 && boofer[j].value < boofer[j + 1].value) 
        ? swap(boofer, j, j + 1) : boofer[j].color = ElementStates.Changing;

        if(direction === Direction.Ascending) {
          if(boofer[j].value > boofer[j + 1].value) {
            swap(boofer, j, j + 1);
          }
        } else if (direction === Direction.Descending) {
          if(boofer[j].value < boofer[j + 1].value) {
            swap(boofer, j, j + 1);
          }
        }
      }
    }
    return arr
  }