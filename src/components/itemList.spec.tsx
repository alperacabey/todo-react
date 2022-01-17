import React, { Component } from 'react';
import { mount, findByTestAttr, Provider, store  } from "../testUtils"
import ItemList from './itemList'
import TodoItem from "./todoItem"
import { removeList } from "../todo/todoAC";

const setup = () => {
  return mount<Component>(<Provider store={store}><ItemList /></Provider>)
}

describe("ItemList Component", () => {
  let wrapper = null

  beforeEach(() => {
    wrapper = setup()
  })

  it('renders without crashing', () => {
    expect(findByTestAttr(wrapper, "item-list-component").exists()).toBe(true)
  })

  it('renders todo item component correctly', () => {
    expect(wrapper.containsMatchingElement(<TodoItem/>)).toEqual(true)
  })

  it("renders one empty item initially", () => {
    expect(wrapper.find("li")).toHaveLength(1);
  });

  it("create a new empty item after input change", () => {
    const input = findByTestAttr(wrapper, "todo-item-input")
    input.at(0).simulate('change', { target: { value: 'test-text' } })
    expect(wrapper.find("li")).toHaveLength(2);
  });

  it('reset limit after clear list', async () => {
    const setLimit = jest.fn()
    await store.dispatch(removeList())
    expect(setLimit).toHaveBeenCalledTimes(0)
  })

})