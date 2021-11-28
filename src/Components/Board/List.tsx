import React, {Fragment} from 'react';
import {DotsHorizontalIcon, PencilAltIcon, PlusIcon, XIcon} from "@heroicons/react/solid";
import { Disclosure, Menu, Transition } from '@headlessui/react'
import NewCard from "./NewCard";
import Card from "./Card";
import ListName from "./ListName";

function classNames(...classes) {
	return classes.filter(Boolean).join(' ')
}

export default (props) => {
	const list = props.list;

	return (
		<div className="inline-block h-full w-1/5 flex-shrink-0">
			<div className="relative mr-8 bg-gray-200 rounded-md p-1.5">
				<div className="flex items-center">
					<ListName boardId={props.boardId} listId={list.id} name={list.name}/>
					<Menu as="div" className="relative inline-block text-left z-10">
						<div>
							<Menu.Button className="rounded-full flex items-center text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
								<span className="sr-only">Open options</span>
								<DotsHorizontalIcon className="h-5 w-5" aria-hidden="true" />
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
							<Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
								<div className="py-1">
									<Menu.Item>
										{({ active }) => (
											<a
												href="#"
												className={classNames(
													active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
													'group flex items-center px-4 py-2 text-sm'
												)}
											>
												<PencilAltIcon className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
												Edit
											</a>
										)}
									</Menu.Item>
								</div>
							</Menu.Items>
						</Transition>
					</Menu>
				</div>

				<div>
					<div className="my-2 space-y-2">
						{list.cards.map(card => (
							<Card key={card.id} card={card}/>
						))}
					</div>
					<NewCard boardId={props.boardId} listId={list.id}/>
				</div>
			</div>
		</div>
	);
}