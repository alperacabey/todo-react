import React, { Component } from 'react';
import { mount, findByTestAttr, Provider, store  } from "../testUtils"
import TodoItem from './todoItem'

const setup = () => {
  return mount<Component>(<Provider store={store}><TodoItem 
    index={99}
    item={{id:'',text:'',done:false}}
    disabled={false} /></Provider>)
}

describe("TodoItem Component", () => {
  let wrapper = null

  beforeEach(() => {
    wrapper = setup()
  })

  it('renders without crashing', () => {
    expect(findByTestAttr(wrapper, "todo-item-component").exists()).toBe(true)
  })

})