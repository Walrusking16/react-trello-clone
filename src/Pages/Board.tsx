import React, {useEffect, useState} from 'react';
import BoardService from "../Services/BoardService";
import Navbar from "../Components/Navbar";
import BoardName from "../Components/Board/BoardName";
import List from "../Components/Board/List";
import NewList from "../Components/Board/NewList";

export default () => {
	const query = new URLSearchParams(window.location.search);
	const id = parseInt(query.get('id'));
	const [board, setBoard] = useState(BoardService.getBoard(id));

	useEffect(() => {
		const updateBoards = () => {
			setBoard(BoardService.getBoard(id));
		};

		BoardService.on(`updated-${id}`, updateBoards);

		return () => {
			BoardService.removeListener(`updated-${id}`, updateBoards);
		}
	})

	useEffect(() => {
		document.body.classList.add(BoardService.getColor(board.color).color);
	}, [board]);

	return (
		<>
			<div className={BoardService.getColor(board.color).color + " h-full"}>
				<Navbar/>
				<BoardName board={board}/>

				<div className="relative flex-grow mx-6 mt-6 h-4/5">
					<div className="absolute left-0 top-0 right-0 bottom-0 flex flex-row max-h-full overflow-x-auto">
						{board.lists.map(l => (
							<List key={l.id} boardId={board.id} list={l}/>
						))}
						<NewList board={board}/>
					</div>
				</div>
			</div>
		</>
	);
}