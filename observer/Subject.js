class Subject {
  constructor(name) {
    this.observers = [];
    this.name = name;
  }

  subscribe(observer) {
    this.observers.push(observer);
  }

  unsubscribe(observer) {
    this.observers.splice(this.observers.indexOf(observer), 1);
  }

  notifyAll(changeOfState) {
    this.observers.forEach((observer) => observer.notify(changeOfState));
  }
}

module.exports = Subject;
