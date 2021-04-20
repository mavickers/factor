const newUuid = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);

        return v.toString(16);
    });
}

const newUuidShort = () => {
    return newUuid().split("-").slice(-1)[0];
}

export { newUuid, newUuidShort };
export default { newUuid, newUuidShort };
