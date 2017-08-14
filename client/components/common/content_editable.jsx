let findDOMNode = !!window.ReactDOM ? ReactDOM.findDOMNode : React.findDOMNode;

ContentEditable = React.createClass({

  propTypes: {
    onChange: React.PropTypes.func,
    onFocus: React.PropTypes.func,
    onBlur: React.PropTypes.func,
    html: React.PropTypes.string,
  },

  mixins: [],

  getDefaultProps() {
    return {
      html: '',
      onFocus: () => {},
      onBlur: () => {},
    };
  },

  getInitialState() {
    return {};
  },

  componentDidMount() {
    findDOMNode(this).addEventListener('keypress', this._handleEnterKey, false);
  },

  shouldComponentUpdate(nextProps) {
    return !this._dirty && nextProps.html !== findDOMNode(this).innerHTML;
  },

  componentDidUpdate() {
    if (this.props.html !== findDOMNode(this).innerHTML) {
      findDOMNode(this).innerHTML = this.props.html;
      this._dirty = false;
    }
  },

  componentWillUnmount() {
    findDOMNode(this).removeEventListener('keypress', this._handleEnterKey);
  },

  render() {
    let { onChange, onFocus, onBlur, html, ...other} = this.props;
    return (
      <div
        className="content-editable"
        onInput={this._handleChange}
        onFocus={this._handleFocus}
        onBlur={this._handleBlur}
        contentEditable="true"
        dangerouslySetInnerHTML={{__html: html}}
        {...other}>
      </div>
    );
  },

  _handleEnterKey(ev) {
    if (ev.keyCode === 13) {
      document.execCommand('formatBlock', false, 'p');
    }
  },

  _handleChange() {
    const html = findDOMNode(this).innerHTML;
    if (this.props.onChange && html !== this._lastHtml) {
      this.props.onChange(html);
      this._dirty = true;
    }
    this._lastHtml = html;
  },

  _handleFocus() {
    this.props.onFocus();
  },

  _handleBlur() {
    this._handleChange();
    this.props.onBlur();
  },
});
