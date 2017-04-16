'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDnd = require('react-dnd');

var _flow = require('lodash/flow');

var _flow2 = _interopRequireDefault(_flow);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ItemTypes = { TAG: 'tag' };

var tagSource = {
  beginDrag: function beginDrag(props) {
    return { id: props.tag.id };
  },
  canDrag: function canDrag(props) {
    return props.moveTag && !props.readOnly;
  }
};

var tagTarget = {
  hover: function hover(props, monitor) {
    var draggedId = monitor.getItem().id;
    if (draggedId !== props.id) {
      props.moveTag(draggedId, props.tag.id);
    }
  },
  canDrop: function canDrop(props) {
    return !props.readOnly;
  }
};

var dragSource = function dragSource(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
};

var dropCollect = function dropCollect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget()
  };
};

function RemoveComponent(props) {
  if (props.readOnly) {
    return _react2.default.createElement('span', null);
  }

  if (props.removeComponent) {
    var _Component = props.removeComponent;
    return _react2.default.createElement(_Component, props);
  }

  return _react2.default.createElement(
    'a',
    { onClick: props.onClick, className: props.className },
    String.fromCharCode(215)
  );
}

var Tag = function (_Component2) {
  _inherits(Tag, _Component2);

  function Tag() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Tag);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Tag.__proto__ || Object.getPrototypeOf(Tag)).call.apply(_ref, [this].concat(args))), _this), _this.render = function () {
      var _this2 = _this,
          props = _this2.props;

      var label = props.tag[props.labelField];
      var connectDragSource = props.connectDragSource,
          isDragging = props.isDragging,
          connectDropTarget = props.connectDropTarget,
          readOnly = props.readOnly,
          CustomRemoveComponent = props.CustomRemoveComponent;


      var tagComponent = _react2.default.createElement(
        'span',
        { style: { opacity: isDragging ? 0 : 1 }, className: props.classNames.tag },
        label,
        _react2.default.createElement(RemoveComponent, {
          className: props.classNames.remove,
          removeComponent: props.removeComponent,
          onClick: props.onDelete,
          readOnly: props.readOnly })
      );
      return connectDragSource(connectDropTarget(tagComponent));
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  return Tag;
}(_react.Component);

Tag.PropTypes = {
  labelField: _react2.default.PropTypes.string,
  onDelete: _react2.default.PropTypes.func.isRequired,
  tag: _react2.default.PropTypes.object.isRequired,
  moveTag: _react2.default.PropTypes.func,
  removeComponent: _react2.default.PropTypes.func,
  classNames: _react2.default.PropTypes.object,
  readOnly: _react2.default.PropTypes.bool,
  connectDragSource: _react2.default.PropTypes.func.isRequired,
  isDragging: _react2.default.PropTypes.bool.isRequired,
  connectDropTarget: _react2.default.PropTypes.func.isRequired
};

Tag.defaultProps = {
  labelField: 'text',
  readOnly: false
};

exports.default = (0, _flow2.default)((0, _reactDnd.DragSource)(ItemTypes.TAG, tagSource, dragSource), (0, _reactDnd.DropTarget)(ItemTypes.TAG, tagTarget, dropCollect))(Tag);