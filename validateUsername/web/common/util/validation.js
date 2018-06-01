// validation
const validation = {
    isEmpty  : function (value, errorMsg) {
        if (value === '') {
            return errorMsg;
        }
    },
    hasSpace : function (value, errorMsg) {
        if (/\s/g.test(value)) {
            return errorMsg;
        }
    },
    minLength: function (value, length, errorMsg) {
        if (value.length < length) {
            return errorMsg;
        }
    }
};

function Validation() {
    this.validateQueue = {};
    this.usernameCache = '';
    this.onOff = false;
}

Validation.prototype.addByDom = function (name, rules) {
    let funcArr = [];

    rules.forEach(function (item) {
        funcArr.push(function (dom) {
            let strategyArr = item.strategy.split(':'),
                strategy    = strategyArr.shift();

            strategyArr.push(item.errorMsg);
            strategyArr.unshift(dom.value);

            return validation[strategy].apply(null, strategyArr);
        });
    });

    this.validateQueue[name] = funcArr;
};

Validation.prototype.validate = function (dom, name) {
    let fmQueue = this.validateQueue[name];
    let len = this.validateQueue[name].length;
    let msg = '';
    for (let i = 0; i < len; i++) {
        msg = fmQueue[i](dom);
        if (msg) {
            break;
        }
    }
    return msg;
};