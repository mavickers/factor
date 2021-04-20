const isNil = (obj) => !isNotNil(obj);
const isNotNil = (obj) => obj !== null && obj !== undefined;

export { isNil, isNotNil };
export default { isNil, isNotNil };
