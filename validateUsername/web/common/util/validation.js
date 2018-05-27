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
}

Validation.prototype.addByDom = function (dom, name, rules) {
    let funcArr = [];

    rules.forEach(function (item, index) {
        funcArr.push(function () {
            let strategyArr = item.strategy.split(':'),
                strategy    = strategyArr.shift();

            strategyArr.push(item.errorMsg);
            strategyArr.unshift(dom.value);

            return validation[strategy].apply(null, strategyArr);
        });
    });

    this.validateQueue[name] = funcArr;
};

Validation.prototype.validate = function (name) {
    this.validateQueue[name].forEach(function (fn) {
        let msg = fn();

        if (msg) {
            return msg;
        }
    });
};