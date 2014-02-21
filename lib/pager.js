module.exports = function (arr, page, size) {

    "use strict";

    var pageSize = size || 5,
        offset = (page - 1) * pageSize,
        end = offset + pageSize,
        pageCount = Math.ceil(arr.length / pageSize);

    return {
        content: arr.slice(offset, end),
        count: arr.length,
        pages: pageCount,
        page: page
    };
};
