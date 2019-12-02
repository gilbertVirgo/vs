// Man this is so dumb! Need to build a quick API for this
export const getPerc = () => {
    const now = new Date();
    const first = (new Date(now.getFullYear(), 0, 1, 0, 0, 0, 0)).getTime();
    const last = (new Date(now.getFullYear(), 11, 31, 23, 59, 59, 999)).getTime();
    const length = last - first;

    return Math.floor(((now.getTime() - first) / length) * 100);
}

export const getData = async (index) => {
    const verses = [ "Genesis 1:1", "John 1:1", "John 1:14", "John 3:16", "Romans 3:23", "Romans 6:23", "Romans 5:8", "Romans 10:9", "Romans 10:10", "2 Timothy 3:16", "Joshua 1:8", "Psalm 119:11", "Deuteronomy 6:6", "Deuteronomy 6:7", "Hebrews 4:12", "Hebrews 4:16", "1 John 5:14", "1 John 5:15", "1 John 5:11", "1 John 5:12", "John 14:1", "John 14:2", "John 14:3", "John 14:6", "John 14:27", "Isaiah 26:3", "Isaiah 53:5", "Isaiah 53:6", "1 Peter 1:3", "Psalm 100:4", "Psalm 100:5", "Revelation 4:11", "Matthew 6:33", "Romans 8:28", "Jeremiah 29:11", "1 John 1:7", "1 John 1:9", "Proverbs 3:5", "Proverbs 3:6", "1 Corinthians 10:13", "Psalm 55:22", "1 Peter 5:7", "2 Chronicles 7:14", "Romans 12:1", "Romans 12:2", "Romans 12:11", "Romans 12:12", "Romans 12:18", "2 Corinthians 9:7", "Hebrews 10: 25", "Proverbs 1:7", "Proverbs 15:1", "Ephesians 5:18", "Ephesians 5:19", "Ephesians 5:20", "Ephesians 5:21", "Galatians 5:22", "Galatians 5:23", "Psalm 118:24", "Philippians 4:4", "Philippians 4:5", "Philippians 4:6", "Philippians 4:7", "James 1:2", "James 1:3", "James 1:4", "James 1:5", "1 Thessalonians 5:16", "1 Thessalonians 5:17", "1 Thessalonians 5:18", "Ephesians 2:8", "Ephesians 2:9", "Ephesians 2:10", "Galatians 2:20", "Colossians 3:15", "Colossians 3:16", "Colossians 3:17", "Romans 1:16", "Romans 1:17", "Psalm 56:3", "Psalm 4:8", "Hebrews 11:6", "Matthew 28:18", "Matthew 28:19", "Matthew 28:20", "Acts 1:8", "Psalm 23:1", "Psalm 23:2", "Psalm 23:3", "Psalm 23:4", "Psalm 23:5", "Psalm 23:6", "Isaiah 9:6", "Luke 2:10", "Luke 2:11", "Luke 2:12", "Acts 1:11", "Revelation 21:1", "Revelation 21:2", "Revelation 22:20" ]
    const verse = verses[index].replace(/ /g, "+");

    const params = new URLSearchParams();

    params.append("q", verse);
    params.append("include-passage-references", "false");
    params.append("include-verse-numbers", "false");
    params.append("include-first-verse-numbers", "false");
    params.append("include-footnotes", "false");
    params.append("include-footnote-body", "false");
    params.append("include-headings", "false");
    params.append("include-short-copyright", "false");

    try {
        const req = await fetch(
            `https://api.esv.org/v3/passage/text/?${params.toString()}`, {
                headers: {
                    "Authorization": "Token " + process.env.REACT_APP_BIBLE_API_KEY
                }
            });
        const {passages, query} = await req.json();

        return {passages, query};
    } catch(error) {
        console.error(error);

        return {error};
    }
}