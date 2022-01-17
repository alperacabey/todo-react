import React, { Component } from 'react';
import { mount, findByTestAttr, Provider, store  } from "./testUtils"
import App from './App'
import Toggle from './components/common/toggle'

const setup = () => {
  return mount<Component>(<Provider store={store}><App /></Provider>)
}

describe("App Container", () => {
  let wrapper : any = null

  beforeEach(() => {
    wrapper = setup()
  })

  it('renders without crashing', () => {
    expect(findByTestAttr(wrapper, "app-container").exists()).toBe(true)
  })

  it('renders toggle componenet correctly', () => {
    expect(wrapper.containsMatchingElement(<Toggle toggle={jest.fn()} value={false}/>)).toEqual(true)
  })

})