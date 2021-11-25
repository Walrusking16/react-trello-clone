import {useState, useEffect, Dispatch, SetStateAction} from "react";

// @ts-ignore
const useBoards = () : Array<Array<object>, Dispatch<SetStateAction<any>>> => {
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    const d = localStorage.getItem("boards");

    if(d)
      setBoards(JSON.parse(d));
  }, []);

  const updateBoards = (updatedBoards: object[]) => {
    setBoards(updatedBoards);

    localStorage.setItem("boards", JSON.stringify(updatedBoards));
  };

  const addBoard = (name: string) => {
    const newBoards = [...boards, {id: boards.length, name, lists: []}]

    updateBoards(newBoards);
  }

  const updateBoard = (id: number, obj: object) => {
    let tempBoards = [...boards]
    tempBoards.map((board, index) => {
      if(board.id === id)
        tempBoards[index] = {...board, ...obj}
    });

    updateBoards(tempBoards);
  }

  const getBoard = (id: number) : object => {
    return boards.find(board => board.id === id);
  }

  const removeBoard = (id: number) => {
    const newBoards = [...boards];

    updateBoards(newBoards.filter(board => board.id !== id));
  }

  return {boards, addBoard, updateBoard, getBoard, removeBoard};
};

export default useBoards;