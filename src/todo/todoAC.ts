import { Action } from "redux";

export const ITEM_ADD = "ITEM_ADD";
export const ITEM_EDIT = "ITEM_EDIT";
export const ITEM_REMOVE = "ITEM_REMOVE";
export const LIST_REMOVE = "LIST_REMOVE";

export type TodoAction = AddTodoAction | EditTodoAction | RemoveTodoAction | Action<typeof LIST_REMOVE>;

export interface AddTodoAction extends Action<typeof ITEM_ADD> {
  text: string;
}
export const addTodo = (text: string): AddTodoAction => ({
  type: ITEM_ADD,
  text,
});

export interface EditTodoAction extends Action<typeof ITEM_EDIT> {
  itemId: string;
  text: string;
  done: boolean;
}
export const editTodo = (itemId: string ='', text: string ='', done: boolean): EditTodoAction => ({
  type: ITEM_EDIT,
  itemId,
  text,
  done
});

export interface RemoveTodoAction extends Action<typeof ITEM_REMOVE> {
  itemId: string;
}
export const removeTodo = (itemId: string): RemoveTodoAction => ({
  type: ITEM_REMOVE,
  itemId,
});


export const removeList = () : Action<typeof LIST_REMOVE> => ({
  type: LIST_REMOVE,
});
