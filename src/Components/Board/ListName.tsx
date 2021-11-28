import React, {useEffect, useRef, useState} from 'react';
import BoardService from "../../Services/BoardService";

export default (props) => {
	const [listName, setListName] = useState("");
	const [visible, setVisible] = useState(false);
	const nameInput = useRef(undefined);

	function onNameChange(key) {
		if(key.key === "Escape"){
			setVisible(false);
			return;
		}

		if(listName.length <= 0) return;
		if(key.key !== "Enter") return;

		BoardService.updateList(props.boardId, props.listId, {name: listName});
		setVisible(false);
	}

	function onNameClick() {
		setVisible(true);
		setListName(props.name);
	}

	useEffect(() => {
		if(!visible) return;

		nameInput.current.focus();
	}, [visible]);

	return (
		<div className={(visible ? "mb-7" : "mb-0" ) + " pl-1.5 text-lg w-11/12"}>
			<h3
				className={(!visible ? "inline" : "hidden" ) + " text-gray-900 cursor-pointer sm:truncate"}
				onClick={onNameClick}
			>{props.name}
			</h3>
			<input
				ref={nameInput}
				value={listName}
				onChange={e => setListName(e.target.value)}
				onKeyDown={onNameChange}
				onBlur={() => setVisible(false)}
				className={ (visible ? "inline" : "hidden" ) + " mx-2 absolute left-0 top-0.5 py-1 px-1 leading-7 z-10 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-10/12 border-gray-300 rounded-md"}
			/>
		</div>
	);
}