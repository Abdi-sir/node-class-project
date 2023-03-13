const { query } = require("express");

function bruteforce_string(query,search) {
    var M = query.length();
    var N = text.length;
    for (var i = 0; i < N - M; i++) {
        var j =0;
        while (j < M) {
            if (text.charAt(i + j) != pattern.charAt(j)) {break;}
        }
        if (j == M) {return i;}
    }
    return -1;
}
return (query,user);
