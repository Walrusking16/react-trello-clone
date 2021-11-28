import React, {useEffect, useState} from 'react';
import BoardItem from "./BoardItem";
import BoardService from "../Services/BoardService";
import AddBoard from "./AddBoard";

export default () => {
    const [board, setBoard] = useState(BoardService.boards);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const updateBoards = () => {
            setBoard(BoardService.boards);
						console.log(BoardService.boards);
        };

        BoardService.on('updated', updateBoards);

        return () => {
            BoardService.removeListener('updated', updateBoards);
        }
    })

    return (
      <div>
        <div className="mt-5 w-3/5 mx-auto h-full">
          <h2 className="text-center text-gray-500 text-2xl font-semibold uppercase tracking-wide">Boards</h2>
          <ul role="list" className="mt-5 grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {board.map((brd) => (
              <BoardItem key={brd.id} id={brd.id} name={brd.name} lists={brd.lists.length}/>
            ))}

	          <li>
		          <button
			          type="button"
			          className="col-span-1 relative block w-full border-2 border-gray-300 h-14 border-dashed rounded-lg text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
		            onClick={() => setVisible(true)}
		          >
			          Create a new board
		          </button>
	          </li>
          </ul>
        </div>

        <AddBoard visible={visible} setVisible={setVisible}/>
      </div>
    );
}