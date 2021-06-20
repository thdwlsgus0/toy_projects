const Subject = require("./Subject.js");

const observer1 = {
  notify: (change) => console.log(`Set ${change} Button Clicked`),
};
const observer2 = {
  notify: (change) => console.log(`Increment ${change} Number`),
};
const observer3 = {
  notify: (change) => console.log(`Increment Total ${change} Number`),
};

const subject = new Subject("Like-Button");

subject.subscribe(observer1);
subject.subscribe(observer2);
subject.subscribe(observer3);

subject.notifyAll("Like");

subject.unsubscribe(observer2);

subject.notifyAll("Like2");
