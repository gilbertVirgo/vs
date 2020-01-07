const getVerse = async (index) => {
    try {
        const res = await fetch(`/api/verse/${index}`);
        const verse = await res.text();

        return verse;
    } catch(ex) {
        console.error(ex);

        return ex;
    }
}

export {getVerse}