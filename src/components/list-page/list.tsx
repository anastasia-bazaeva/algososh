export class ListNode<T> {
    value: T;
    next?: ListNode<T> | null;
    constructor(value: T, next?: ListNode<T> | null) {
        this.value = value;
        this.next = (next === undefined ? null : next);
    }
}

type ListClass<T> = {
    head: ListNode<T> | null | undefined;
    tail: ListNode<T> | null | undefined;
    lenght: number; 
    addToTail: (value: T) => void;
    addToHead: (value: T) => void;
    getArray: () => void;
    getSize: () => number;
    isEmpty: () => boolean;
    removeHead: () => void;
    clear: () => void;
    removeTail: () => void;
    addByPosition: (value: T, position: number) => void;
    getByPosition?: (position: number) => T;
}

export class LinkedList<T> implements ListClass<T> {
    head: ListNode<T> | null | undefined;
    tail: ListNode<T> | null | undefined;
    lenght: number;
    constructor(randArray: Array<T>) {
        this.head = null;
        this.tail = null;
        this.lenght = 0;
        if(randArray.length) {
            randArray.forEach(element => {
                this.addToTail(element)
            })
        }
    }

    addToTail = (value: T) => {
        let node = new ListNode(value);
        if(this.lenght === 0) {
            this.head = node;
        } else {
            let current = this.head;
            while (current?.next) {
                current = current.next;
            }
            current!.next = node;
        }
        this.lenght++
    }

    addToHead = (value: T) => {
        let node = new ListNode(value);
        if(this.lenght === 0) {
            this.tail = node;
        } else {
            node.next = this.head;
        }
        this.head = node;
        this.lenght++
    }

    removeHead = () => {
        if (!this.head) {
            throw new Error('Нечего удалять')
        }
        if(this.lenght === 1) {
            this.clear();
        } else {
            const current = this.head;
            const nextHead = current.next;
            this.head = nextHead;
            this.lenght--
        }
    }

    clear = () => {
        this.head = null;
        this.tail = null;
        this.lenght = 0;
    }

    removeTail = () => {
        if (!this.lenght) {
            throw new Error('Нечего удалять')
        }
        if(this.lenght === 1) {
            this.clear();
        } else {
            let current = this.head;
            let nextTail = null;
            while(current) {
                if(current.next) {
                    nextTail = current
                }
                current = current.next
            }
            this.tail = nextTail;
            this.tail!.next = null;
            this.lenght--
        }
    }

    // getByPosition = (position: number) => {
    //     if(position < 0 || position > this.lenght) {
    //         throw new Error("Некорректный индекс")
    //     }
    //     let current = this.head;
    //     let index = 0;

    //     while (index < position) {
    //         current = current?.next;
    //         index++;
    //     }
    //     return current!.value;
    // }

    addByPosition = (value: T, position: number) => {
        if(position < 0 || position > this.lenght) {
            throw new Error("Некорректный индекс")
        }
        let node = new ListNode(value);
        if (position === 0) {
            node.next = this.head;
            this.head = node;
        } else {
            let current = this.head;
            let prev = null;
            let index = 0;
            while(index < position) {
                prev = current;
                current = current?.next;
                index++
            }
            prev!.next = node;
            node.next = current;
        }
        this.lenght++
    }

    removeByPosition = (position: number) => {
        if(position < 0 || position > this.lenght) {
            throw new Error("Некорректный индекс")
        }
        let current = this.head;
        if(position === 0) {
            this.head = current?.next;
        } else {
            let prev = null;
            let index = 0;
            while(index < position) {
                prev = current;
                current = current?.next;
                index++
            }
            prev!.next = current?.next;
        }
        this.lenght--
    }

    getArray = () => {
        const arr = [];
        let node = this.head;
        while(node) {
            arr.push(node.value);
            node = node.next;
        }
        return arr
    }
    getSize = () => this.lenght;
    isEmpty = () => this.getSize() > 0 ? false : true;
}