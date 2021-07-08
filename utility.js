function randomIdGenerator(length = 6) {
    const set = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let id = [];
    for (let i = 0 ; i < length; i ++) {
        id.push(set[Math.floor(Math.random() * set.length)]);
    }
    return id.join("");
}

export {randomIdGenerator};
