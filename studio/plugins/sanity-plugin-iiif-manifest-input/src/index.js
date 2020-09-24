import React from "react";
import PropTypes from "prop-types";
import FormField from "part:@sanity/components/formfields/default";
import Input from 'part:@sanity/components/textinputs/default'
import PatchEvent, { set, unset } from "part:@sanity/form-builder/patch-event";
import {IIIFManifest} from './IIIFManifest'
import styles from './styles.css'
// import Mirador from './Mirador'

export default class IIIFManifestInput extends React.Component {
  static propTypes = {
    type: PropTypes.shape({
      title: PropTypes.string
    }).isRequired,
    level: PropTypes.number,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired
  }

  focus() {
    this._inputElement.focus()
  }

  handleChange = event => {
    const inputValue = event.target.value
    const patch = inputValue === '' ? unset() : set(String(inputValue))
    this.props.onChange(PatchEvent.from(patch))
  }

  render() {
    const {type, value, level} = this.props
    const title = type.title

    return (
      <div>
        <FormField label={title} level={level} description={type.description}>
          <Input
            ref={element => this._inputElement = element}
            type="string"
            value={value === undefined ? '' : value}
            onChange={this.handleChange}
          />
        </FormField>
        {value && (
        <div className={styles.container}>
          <IIIFManifest manifest={value} />
        </div>)}
        {/* <Mirador config={value} /> */}
      </div>
    )
  }
}
