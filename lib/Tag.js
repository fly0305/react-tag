var ReactDND = require('react-dnd');
var React = require('react');

const ItemTypes = { TAG: 'tag' };

var styles = {
    tag: {
        border: "1px solid #ddd",
        background: "#eee",
        fontSize: 12,
        display: "inline-block",
        padding: 5,
        margin: "0 5px",
        cursor: "move",
        borderRadius: 2
    },
    remove: {
        color: "#aaa",
        marginLeft: 5,
        cursor: "pointer"
    }
}

var Tag = React.createClass({
    mixins: [ReactDND.DragDropMixin],
    propTypes: {
        labelField: React.PropTypes.string,
        onDelete: React.PropTypes.func.isRequired,
        tag: React.PropTypes.object.isRequired,
        moveTag: React.PropTypes.func.isRequired
    },
    getDefaultProps: function() {
        return {
            labelField: 'text'
        };
    },
    statics: {
        configureDragDrop: function(register) {
            register(ItemTypes.TAG, {
                dragSource: {
                    beginDrag: function(component) {
                        return {
                            item: {
                                id: component.props.tag.id
                            }
                        }
                    }
                },
                dropTarget: {
                    over(component, item) {
                        component.props.moveTag(item.id, component.props.tag.id);
                    }
                }
            });
        }
    },
    render: function(){
        var label = this.props.tag[this.props.labelField];
        return (
            <span className="ReactTags__tag"
                      {...this.dragSourceFor(ItemTypes.TAG)}
                      {...this.dropTargetFor(ItemTypes.TAG)}
                      style={styles.tag}>{label}
                <a className="ReactTags__remove" 
                       style={styles.remove}
                       onClick={this.props.onDelete}>x</a>
            </span>
        )
    }
});

module.exports = Tag;
