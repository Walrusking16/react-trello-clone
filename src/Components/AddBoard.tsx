import {Fragment, useEffect, useRef, useState} from 'react'
import { Dialog, Listbox, Transition } from '@headlessui/react'
import {CheckIcon, SelectorIcon, TemplateIcon} from "@heroicons/react/solid";
import BoardService from "../Services/BoardService";
import {RadioGroup} from "@headlessui/react";
import {TerminalIcon} from "@heroicons/react/outline";

function classNames(...classes) {
	return classes.filter(Boolean).join(' ')
}

export default (props) => {
	const boardTypes = [{name: 'Empty Project', complete: []}, ...BoardService.boardTemplates];
	const cancelButtonRef = useRef(null)
	const [boardName, setBoardName] = useState("");
	const [selectedColor, setSelectedColor] = useState(BoardService.colors[0])
	const [selected, setSelected] = useState(boardTypes[0])

	function addBoard() {
		if(boardName.length <= 0) return;

		const brd = BoardService.addBoard(boardName, selectedColor.id);

		//@ts-ignore
		selected.complete.map(n => BoardService.addList(brd.id, n))

		setBoardName("");
		props.setVisible(false);
	}

	useEffect(() => {
		if(props.boardType === undefined) return;

		setSelected(boardTypes.find(b => b.name === props.boardType))
	}, [props])

	return (
		<Transition.Root show={props.visible} as={Fragment}>
			<Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" initialFocus={cancelButtonRef} onClose={props.setVisible}>
				<div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
					</Transition.Child>

					<span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
						enterTo="opacity-100 translate-y-0 sm:scale-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100 translate-y-0 sm:scale-100"
						leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
					>
						<div className="inline-block align-bottom bg-gray-100 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
							<div>
								<div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100">
									<TemplateIcon className="h-6 w-6 text-blue-600" aria-hidden="true" />
								</div>
								<div className="mt-3 sm:mt-5">
									<Dialog.Title as="h3" className="text-lg text-center leading-6 font-medium text-gray-900">
										New Board
									</Dialog.Title>
									<div className="mt-3">
										<div>
											<label htmlFor="name" className="block text-sm font-semibold text-gray-700">
												Name
											</label>
											<div className="mt-1">
												<input
													value={boardName}
													onChange={e => setBoardName(e.target.value)}
													name="name"
													className="shadow-sm focus:ring-indigo-500 p-1 focus:border-indigo-500 block w-full border-gray-300 rounded-md"
													placeholder="Cool name here"
												/>
											</div>
										</div>

										<div className="mt-4">
											<Listbox value={selected} onChange={setSelected}>
												{({ open }) => (
													<>
														<Listbox.Label className="block text-sm font-semibold text-gray-700">Project Type</Listbox.Label>
														<div className="mt-1 relative">
															<Listbox.Button className="bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
																<span className="block truncate">{selected.name}</span>
																<span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                              </span>
															</Listbox.Button>

															<Transition
																show={open}
																as={Fragment}
																leave="transition ease-in duration-100"
																leaveFrom="opacity-100"
																leaveTo="opacity-0"
															>
																<Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
																	{boardTypes.map((type) => (
																		<Listbox.Option
																			key={type.name}
																			className={({ active }) =>
																				classNames(
																					active ? 'text-white bg-indigo-600' : 'text-gray-900',
																					'cursor-default select-none relative py-2 pl-3 pr-9'
																				)
																			}
																			value={type}
																		>
																			{({ selected, active }) => (
																				<>
								                        <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
								                          {type.name}
								                        </span>

																					{selected ? (
																						<span
																							className={classNames(
																								active ? 'text-white' : 'text-indigo-600',
																								'absolute inset-y-0 right-0 flex items-center pr-4'
																							)}
																						>
								                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
								                          </span>
																					) : null}
																				</>
																			)}
																		</Listbox.Option>
																	))}
																</Listbox.Options>
															</Transition>
														</div>
													</>
												)}
											</Listbox>
										</div>

										<RadioGroup value={selectedColor} onChange={setSelectedColor} className="mt-4">
											<RadioGroup.Label className="block text-sm font-semibold text-gray-700">Choose board color</RadioGroup.Label>
											<div className="mt-4 flex items-center space-x-3">
												{BoardService.colors.map((color) => (
													<RadioGroup.Option
														key={color.name}
														value={color}
														className={({ active, checked }) =>
															classNames(
																color.color.replace("bg", "ring"),
																active && checked ? 'ring ring-offset-1' : '',
																!active && checked ? 'ring-2' : '',
																'-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none'
															)
														}
													>
														<RadioGroup.Label as="p" className="sr-only">
															{color.name}
														</RadioGroup.Label>
														<span
															aria-hidden="true"
															className={classNames(color.color, 'h-8 w-8 border border-black border-opacity-10 rounded-full')}
														/>
													</RadioGroup.Option>
												))}
											</div>
										</RadioGroup>
									</div>
								</div>
							</div>
							<div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
								<button
									type="button"
									className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm"
									onClick={addBoard}
								>
									Create
								</button>
								<button
									type="button"
									className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
									onClick={() => props.setVisible(false)}
									ref={cancelButtonRef}
								>
									Cancel
								</button>
							</div>
						</div>
					</Transition.Child>
				</div>
			</Dialog>
		</Transition.Root>
	);
}