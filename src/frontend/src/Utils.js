export const convertBytes = (bytes) => {
    if(bytes.toString().length <= 6) {
        return [(bytes/1000).toFixed(1), " kb"];    
    } 
    else if(bytes.toString().length > 6) {
        return [(bytes/1000000).toFixed(1), " mb"];
    }
}

export const getTotalSize = (files) => {
    let totalSize = 0;
    files.forEach(file => {
        let mb = file.size/1000000;
        totalSize += mb;
    })
    return totalSize.toFixed(2);
}