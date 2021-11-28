import react, {Fragment, useEffect, useState} from 'react'
import {Menu, Transition} from "@headlessui/react";
import {DotsVerticalIcon, DuplicateIcon, PencilAltIcon, TrashIcon} from "@heroicons/react/solid";
import React from "react";
import EditBoard from "./EditBoard";
import BoardService from "../Services/BoardService";

function classNames(...classes) {
	return classes.filter(Boolean).join(' ')
}

export default (props) => {
	const [editOpen, setEditOpen] = useState(false);
	const [editId, setEditId] = useState(null);

	function getInitials() : string {
		const words = props.name.split(" ");
		return words.map(word => word[0]).join("").toUpperCase();
	}

	return (
		<li className="col-span-1 flex shadow-sm rounded-md">
			<div
				className={BoardService.getColor(BoardService.getBoard(props.id)?.color).color + " flex-shrink-0 flex items-center justify-center w-16 text-white text-sm font-medium rounded-l-md"}>
				{getInitials()}
			</div>
			<div className="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate">
				<a className="flex-1 px-4 py-2 text-sm truncate" href={`/b?id=${props.id}`}>
          <span className="text-gray-900 font-medium hover:text-gray-600">
            {props.name}
          </span>
					<p className="text-gray-500">{props.lists} Lists</p>
				</a>
				<div className="mr-7 mb-7 flex-shrink-0 pr-2">
					<Menu as="div" className="absolute inline-block text-left">
						<div>
							<Menu.Button
								className="w-8 h-8 bg-white inline-flex items-center justify-center text-gray-400 rounded-full bg-transparent hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
								<span className="sr-only">Open options</span>
								<DotsVerticalIcon className="w-5 h-5" aria-hidden="true"/>
							</Menu.Button>
						</div>

						<Transition
							as={Fragment}
							enter="transition ease-out duration-100"
							enterFrom="transform opacity-0 scale-95"
							enterTo="transform opacity-100 scale-100"
							leave="transition ease-in duration-75"
							leaveFrom="transform opacity-100 scale-100"
							leaveTo="transform opacity-0 scale-95"
						>
							<Menu.Items
								className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
								<div className="py-1">
									<Menu.Item>
										{({active}) => (
											<span
												className={classNames(
													active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
													'group flex items-center px-4 py-2 text-sm cursor-pointer'
												)}
												onClick={() => {
													setEditId(props.id);
													setEditOpen(true);
												}}
											>
                        <PencilAltIcon
                          className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                          aria-hidden="true"
                        />
                        Edit
                      </span>
										)}
									</Menu.Item>
									<Menu.Item>
										{({active}) => (
											<span
												className={classNames(
													active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
													'group flex items-center px-4 py-2 text-sm cursor-pointer'
												)}
												onClick={() => BoardService.duplicateBoard(props.id)}
											>
                        <DuplicateIcon
                          className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                          aria-hidden="true"
                        />
                        Duplicate
                      </span>
										)}
									</Menu.Item>
								</div>
								<div className="py-1">
									<Menu.Item>
										{({active}) => (
											<span
												className={classNames(
													active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
													'group flex items-center px-4 py-2 text-sm cursor-pointer'
												)}
												onClick={() => {
													BoardService.removeBoard(props.id);
												}}
											>
                        <TrashIcon
                          className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                          aria-hidden="true"
                        />
                        Delete
                      </span>
										)}
									</Menu.Item>
								</div>
							</Menu.Items>
						</Transition>
					</Menu>

					<EditBoard id={editId} open={editOpen} setVisible={setEditOpen} />
				</div>
			</div>
		</li>
	);
}