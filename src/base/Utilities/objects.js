const copyAndSeal = (obj) => Object.seal(JSON.parse(JSON.stringify(obj)));

export { copyAndSeal };
export default { copyAndSeal };
