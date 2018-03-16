'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var PropTypes = _interopDefault(require('prop-types'));

var getDigitsFromValue = function getDigitsFromValue() {
  var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return value.replace(/(-(?!\d))|[^0-9|-]/g, '') || '';
};

var padDigits = function padDigits(digits) {
  var desiredLength = 3;
  var actualLength = digits.length;

  if (actualLength >= desiredLength) {
    return digits;
  }

  var amountToAdd = desiredLength - actualLength;
  var padding = '0'.repeat(amountToAdd);

  return padding + digits;
};

var removeLeadingZeros = function removeLeadingZeros(number) {
  return number.replace(/^0+([0-9]+)/, '$1');
};

var addDecimalToNumber = function addDecimalToNumber(number) {
  var centsStartingPosition = number.length - 2;

  var cents = number.substring(centsStartingPosition);
  var dollars = removeLeadingZeros(number.substring(0, centsStartingPosition));

  return dollars + ',' + cents;
};

var handleThousands = function handleThousands(number) {
  var dollarsStartingPosition = number.length - 6;

  var dollars = number.substring(dollarsStartingPosition);
  var thousands = removeLeadingZeros(number.substring(0, dollarsStartingPosition));

  return thousands + '.' + dollars;
};

var handleMillions = function handleMillions(number) {
  var thousandsStartingPosition = number.length - 10;

  var thousands = number.substring(thousandsStartingPosition);
  var millions = removeLeadingZeros(number.substring(0, thousandsStartingPosition));

  return millions + '.' + thousands;
};

var toCurrency = function toCurrency(value) {
  var digits = getDigitsFromValue(value);
  var digitsWithPadding = padDigits(digits);
  var realNumber = removeLeadingZeros(digitsWithPadding);

  if (realNumber.length <= 5) {
    return addDecimalToNumber(digitsWithPadding);
  } else {
    if (realNumber.length > 5 && realNumber.length <= 8) {
      var numberWithDecimals = addDecimalToNumber(digitsWithPadding);
      return handleThousands(numberWithDecimals);
    } else {
      var _numberWithDecimals = addDecimalToNumber(digitsWithPadding);
      var thousandsWithDecimals = handleThousands(_numberWithDecimals);
      return handleMillions(thousandsWithDecimals);
    }
  }
};

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();







var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};



var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};









var objectWithoutProperties = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var CurrencyInput = function (_Component) {
  inherits(CurrencyInput, _Component);

  function CurrencyInput() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, CurrencyInput);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = CurrencyInput.__proto__ || Object.getPrototypeOf(CurrencyInput)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      value: _this.props.defaultValue || ''
    }, _this.handleChange = function (event) {
      var onChange = _this.props.onChange;

      var valueAsCurrency = toCurrency(event.target.value);

      _this.setState({ value: valueAsCurrency });

      if (onChange) {
        event.persist();
        onChange(event, valueAsCurrency);
      }
    }, _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(CurrencyInput, [{
    key: 'render',
    value: function render() {
      var handleChange = this.handleChange,
          _props = this.props,
          defaultValue = _props.defaultValue,
          safeProps = objectWithoutProperties(_props, ['defaultValue']),
          value = this.value;


      return React__default.createElement('input', _extends({
        type: 'number',
        pattern: '\\d*'
      }, safeProps, {
        value: value,
        onChange: handleChange
      }));
    }
  }, {
    key: 'value',
    get: function get$$1() {
      return this.props.value || this.state.value;
    }
  }]);
  return CurrencyInput;
}(React.Component);

CurrencyInput.propTypes = {
  onChange: PropTypes.func,
  defaultValue: PropTypes.string,
  value: PropTypes.string
};

module.exports = CurrencyInput;
