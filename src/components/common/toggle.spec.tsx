import React, { Component } from 'react';
import { shallow, findByTestAttr } from "../../testUtils"
import Toggle from './toggle'

const setup = () => {
  const toggle = jest.fn()
  return shallow<Component>(<Toggle toggle={toggle} value={false}/>)
}

describe("Toggle Component", () => {
  let wrapper = null

  beforeEach(() => {
    wrapper = setup()
  })

  it('renders without crashing', () => {
    expect(findByTestAttr(wrapper, "toggle-component").exists()).toBe(true)
  })

  it('switch toggle correctly', () => {
    const toggle = jest.fn()
    wrapper.setProps({ toggle })
    const input = findByTestAttr(wrapper, "toggle-input")
    input.simulate('change', { target: { value: true } })
    expect(toggle).toHaveBeenCalledTimes(1)
  })
})