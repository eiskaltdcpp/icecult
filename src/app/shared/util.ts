export function hashCode(source: String): Number {
    let hash = 0;
    if (source.length === 0) {
      return hash;
    }
    for (let i = 0; i < source.length; i++) {
        let char = source.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;  // tslint:disable-line
        hash = hash & hash;                  // tslint:disable-line
    }
    return hash;
}
