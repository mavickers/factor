describe("Scratch Tests", () => {
   it("is testing classes", () => {
       class ClassA {
           static test(obj) {
               console.log(obj);
           }
       }

       class ClassB {
           testA() {
               ClassA.test(this.testB());
           }
           testB() {
               return "123";
           }
       }

       const classB = new ClassB();

       classB.testA();

       expect(1).toEqual(1);
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
