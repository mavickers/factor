export default function(target) {
    target.descriptor.writable = false;

    return target;
}
