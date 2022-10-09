# Design Patterns
A small overview of design patterns and their application for reference.
Most of the well written examples are taken from Jeff Delaneys blog [fireship.io](https://fireship.io/lessons/design-patterns-javascript/).

Specifically the following patterns are covered:
| [Creational](#1-creational-patterns) | [Structural](#2-structural-patterns) | [Behavioral](#3-behavioral-patterns) |
| :--- | :--- | :--- |
| [Singleton](#11-singelton) | [Facade](#21-facade) | [Iterator](#31-iterator) |
| [Prototype](#12-prototype) | [Proxy](#22-proxy) | [Observer](#32-observer) |
| [Builder](#13-builder) |  | [Mediator](#33-mediator) |
| [Factory](#14-factory) |  | [State](#34-state) |

As this list does not cover all Software development patterns, some worth further looking into are:  
*Command, Strategy, Visitor, Adapter, Decorator, or Interpreter.*

Further information can be found in the [Design Patterns](https://en.wikipedia.org/wiki/Software_design_pattern) Wikipedia article,  
or in the [Gang of Four](https://en.wikipedia.org/wiki/Design_Patterns) book, refferenced by Jeff Delaney.

## **1. Creational Patterns**

Creational patterns are about trying to create objects in a manner suitable to the situation.  
The basic form of object creation could result in design problems or added complexity to the design.  
Creational design patterns solve this problem by somehow controlling this object creation.

### **1.1 Singelton**

The singleton pattern is used to restrict the instantiation of a class to one object.

#### **1.1.1 Singelton Typescript Examples**

In javasctipt and by extension typescript, references are passed globally by default. This means when playing to the strengths of the language, we can use the singleton pattern without any additional code.

```typescript 
// Singleton.ts
export class Singleton {
    private static instance: Singleton;
    private constructor() { }
    public static getInstance(): Singleton {
        if (!Singleton.instance) {
            Singleton.instance = new Singleton();
        }
        return Singleton.instance;
    }
}
```

However, this is just unneccessary boilerplate code. A "Singelton" could also be this:

```typescript
// Singleton.ts
export const Singleton = {
    name: "Singleton"
};
```

### **1.2 Prototype**

Prototype is just a fancy word for "clone". It serves when extending an object or creating a new object based on an existing one.

#### **1.2.1 Prototype Typescript Examples**

```typescript
// Prototype.ts
const zombie = {
    eatBrains(){
        console.log('yum 🧠');
    }
}

const chad = Object.create(zombie, {name: { value: 'Chad' },});

console.log(chad)       // {name: "Chad"}
console.log(chad.name); // Chad
chad.eatBrains();       // yum 🧠
```

### **1.3 Builder**

Builders let you construct complex objects step by step and prevent complex contrsuctors.
This allows you to produce different types and representations of an object using the same construction code.  

#### **1.3.1 Builder Typescript Examples**

```typescript
// Builder.ts
class HotDog {
    constructor(
        public bun: string,
        public Ketchup?: boolean,
        public mustard?: boolean,
        public pickles?: boolean,
    ) {}

    // These "building" methods could even be delegated to a different class
    addKetchup() {
        this.Ketchup = true;
        return this; // returns reference to the object instance
    }

    addMustard() {
        this.mustard = true;
        return this;
    }

    addPickles() {
        this.pickles = true;
        return this;
    }
}

// Creating custom object instance 
const lunch = new HotDog('brioche')
    .addKetchup()
    .addMustard()
    .addPickles();
```

### **1.4 Factory**

The factory pattern is used to create objects without specifying the exact class to create, which allows to circumvent the use of endless conditional logic.
Instead of using the "new" keywoard to create an object, there is a function to do it for you.

#### **1.4.1 Factory Typescript Examples**

```typescript
// Factory.ts
class HotDog {
    constructor(
        public bun: string,
        public Ketchup?: boolean,
        public mustard?: boolean,
        public pickles?: boolean,
    ) {}
}

class HotDogFactory {
    createHotDog(bun: string) {
        return new HotDog(bun);
    }
}

const factory = new HotDogFactory();
const lunch = factory.createHotDog('brioche');
```

## **2. Structural Patterns**

Structural patterns are about organizing different classes and objects to form larger structures and provide new functionality.

### **2.1 Facade**

The facade pattern is used to define a simplified interface to a more complex subsystem. 
Effectively, it hides the complexity of the system behind a simple interface or "facade".
Almost every library or package used in a project somewhat follows this.

#### **2.1.1 Facade Typescript Examples**

```typescript
// Facade.ts

// Complex subsystem
class ComplexElement {
    setWeirdParameter(v: number) {}
    whatDoesThisDO() {}
    WowIsThisComplicated() {}
}

class OtherComplexElement {
    setStrangeNumber(v: number) {}
    complicated() {}
    confusing() {}
}

// Facade
class Facade{
    private complexElement = new ComplexElement();
    private otherComplexElement = new OtherComplexElement();

    public doSomething() {
        this.complexElement.setWeirdParameter(1);
        this.otherComplexElement.setStrangeNumber(2);
        this.complexElement.whatDoesThisDO();
        this.otherComplexElement.complicated();
        this.complexElement.WowIsThisComplicated();
        this.otherComplexElement.confusing();
    }
}

// Simple usage
const facade = new Facade();
facade.doSomething();
```

### **2.2 Proxy**

Proxy is just a fancy word for "substitude" or "wrapper".  
It serves to provide a placeholder for another object to control access, reduce duplication memory cost, and reduce complexity.


#### **2.2.1 Proxy Typescript Examples**

```typescript
// Proxy.ts
const original = {name: 'Seb'};

const reactiveProxy  = new Proxy(original, {
    get(target, key) {
        console.log(`Tracking: "${prop}"`);
        return target[key];
    },
    set(target, key, value) {
        console.log('Updating...');
        target[key] = value;
        return Reflect.set(target, key, value);
    }
});

reactiveProxy.name; // logs: 'Tracking: name'
reactiveProxy.name = 'Sebastian'; // logs: 'Updating...'
```

## **3. Behavioral Patterns**

Behavioral patterns are about identifying common communication patterns between objects and realize these patterns.

### **3.1 Iterator**

The iterator pattern is used to provide a standard way to traverse a collection of items in an aggregate object,  
without the need to understand its underlying structure.
This is already very commonly implemented with "for" loops, which work *pull based*.

#### **3.1.1 Iterator Typescript Examples**
In javascript, custom iterators can be implemented by implementing the "next" keyword.
```typescript
// Iterator.ts
function range(start: number, end: number, step=1) {
    return {
        [Symbol.iterator]() {
            return this;
        },
        next() {
            if (start < end) {
                const value = start;
                start += step;
                return { value, done: false };
            }
            return { value: undefined, done: true };
        }
    }
}

for (const i of range(0, 10)) {
    console.log(i);
}
```

### **3.2 Observer**

The observer pattern is used to define a *one-to-many* dependency between objects so that when one object changes state,  
all its dependents are notified and updated automatically.

#### **3.2.1 Observer Typescript Examples**

```typescript
// Observer.ts
const news = new Subject();

const tv1 = news.subscribe((data) => console.log(`TV1: ${data}`));
const tv2 = news.subscribe((data) => console.log(`TV2: ${data}`));
const tv3 = news.subscribe((data) => console.log(`TV3: ${data}`));

news.next('Breaking news:');
news.next('We are all effd!');

tv2.unsubscribe();
```

### **3.3 Mediator**

The mediator pattern is used to reduce coupling between classes that communicate with each other,  
effectivly preventing *many-to-many* relationships.
You can imagine it as an "air traffic controller" between planes for your classes.

#### **3.3.1 Mediator Typescript Examples**

```typescript
// Mediator.ts
class Airplane{ // Class 1
    land(){}
}

class Runway{ // Class 2
    clear: boolean;
}

class Tower{ // Mediator
    clearFOrLanding(runway: Runway, airplane: Airplane){
        if(runway.clear){
            console.log('Tower: Cleared for landing');
        }
    }
}
```

### **3.4 State**

The state pattern is used to alter the behavior of an object as its internal state changes.
Its idea is based on finite state machines, and allows to attributer functionality based on changes within the object.
This prevents endless switch or conditional statements in your code and by that makes it more scaleable.

Most modern Applications use this pattern to manage the state of your application.

#### **3.4.1 State Typescript Examples**

```typescript
// State.ts
// Abstract State
interface State {
    think(): string;
}

// Concrete States implementing the same function with different behavior
class HappyState implements State {
    think() {
        return 'I am happy 😀';
    }
}

class SadState implements State {
    think() {
        return 'I am sad 😢';
    }
}

// Context
class Person {
    private state: State;

    constructor(state: State) {
        this.state = state;
    }

    think() {
        return this.state.think();
    }

    public changeState(state) {
        this.state = state;
    }
}
```

## References
 - [10 Design Patterns](https://www.youtube.com/watch?v=ZUJZzLkhwgU)
 - [The Gang of Four](https://en.wikipedia.org/wiki/Design_Patterns)
 - [Design Patterns](https://en.wikipedia.org/wiki/Design_Patterns)

