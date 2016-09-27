import React, {Component} from 'react';
import request from 'superagent';
import toml from 'toml';

export default class Table extends Component {

  languages = {};

  loadSyntax(languages) {
    languages.map(lang => {
      if(!Object.has(this.languages, lang)) {
        request.get(`/languages/${lang}.toml`)
          .end((err, res) => {
            if (err) {
              // this.handleError(err, res);
            } else {
              this.languages[lang] = toml.parse(res.text);
              this.forceUpdate();
            }
          });
      }
    });
  }

  componentDidMount() {
    this.loadSyntax(this.props.languages);
  }

  componentWillReceiveProps(nextProps) {
    this.loadSyntax(nextProps.languages);
  }

  render() {
    let loadedLanguages = this.props.languages
      .filter(lang => Object.has(this.languages, lang))
			.map(lang => this.languages[lang]);
    let constructs = [].union(...loadedLanguages.map(lang => Object.keys(lang).filter(key => Object.isObject(lang[key]))));
    return <table>
      <thead>
      <tr>
      <th></th>
      {loadedLanguages.map((lang, i) => <th key={i}><a href={lang.website} target="_blank">{lang.name}</a></th>)}
      </tr>
      </thead>
      <tbody>
      {constructs.map((construct, i) => <tr key={i}>
          <td>{construct}</td>
          {loadedLanguages.map((lang, j) => <td key={j}>
            {Object.has(lang, construct) ? <pre>{lang[construct].code}</pre> : null}
            </td>
          )}
        </tr>
      )}
      </tbody>
    </table>;
  }
}
