import React, {useEffect, useRef, useState} from 'react';
import BoardService from "../../Services/BoardService";
import {PlusIcon, XIcon} from "@heroicons/react/solid";
import { Transition } from '@headlessui/react'

export default (props) => {
	const [listName, setListName] = useState("");
	const [visible, setVisible] = useState(false);
	const nameInput = useRef(undefined);

	function addList() {
		if(listName.length <= 0) {
			nameInput.current.focus();
			return;
		}

		BoardService.addList(props.board.id, listName);
		setListName("");
		setVisible(false);
	}

	function onNameChange(key) {
		if(key.key === "Escape"){
			setVisible(false);
			return;
		}
		if(key.key !== "Enter") return;

		addList();
	}

	function onNameClick() {
		setVisible(true);
	}

	useEffect(() => {
		if(!visible) return;

		nameInput.current.focus();
	}, [visible]);

	return (
		<div className="inline-block h-full w-1/5 flex-shrink-0">
			<div
				className={(visible ? "bg-gray-200 p-1.5" : "bg-transparent" ) + " transition-all block relative w-60 rounded-md"}
				onBlur={e => { if (!e.currentTarget.contains(e.relatedTarget)) setVisible(false); }}
			>
				<button
					className={(!visible ? "inline" : "hidden" ) + " inline-flex items-center bg-gray-300 bg-opacity-40 w-full rounded-md p-2 text-white hover:bg-opacity-60"}
					onClick={onNameClick}
				>
					<PlusIcon className="mx-1 text-white w-5 h-5"/>
					Add another list
				</button>

				<input
					ref={nameInput}
					value={listName}
					onChange={e => setListName(e.target.value)}
					onKeyDown={onNameChange}
					placeholder="Enter list title..."
					className={ (visible ? "inline" : "hidden" ) + " px-2 h-10 leading-7 z-10 text-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full border-gray-300 rounded-md"}
				/>

				<Transition
					show={visible}
					enter="transition-transform duration-150 origin-top"
					enterFrom="scale-y-0"
					enterTo="scale-y-100"
					leave="translation-transform duration-150 origin-top"
					leaveFrom="scale-y-100"
					leaveTo="scale-y-0"
				>
					<div className="inline-flex items-center w-full h-10 mt-1.5">
						<button className="bg-blue-600 text-sm text-white py-2 px-2 rounded-sm" onClick={addList}>
							Add list
						</button>
						<XIcon className="ml-2 text-gray-800 w-8 h-8 cursor-pointer" onClick={() => {setVisible(false)}}/>
					</div>
				</Transition>
			</div>
		</div>
	);
}