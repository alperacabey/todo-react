import React from "react";
import styled from "styled-components";
import { useAppSelector } from "../types";
import TodoItem from "./todoItem"


const List = styled.ul`
  width: 100%;
  display: block;
  padding: 0px;
  box-sizing: border-box;
`;

const ItemList: React.FC = () => {
  const items = useAppSelector((s) => s.todos.items);
  const resetTrigger = useAppSelector((s) => s.todos.resetTrigger);
  const textInputRefs = React.useRef<(HTMLDivElement | null)[]>([])
  const [limit, setLimit] = React.useState<number>(3)

  const onFocus = () => {
    textInputRefs.current[items.length]?.focus()
  }

  React.useEffect(()=>{
    setLimit(3)
  },[resetTrigger])

  const editItem = () =>{
    setLimit(limit - 1)
  }
  
  return (
    <List data-test="item-list-component">
      {items.map((item,index) => (
        <TodoItem 
          key={'todo-item-'+index} 
          index={index} 
          item={item} 
          setRef={(ref) => textInputRefs.current[index] = ref}
          editItem={editItem}
          disabled={limit < 1}
        />
      ))
      }

      <TodoItem 
        focus={()=> onFocus()}
        disabled={limit < 1}
      />
    </List>
  );
};

export default ItemList;
