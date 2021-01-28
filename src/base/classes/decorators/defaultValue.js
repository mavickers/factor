export default function(value) {
    return function(target) {
        console.log(target,value);

        return target;
    }
}
