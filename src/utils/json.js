


export function pretifyJson(json, pretify=true) {
    if (typeof json !== 'string') {
        if(pretify){
            json = JSON.stringify(json, undefined, 4);
        }else{
            json = JSON.stringify(json);
        }
    }
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
        function (match) {
            let cls = "<span>";
            if (/^"/.test(match)) {
                if (/:$/.test(match)) {
                    cls = "<span class='key'>";
                } else {
                    cls = "<span class='string'>";
                }
            } else if (/true|false/.test(match)) {
                cls = "<span class='boolean'>";
            } else if (/null/.test(match)) {
                cls = "<span class='null'>";
            }
            return cls + match + "</span>";
        }
    );
}