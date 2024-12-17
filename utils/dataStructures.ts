export class LinkedList<T> {
  private head: Node<T> | null = null;
  private tail: Node<T> | null = null;
  private length: number = 0;

  private class Node<T> {
    constructor(public value: T, public next: Node<T> | null = null) {}
  }

  insert(value: T): void {
    const newNode = new Node(value);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail!.next = newNode;
      this.tail = newNode;
    }
    this.length++;
  }

  delete(value: T): void {
    if (!this.head) return;

    if (this.head.value === value) {
      this.head = this.head.next;
      this.length--;
      if (this.length === 0) {
        this.tail = null;
      }
      return;
    }

    let current = this.head;
    while (current.next) {
      if (current.next.value === value) {
        current.next = current.next.next;
        this.length--;
        if (!current.next) {
          this.tail = current;
        }
        return;
      }
      current = current.next;
    }
  }

  toArray(): T[] {
    const result: T[] = [];
    let current = this.head;
    while (current) {
      result.push(current.value);
      current = current.next;
    }
    return result;
  }
}

