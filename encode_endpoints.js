const k = [11, 45, 99, 12, 55, 87, 21, 66];
function encode(str) {
    let p = [];
    for(let i=0; i<str.length; i++) {
        p.push(str.charCodeAt(i) ^ k[i % k.length]);
    }
    return p.join('.');
}

const endpoints = [
    "/api/convert/gif-to-mp4",
    "/api/convert/mp4-to-gif",
    "/api/convert/pdf-to-excel",
    "/api/convert/pdf-to-powerpoint",
    "/api/convert/pdf-to-word",
    "/api/unlock/pdf",
    "/api/convert/word-to-pdf"
];

for(const e of endpoints) {
    console.log(`${e} -> ${encode(e)}`);
}
