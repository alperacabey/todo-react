import React from "react";
import styled from "styled-components";
import { MdDeleteForever } from 'react-icons/md';
import { addTodo, editTodo, removeTodo } from "../todo/todoAC";
import { useAppDispatch } from "../types";

interface IItem {
  id: string;
  text: string;
  done: boolean;
}

interface TodoItemProps {
  index?: number;
  item?: IItem;
  disabled?: boolean;
  setRef?: (ref : HTMLInputElement | null) => void;
  focus?: ()=> void;
  editItem?: ()=> void
}

interface TodoInputProps {
  done?: boolean;
  value: string;
}

interface FocusEvent<T = Element> extends React.SyntheticEvent<T, any> {
  relatedTarget: EventTarget | null;
  target: EventTarget & T;
}

const Item = styled.li`
  width: 100%;
  margin: 4px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ItemInput = styled.input.attrs({
  type: "text",
})`
  width: 100%;
  text-decoration: ${(props: TodoInputProps) => props.done ? "line-through" : "none"};
  margin-right: ${(props: TodoInputProps) => props.value ? "" : ""};
`;

const ItemCheckbox = styled.input.attrs({
  type: "checkbox",
})``;

const TodoItem: React.FC <TodoItemProps> = ({index, item, disabled = false, focus, setRef, editItem})  => {
  const dispatch = useAppDispatch();
  const [temp, setTemp] = React.useState<string|null>(null)

  const inputOnChange = async (event: React.ChangeEvent<HTMLInputElement>) =>{
    if(!!item?.id)
      dispatch(editTodo(item.id, event.target.value, item.done))
    else if(!disabled) {
      await dispatch(addTodo(event.target.value))
      focus && focus()
    }
  }

  const handleFocusEvent = (event: FocusEvent<HTMLInputElement>) => {
    if(event.target.value && temp)
      setTemp(event.target.value)
  };

  const handleBlurEvent = (event: FocusEvent<HTMLInputElement>) => {
    if(!event.target.value && item) dispatch(removeTodo(item?.id))
    else if(event.target.value && event.target.value !== temp) {
      if(!temp) setTemp(event.target.value)
      temp && editItem && editItem()
    }
  };

  return (
        <Item 
          key={'list-item-' + index + Math.floor(Math.random())} 
          data-test="todo-item-component" >
          <ItemCheckbox 
            key={'list-item-checkbox-' + index + Math.floor(Math.random())}
            checked={item?.done}
            disabled={!item}
            onChange={()=> dispatch(editTodo(item?.id, item?.text, !item?.done))}
          />
          <ItemInput
            key={'list-item-input-' + index + Math.floor(Math.random())}
            ref={(ref) => setRef && setRef(ref)}
            value={item ? item?.text : ''}
            onChange={(e) => inputOnChange(e)}
            onBlur={handleBlurEvent}
            onFocus={handleFocusEvent}
            disabled={disabled}
            done={item?.done}
            data-test="todo-item-input"
          />
          {
            item && 
              <MdDeleteForever 
                size="1.5em" 
                onClick={()=> dispatch(removeTodo(item?.id))} 
                key={'list-item-delete-' + index + Math.floor(Math.random())}
              />
          }
        </Item>
  );
};

export default TodoItem;
