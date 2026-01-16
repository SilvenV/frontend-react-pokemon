function previousPage(offset) {
    if (offset >= 20) {
        return (offset - 20);
    }
    console.log(offset);
}

export default previousPage