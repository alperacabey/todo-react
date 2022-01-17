import { getNewId } from "../utils";
import { ITEM_ADD, ITEM_EDIT, TodoAction, ITEM_REMOVE, LIST_REMOVE } from "./todoAC";

type Item = {
  id: string;
  text: string;
  done: boolean;
};

type State = {
  items: Array<Item>;
  resetTrigger: Object;
};

const initialState: State = {
  items: [],
  resetTrigger: {}
};

const todoReducer = (
  state: State = initialState,
  action: TodoAction
): State => {
  let index
  switch (action.type) {
    case ITEM_ADD:
      return {
        ...state,
        items: [
          ...state.items,
          {
            id: getNewId(),
            done: false,
            text: action.text,
          },
        ],
      };
    case ITEM_EDIT:
      index = state.items.findIndex((item) => item.id === action.itemId);
      // Feel free to use immutability-helper or an equivalent library.
      return {
        ...state,
        items: [
          ...state.items.slice(0, index),
          { ...state.items[index], text: action.text, done: action.done },
          ...state.items.slice(index + 1),
        ],
      };
    case ITEM_REMOVE:
      index = state.items.findIndex((item) => item.id === action.itemId);
      return {
        ...state,
        items: [
          ...state.items.slice(0, index),
          ...state.items.slice(index + 1),
        ],
      }
    case LIST_REMOVE:
      return {
        resetTrigger: new Object(),
        items: [],
      }
    default:
      return state;
  }
};

export default todoReducer;
