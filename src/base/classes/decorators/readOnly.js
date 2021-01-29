/*
 *  readOnly.js
 *  Restricts a field so that its value cannot be changed.
 *
 *  NOTE THIS IS A STAGE 1 DECORATOR, DOES NOT CONFORM TO STAGE 2
 *  reason: https://github.com/babel/babel/issues/12654
 *  spec: https://github.com/tc39/proposal-decorators
 *  implementation: https://babeljs.io/docs/en/babel-plugin-proposal-decorators
 *
 */

export default function(target, name, descriptor) {
    descriptor.writable = false;

    return target;
}
