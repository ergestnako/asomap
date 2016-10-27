import { expect } from 'chai';
import { shallow } from 'enzyme';
import React from 'react';
import ReactSelect from 'react-select';
import simple from 'simple-mock';

import Select from './Select';

function getWrapper(props) {
  const defaults = {
    onChange: () => null,
    options: [],
    value: [],
  };
  return shallow(<Select {...defaults} {...props} />);
}

describe('screens/sidebar/Select', () => {
  it('renders ReactSelect with correct props', () => {
    const options = [{ label: 'A', value: 'a' }];
    const value = ['a'];
    const select = getWrapper({ options, value }).find(ReactSelect);
    expect(select.prop('options')).to.equal(options);
    expect(select.prop('value')).to.equal(value);
  });

  it('renders a select with correct props', () => {
    const options = [{ label: 'A', value: 'a' }];
    const value = ['a'];
    const select = getWrapper({ options, value }).find('select');
    expect(select.prop('value')).to.equal(value);
    const optionElements = select.find('option');
    expect(optionElements).to.have.length(1);
    expect(optionElements.at(0).prop('value')).to.equal('a');
    expect(optionElements.at(0).text()).to.equal('A');
  });

  describe('handleChange', () => {
    it('given array, calls props.onChange', () => {
      const onChange = simple.mock();
      const instance = getWrapper({ onChange }).instance();
      instance.handleChange([{ label: 'Foo', value: 'bar' }]);
      expect(onChange.callCount).to.equal(1);
      expect(onChange.lastCall.args).to.deep.equal([['bar']]);
    });

    it('given event, calls props.onChange', () => {
      const onChange = simple.mock();
      const instance = getWrapper({ onChange }).instance();
      instance.handleChange({
        target: {
          selectedOptions: [
            { label: 'Foo', value: 'bar' },
          ],
        },
      });
      expect(onChange.callCount).to.equal(1);
      expect(onChange.lastCall.args).to.deep.equal([['bar']]);
    });
  });
});