import React, {useState} from 'react';
import useBoards from "../Storage";
import BoardItem from "./BoardItem";

export default () => {
    const board = useBoards();
    const [name, setName] = useState("");

    function newBoard(key) {
        if(name.length <= 0) return;
        if(key.key !== "Enter") return;

        board.addBoard(name);

        setName("");
    }

    return (
        <>
            <div>
                <h2 className="text-gray-500 text-xs font-medium uppercase tracking-wide">Projects</h2>
                <ul role="list" className="mt-3 grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {board.boards.map((brd) => (
                        <BoardItem key={brd.id} id={brd.id} name={brd.name} lists={brd.lists.length}/>
                    ))}
                </ul>
            </div>
            <div>
                <input value={name} onChange={e => setName(e.target.value)} onKeyPress={newBoard} type="text"/>
            </div>
        </>
    );
}