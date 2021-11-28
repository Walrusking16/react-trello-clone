import React, {useEffect, useRef, useState} from 'react';
import BoardService from "../../Services/BoardService";
import {PlusIcon, XIcon} from "@heroicons/react/solid";
import { Transition } from '@headlessui/react'

export default (props) => {
	const [cardName, setCardName] = useState("");
	const [visible, setVisible] = useState(false);
	const nameInput = useRef(undefined);

	function addCard() {
		if(cardName.length <= 0) {
			nameInput.current.focus();
			return;
		}

		BoardService.addCardToList(props.boardId, props.listId, cardName);
		setCardName("");
		setVisible(false);
	}

	function onNameChange(key) {
		if(key.key === "Escape"){
			setVisible(false);
			return;
		}
		if(key.key !== "Enter") return;

		addCard();
	}

	function onNameClick() {
		setVisible(true);
	}

	useEffect(() => {
		if(!visible) return;

		nameInput.current.focus();
	}, [visible]);

	return (
		<div className="">
			<div
				className={(visible ? "bg-gray-200 p-1.5" : "bg-transparent" ) + " transition-all block relative rounded-md"}
				onBlur={e => { if (!e.currentTarget.contains(e.relatedTarget)) setVisible(false); }}
			>
				<button
					className={(!visible ? "inline" : "hidden" ) + " inline-flex items-center bg-opacity-40 w-full rounded-md p-1 text-gray-500 hover:bg-gray-300 hover:text-gray-600"}
					onClick={onNameClick}
				>
					<PlusIcon className="mx-1 w-5 h-5"/>
					Add a card
				</button>

				<textarea
					ref={nameInput}
					value={cardName}
					onChange={e => setCardName(e.target.value)}
					onKeyDown={onNameChange}
					placeholder="Enter a title for this card..."
					className={ (visible ? "inline" : "hidden" ) + " px-2 z-10 text-sm shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full border-gray-300 rounded-md"}
					rows={3}
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
						<button className="bg-blue-600 text-sm text-white py-2 px-2 rounded-sm" onClick={addCard}>
							Add card
						</button>
						<XIcon className="ml-2 text-gray-800 w-8 h-8 cursor-pointer" onClick={() => {setVisible(false)}}/>
					</div>
				</Transition>
			</div>
		</div>
	);
}