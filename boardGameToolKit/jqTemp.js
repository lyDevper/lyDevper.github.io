function jqTemp(jqNode, props={}) {
    var nodeHTML = jqNode.html();
    for (let prop in props) {
        nodeHTML = nodeHTML.replace(new RegExp("{" + prop + "}", "g"), props[prop]);
    }
    return $(nodeHTML);
}

function htmlTemp(node, props={}) {
    var nodeHTML = $(node).html();
    for (let prop in props) {
        nodeHTML = nodeHTML.replace(new RegExp("{" + prop + "}", "g"), props[prop]);
    }
    return nodeHTML;
}