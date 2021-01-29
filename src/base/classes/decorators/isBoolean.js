import FieldDescriptor from "../FieldDescriptor";

export default (target, name, descriptor) => {
    if (descriptor.configuration && descriptor.configuration.type) return descriptor;

    const newDescriptor = new FieldDescriptor(descriptor);
    let fieldValue = newDescriptor.value || false;

    delete newDescriptor.value;
    delete newDescriptor.writable;

    newDescriptor.get = () => fieldValue || false;
    newDescriptor.set = (value) => fieldValue = value;

    return newDescriptor;
}
