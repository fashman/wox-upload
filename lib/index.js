'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _upload = require('antd/lib/upload');

var _upload2 = _interopRequireDefault(_upload);

var _icon = require('antd/lib/icon');

var _icon2 = _interopRequireDefault(_icon);

var _message2 = require('antd/lib/message');

var _message3 = _interopRequireDefault(_message2);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require('antd/lib/upload/style/css');

require('antd/lib/icon/style/css');

require('antd/lib/message/style/css');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _base = require('app/util/base');

var _base2 = _interopRequireDefault(_base);

var _bind = require('classnames/bind');

var _bind2 = _interopRequireDefault(_bind);

var _styleMod = require('./style.mod.less');

var _styleMod2 = _interopRequireDefault(_styleMod);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// import PropTypes from 'prop-types';

var cx = _bind2.default.bind(_styleMod2.default);

var WoxUpload = function (_Component) {
  _inherits(WoxUpload, _Component);

  function WoxUpload(props) {
    _classCallCheck(this, WoxUpload);

    var _this = _possibleConstructorReturn(this, (WoxUpload.__proto__ || Object.getPrototypeOf(WoxUpload)).call(this, props));

    _this.handlePicChange = function (e) {
      var list = e.fileList.map(function (val) {
        var req = val.response;
        if (req) {
          if (req.rs === 1) val.url = val.response.data.url;else _message3.default.error(val.response.msg, 3);
        }
        return val;
      });

      if (e.file.status) {
        if (e.file.status === 'done') {
          list = list.filter(function (val) {
            return val.response ? val.response.rs === 1 : true;
          });
          if (e.file.response.rs === 1) {
            _this.triggerChange(list);
          }
        } else if (e.file.status === 'removed') {
          _this.triggerChange(list);
        }
        _this.setState({ fileList: list.length ? list.splice(-1) : [] });
      }
    };

    _this.beforeUpload = function (file) {
      var _this$props = _this.props,
          imgType = _this$props.imgType,
          imgSize = _this$props.imgSize;

      var defaultType = ['jpeg', 'png', 'jpg', 'gif'];
      var isJPG = (imgType || defaultType).find(function (val) {
        return file.type === 'image/' + val;
      });
      if (!isJPG) {
        _message3.default.error('You can only upload ' + (imgType || defaultType).join('/') + ' file!', 3);
        return false;
      }
      var isLt100KB = file.size / 1024 < (imgSize || 1024);
      if (!isLt100KB) {
        _message3.default.error('Image must smaller than ' + (imgSize || 1024) + 'KB!', 3);
        return false;
      }
      return isJPG && isLt100KB;
    };

    _this.triggerChange = function (changedValue) {
      var onChange = _this.props.onChange;
      if (onChange) {
        onChange(changedValue.length ? changedValue[changedValue.length - 1].url : '');
      }
    };

    var value = _this.props.value;
    _this.state = {
      fileList: value ? [{
        uid: -1,
        name: 'logo',
        status: 'done',
        url: value
      }] : []
    };
    return _this;
  }

  _createClass(WoxUpload, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if ('value' in nextProps) {
        var value = nextProps.value;
        this.setState({
          fileList: value ? [{
            uid: -1,
            name: 'logo',
            status: 'done',
            url: value
          }] : []
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var fileList = this.state.fileList;

      return _react2.default.createElement(
        _upload2.default,
        {
          action: this.props.action || _base2.default.img + '/wximg/dpp/upload',
          listType: 'picture-card',
          beforeUpload: this.beforeUpload,
          fileList: fileList,
          onChange: this.handlePicChange,
          className: fileList.length ? cx('wox-reset-upload') : cx('wox-upload')
        },
        fileList.length ? _react2.default.createElement(
          'span',
          { className: cx('reset-btn') },
          '\u91CD\u65B0\u4E0A\u4F20'
        ) : _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(_icon2.default, { type: 'plus' }),
          _react2.default.createElement(
            'div',
            { className: 'ant-upload-text' },
            'Upload'
          )
        )
      );
    }
  }]);

  return WoxUpload;
}(_react.Component);

// WoxUpload.propTypes = {
//   value: PropTypes.string,
// };

// WoxUpload.defaultProps = {
//   status: 'off',
// };

exports.default = WoxUpload;
