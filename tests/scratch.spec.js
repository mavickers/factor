import Utilities from "../src/base/Utilities";

describe("Scratch Tests", () => {
   it("is testing classes", () => {
       class ClassA { methodA() { } }
       class ClassB extends ClassA { methodB() { } }
       class ClassC extends ClassB { methodC() { } }

       const modelC = new ClassC();

       console.log(Utilities.getClassInheritance(modelC));


       // const classes = [ ];
       // let prototype = Utilities.isClass(modelC) ? Object.getPrototypeOf(modelC) : Utilities.getClass(modelC);
       //
       // const step1 = Utilities.getClass(modelC);
       // console.log(step1, step1 instanceof Function, Utilities.isClass(step1));
       // const step2 = Object.getPrototypeOf(ClassC);
       // // step2 is instanceof Function
       // console.log(step2, step2 instanceof Function, Utilities.isClass(step2));
       // const step3 = Object.getPrototypeOf(step2);
       // console.log(step3, step3 instanceof Function, Utilities.isClass(step3));
       // const step4 = Object.getPrototypeOf(step3);
       // console.log(step4, step4 instanceof Function, Utilities.isClass(step4));
       //
       // console.log(prototype, prototype instanceof Function, Utilities.isClass(prototype));
       // // console.log(Utilities.isClass(modelC));
       //
       //
       // while (Utilities.isClass(prototype)) {
       //     classes.push(prototype);
       //
       //     prototype = Object.getPrototypeOf(prototype);
       // }
       //
       //
       // console.log(classes);
       // console.log(classes[0] === ClassC);
   });

   it("scratch", () => {
       function limiter(n) {
           if (n === 6) return 3;
           else return 3 * limiter(n + 1)
       }

       console.log(limiter(5));
       console.log(limiter(3));
   })
});
