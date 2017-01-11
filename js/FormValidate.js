var formValidate = {
    isNonEmpty: function (val, errorMsg) {
        if(val === '') {
            return errorMsg;
        }
    },
    minLength: function (val, length, errorMsg) {
        if(val.length < length) {
            return errorMsg;
        }
    },
    isMobile: function (val, errorMsg) {
        if(!/(^1[3|5|8][0-9]{9}$)/.test(val)) {
            return errorMsg;
        }
    }
};
