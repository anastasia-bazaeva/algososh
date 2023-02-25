interface IStack<T> {
    push: (item: T) => void;
    pop: () => void;
    peak: () => T | null;
    getSize: () => number;
    clear: () => void;
  }

  export class Stack<T> implements IStack<T> {
    private container: T[] = [];
    private maxSize = 13;
  
    push = (item: T): void => {
      if (this.getSize() <= this.maxSize) {
        this.container.push(item)
      } else {
        throw new Error('Слишком много элементов')
      }
    };
  
    pop = (): void => {
      this.container.pop()
    };
  
    peak = (): T | null => {
      if (this.getSize() > 0) {
        return this.container[this.getSize()-1];
      }
      return null;
    };
  
    getSize = () => this.container.length;

    getArray = () => this.container;

    clear = () => {
        this.container = []
    }
  }