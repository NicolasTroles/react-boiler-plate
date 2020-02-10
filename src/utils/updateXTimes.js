
const sleep = ms => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

export default (x) => {
    for (let i = 0; i < x; i++) {
        await sleep(2000);
        this.forceUpdate();
    }
}