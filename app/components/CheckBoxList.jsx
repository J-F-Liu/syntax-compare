import React, {Component, PropTypes} from 'react';

export default class CheckBoxList extends Component {
  static propTypes = {
    name: PropTypes.string,
    options: PropTypes.array,
    values: PropTypes.array,
    onChange: PropTypes.func
  };

  createOptionDict(values) {
    return this.props.options.reduce((dict, option) => {
      let [label, value] = typeof(option) == 'string' ? [option, option] : [option.text, option.value || option.text];
      let checked = values.indexOf(value) > -1;
      dict[value] = {label, value, checked};
      return dict;
    }, {});
  }

  state = {options: this.createOptionDict(this.props.values)};

  checkChange = (event) => {
    this.state.options[event.target.value].checked = event.target.checked;
    this.forceUpdate();
    this.props.onChange && this.props.onChange(this.getCheckedValues());
  };

  getCheckedValues = () => {
    return Object.keys(this.state.options).filter(value => this.state.options[value].checked);
  };

  componentWillReceiveProps(nextProps) {
    // this.setState({options: this.createValueDict(nextProps.values)});
  }

  render() {
    return <ul style={{listStyleType: 'none', display: 'inline-block', margin: 0, padding: 0}}>
      {Object.values(this.state.options).map((option,i) =>
      <li key={i} style={{float: 'left', marginLeft: '10px'}}>
        <label style={{cursor: 'pointer'}}>
          <input type="checkbox" name={this.props.name} value={option.value} checked={option.checked} onChange={this.checkChange} />
          {option.label}
        </label>
      </li>
      )}
    </ul>;
  }
}
