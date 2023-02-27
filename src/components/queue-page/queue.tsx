import { ElementStates } from "../../types/element-states";

interface IQueue<T> {
    enqueue: (item: T) => void;
    dequeue: () => void;
    peak: () => T | null;
    getArray: () => Array<T> | null;
    isEmpty: () => boolean;
    clear: () => void;
  }

export class Queue<T> implements IQueue<T> {
    size: number;
    container: Array<T>;
    head: number;
    tail: number;
    length: number;
    constructor(size: number) {
        this.container = Array(size);
        this.size = size;
        this.head = 0;
        this.tail = 0;
        this.length = 0;
      }

      isEmpty = () => this.length === 0;

      getArray = () => this.container;

      enqueue = (item: T) => {
        if(this.length >= this.size) {
            throw new Error('Слишком много элементов');
        }
        this.container[this.tail % this.size] = item;
        this.tail++
        this.length++
      };

      dequeue = () => {
        if(this.isEmpty()) {
            throw new Error('Нечего удалять');
        }
        if (this.length < this.size) {
          delete this.container[this.head % this.size];
          this.head++;
          this.length--
        }
      };

      peak = () => {
        if(this.isEmpty()) {
            throw new Error('Нет элементов в очереди');
        }
        return this.length > 0 ? this.container[this.head % this.size] : null;
      };

      clear = () => {
        if(this.isEmpty()) {
          throw new Error('Нет элементов в очереди');
        }
        this.container = Array<T>(this.size)
        this.head = 0;
        this.tail = 0;
        this.length = 0;
      }

}