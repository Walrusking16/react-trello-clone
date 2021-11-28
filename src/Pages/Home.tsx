import React, {useEffect, useState} from 'react';
import {ChevronRightIcon} from '@heroicons/react/solid';
import BoardList from "../Components/BoardList";
import BoardService from "../Services/BoardService";
import AddBoard from "../Components/AddBoard";

function classNames(...classes) {
	return classes.filter(Boolean).join(' ');
}

export default () => {
	const [board, setBoard] = useState(BoardService.boards);
	const [boardType, setBoardType] = useState("");
	const [visible, setVisible] = useState(false);

	function setupCompleteMethod(type: string) {
		setBoardType(type);
		setVisible(true);
	}

	useEffect(() => {
		const updateBoards = () => {
			setBoard(BoardService.boards);
		};

		BoardService.on('updated', updateBoards);

		return () => {
			BoardService.removeListener('updated', updateBoards);
		}
	})

	return (
		<>
			{board.length === 0 &&
	  <div className="w-full h-full flex justify-center items-center">
		  <div className="max-w-lg mx-auto">
			  <h2 className="text-lg font-medium text-gray-900">Create your first board</h2>
			  <p className="mt-1 text-sm text-gray-500">Get started by selecting a template or start from an empty
				  board.
			  </p>
			  <ul role="list" className="mt-6 border-t border-b border-gray-200 divide-y divide-gray-200">
					{BoardService.boardTemplates.map((item, itemIdx) => (
						<li key={itemIdx}>
							<div className="relative group py-4 flex items-start space-x-3">
								<div className="flex-shrink-0">
                  <span
                    className={classNames(item.iconColor, 'inline-flex items-center justify-center h-10 w-10 rounded-lg')}>
                    <item.icon className="h-6 w-6 text-white" aria-hidden="true"/>
                  </span>
								</div>
								<div className="min-w-0 flex-1">
									<div className="text-sm font-medium text-gray-900">
										<button onClick={() => setupCompleteMethod(item.name)}>
											<span className="absolute inset-0" aria-hidden="true"/>
											{item.name}
										</button>
									</div>
									<p className="text-sm text-gray-500">{item.description}</p>
								</div>
								<div className="flex-shrink-0 self-center">
									<ChevronRightIcon
										className="h-5 w-5 text-gray-400 group-hover:text-gray-500"
										aria-hidden="true"
									/>
								</div>
							</div>
						</li>
					))}
			  </ul>
			  <div className="mt-6 flex">
				  <button onClick={() => setupCompleteMethod("Empty Project")}
				     className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
					  Or start from an empty project<span aria-hidden="true"> &rarr;</span>
				  </button>
			  </div>
		  </div>

		  <AddBoard boardType={boardType} visible={visible} setVisible={setVisible}/>
	  </div>
			}

			{board.length > 0 && <BoardList/>}
		</>
	);
}