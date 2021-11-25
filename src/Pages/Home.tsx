import React, {useEffect} from 'react';
import {ChevronRightIcon} from '@heroicons/react/solid';
import {SpeakerphoneIcon, TerminalIcon} from '@heroicons/react/outline';
import BoardList from "../Components/BoardList";
import useBoards from "../Storage";

const items = [
  {
    name: 'Agile Project',
    description: 'Placeholder Text',
    href: '#',
    iconColor: 'bg-blue-500',
    icon: TerminalIcon,
  },
  {
    name: 'Marketing Campaign',
    description: 'I think the kids call these memes these days.',
    href: '#',
    iconColor: 'bg-pink-500',
    icon: SpeakerphoneIcon,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default () => {
  const board = useBoards();

  if(board.boards.length === 0) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <div className="max-w-lg mx-auto">
          <h2 className="text-lg font-medium text-gray-900">Create your first board</h2>
          <p className="mt-1 text-sm text-gray-500">Get started by selecting a template or start from an empty project.</p>
          <ul role="list" className="mt-6 border-t border-b border-gray-200 divide-y divide-gray-200">
            {items.map((item, itemIdx) => (
                <li key={itemIdx}>
                  <div className="relative group py-4 flex items-start space-x-3">
                    <div className="flex-shrink-0">
                        <span className={classNames(item.iconColor, 'inline-flex items-center justify-center h-10 w-10 rounded-lg')}>
                          <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
                        </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-medium text-gray-900">
                        <a href={item.href}>
                          <span className="absolute inset-0" aria-hidden="true" />
                          {item.name}
                        </a>
                      </div>
                      <p className="text-sm text-gray-500">{item.description}</p>
                    </div>
                    <div className="flex-shrink-0 self-center">
                      <ChevronRightIcon className="h-5 w-5 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
                    </div>
                  </div>
                </li>
            ))}
          </ul>
          <div className="mt-6 flex">
            <a onClick={()=> {board.addBoard("test")}} href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
              Or start from an empty project<span aria-hidden="true"> &rarr;</span>
            </a>
          </div>
        </div>
      </div>
    );
  }
  else {
    return (
        <BoardList/>
    );
  }
}