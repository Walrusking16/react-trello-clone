import React, {Fragment, useRef, useState} from 'react';
import { PencilAltIcon, PencilIcon} from "@heroicons/react/solid";
import { Disclosure, Menu, Transition } from '@headlessui/react'

function classNames(...classes) {
	return classes.filter(Boolean).join(' ')
}

export default (props) => {
	const card = props.card;
	const [visible, setVisible] = useState(false);
	const [focused, setFocused] = useState(false);
	const firstItem = useRef(undefined);

	return (
		<div
			className="block bg-gray-50 rounded-sm cursor-pointer hover:bg-gray-100 shadow-sm w-full"
			onMouseEnter={() => setVisible(true)}
			onMouseLeave={() => { if(!focused) setVisible(false); }}
			onBlur={e => { if (!e.currentTarget.contains(e.relatedTarget)) setFocused(false); }}
			draggable={true}
		>
			<div className="flex items-center">
				<h3 className="p-1 pl-2">{card.name}</h3>
				<Menu as="div" className={ (visible ? "inline" : "hidden" ) + " relative inline-block text-left ml-auto mr-1 order-2 z-10"}>
					<div>
						<Menu.Button
							className="rounded-full flex items-center text-gray-400 hover:bg-gray-300 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
							onClick={() => {
								setFocused(true);
								firstItem.current.focus();
							}}
						>
							<span className="sr-only">Open options</span>
							<PencilIcon className="h-5 w-5" aria-hidden="true" />
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
											ref={firstItem}
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
		</div>
	);
}