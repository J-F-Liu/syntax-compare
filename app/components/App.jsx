import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import CheckBoxList from './CheckBoxList';
import Table from './Table';

export default class App extends Component {
  static languages = [
    {text: "C#", value: 'CSharp'},
    "Python",
    "Ruby",
    "Rust",
    "Kotlin",
  ];

  state = {languages: ['CSharp', 'Rust']};

  languageChecked = (selectedLanguages) => {
    browserHistory.push('/?languages='+selectedLanguages.join(','));
  };

  getSelectedLanguages(props) {
    let languages = props.location.query.languages.split(',').compact(true);
    this.setState({languages});
  }

  componentDidMount() {
    this.getSelectedLanguages(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.getSelectedLanguages(nextProps);
  }

  render() {
    return (
      <div>
        <h1>Syntax Comparison of Programming Languages</h1>
        <div style={{textAlign: 'center'}}>
          <div>
            <label style={{verticalAlign: 'top'}}>Choose Languages:</label>
            <CheckBoxList name="lang" options={App.languages} values={this.state.languages} onChange={this.languageChecked} />
          </div>
          <Table languages={this.state.languages} />
        </div>
      </div>
    );
  }
}
