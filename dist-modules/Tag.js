'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var ReactDND = require('react-dnd');
var React = require('react');

var ItemTypes = { TAG: 'tag' };

var styles = {
    tag: {
        border: '1px solid #ddd',
        background: '#eee',
        fontSize: 12,
        display: 'inline-block',
        padding: 5,
        margin: '0 5px',
        cursor: 'move',
        borderRadius: 2
    },
    remove: {
        color: '#aaa',
        marginLeft: 5,
        cursor: 'pointer'
    }
};

var Tag = React.createClass({
    displayName: 'Tag',

    mixins: [ReactDND.DragDropMixin],
    propTypes: {
        onDelete: React.PropTypes.func.isRequired,
        tag: React.PropTypes.object.isRequired,
        moveCard: React.PropTypes.func.isRequired
    },
    statics: {
        configureDragDrop: function configureDragDrop(register) {
            register(ItemTypes.TAG, {
                dragSource: {
                    beginDrag: function beginDrag(component) {
                        return {
                            item: {
                                id: component.props.tag.id
                            }
                        };
                    }
                },
                dropTarget: {
                    over: function over(component, item) {
                        component.props.moveTag(item.id, component.props.tag.id);
                    }
                }
            });
        }
    },
    render: function render() {
        return React.createElement(
            'span',
            _extends({ className: 'ReactTags__tag'
            }, this.dragSourceFor(ItemTypes.TAG), this.dropTargetFor(ItemTypes.TAG), {
                style: styles.tag }),
            this.props.tag.text,
            React.createElement(
                'a',
                { className: 'ReactTags__remove',
                    style: styles.remove,
                    onClick: this.props.onDelete },
                'x'
            )
        );
    }
});

module.exports = Tag;