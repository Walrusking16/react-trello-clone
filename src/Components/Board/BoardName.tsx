import React, {useEffect, useRef, useState} from 'react';
import BoardService from "../../Services/BoardService";

export default (props) => {
	const board = props.board;
	const [boardName, setBoardName] = useState("");
	const [visible, setVisible] = useState(false);
	const nameInput = useRef(undefined);

	function onNameChange(key) {
		if (key.key === "Escape") {
			setVisible(false);
			return;
		}

		if (boardName.length <= 0) return;
		if (key.key !== "Enter") return;

		BoardService.updateBoard(board.id, {name: boardName});
		setVisible(false);
	}

	function onNameClick() {
		setVisible(true);
		setBoardName(board.name);
	}

	useEffect(() => {
		if (!visible) return;

		nameInput.current.focus();
	}, [visible]);

	return (
		<div className="relative mt-6 ml-6 h-10">
			<h2
				className={(!visible ? "inline" : "hidden") + " text-2xl font-bold leading-7 text-white bg-gray-200 bg-opacity-40 rounded-lg py-1 px-2 cursor-pointer sm:truncate"}
				onClick={onNameClick}
			>
				{board.name}
			</h2>
			<input
				ref={nameInput}
				value={boardName}
				onChange={e => setBoardName(e.target.value)}
				onKeyDown={onNameChange}
				onBlur={() => setVisible(false)}
				style={{width: `${boardName.length + 1}ch`}}
				className={(visible ? "inline" : "hidden") + " absolute left-0 -top-1.5 py-1 px-2 leading-7 z-10 text-2xl shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full border-gray-300 rounded-md"}
			/>
		</div>
	);
}