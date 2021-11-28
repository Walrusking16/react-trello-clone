import Service from './Service';
import {SpeakerphoneIcon, TerminalIcon} from "@heroicons/react/outline";

class BoardService extends Service {
    boards = [];
    colors = [
        {id: 1, name: "blue", color: "bg-blue-500"},
        {id: 2, name: "red", color: "bg-red-500"},
        {id: 3, name: "yellow", color: "bg-yellow-400"},
        {id: 4, name: "orange", color: "bg-yellow-600"},
        {id: 5, name: "green", color: "bg-green-500"},
        {id: 6, name: "indigo", color: "bg-indigo-500"},
        {id: 7, name: "purple", color: "bg-purple-500"},
        {id: 8, name: "pink", color: "bg-pink-500"},
    ];
    boardTemplates = [
        {
            name: 'Agile Project',
            description: 'Basic agile project template',
            iconColor: 'bg-blue-500',
            icon: TerminalIcon,
            complete: ["To Do", "In Progress", "Done"]
        },
        {
            name: 'Marketing Campaign',
            description: 'Basic marketing campaign template',
            iconColor: 'bg-pink-500',
            icon: SpeakerphoneIcon,
            complete: ["Ready to Start", "In Progress", "Under Review", "Done"]
        },
    ];

    constructor() {
        super();

        this.boards = JSON.parse(localStorage.getItem('boards') ?? '[]');
        window.addEventListener('storage', this.storageUpdated);
    }

    // declared differently so i dont have to bind it to 'this'
    storageUpdated = () => {
        this.boards = JSON.parse(localStorage.getItem('boards') ?? '[]');

        this.emit('updated');
    }

    getColor(id: number) {
        const color = this.colors.find(c => c.id === id);

        if(color)
            return color;

        return this.colors.find(c => c.id === 1);
    }

    addBoard(name: string, color: number) : object {
        this.boards.push({id: this.newId(), color, name, lists: []});

        localStorage.setItem('boards', JSON.stringify(this.boards));

        this.emit('updated');

        return this.boards[this.boards.length - 1];
    }

    duplicateBoard(board: number) {
        const brd = this.getBoard(board);

        this.boards.push({...brd, name: `Copy of ${brd.name}`, id: this.newId()});

        localStorage.setItem('boards', JSON.stringify(this.boards));

        this.emit('updated');
    }

    newId() : number {
        let id = this.boards.length;

        while(this.boards.find(b => b.id === id))
            id++;

        return id;
    }

    newListId(board: number) : number {
        const brd = this.getBoard(board);
        let id = brd.lists.length;

        while(brd.lists.find(b => b.id === id))
            id++;

        return id;
    }

    newCardId(board: number, list: number) : number {
        const lst = this.getList(board, list)
        let id = lst.cards.length;

        while(lst.cards.find(b => b.id === id))
            id++;

        return id;
    }

    updateBoard(id: number, obj: object) {
        let tempBoards = [...this.boards]
        tempBoards.map((board, index) => {
            if(board.id === id)
                tempBoards[index] = {...board, ...obj}
        });

        this.boards = tempBoards;

        localStorage.setItem('boards', JSON.stringify(this.boards));

        this.emit('updated');
        this.emit(`updated-${id}`);
    }

    updateUnknownBoard(board) {
        const key = this.boards.findIndex(b => b.id === board.id);

        this.updateBoard(key, board);
    }

    getBoard(id: number) {
        return this.boards.find(b => b.id === id);
    }

    removeBoard(id: number) {
        this.boards = this.boards.filter(b => b.id !== id);
        localStorage.setItem('boards', JSON.stringify(this.boards));

        this.emit('updated');
        this.emit(`removed-${id}`);
    }

    updateList(board: number, list: number, obj: object) {
        const brd = this.getBoard(board);
        let tempLists = [...brd.lists];
        tempLists.map((lst, index) => {
            if(lst.id === list)
                tempLists[index] = {...lst, ...obj}
        });

        this.updateBoard(board, {lists: tempLists});
    }

    addList(id: number, name: string | Array<string>) {
        const board = this.getBoard(id);

        if(board) {
            if(typeof name === 'string')
                board.lists.push({id: this.newListId(board.id), name, cards: []});
            else
                name.map(n => this.addList(board.id, n));

            this.updateBoard(id, board);
        }
    }

    addCardObjToList(boardId: number, listId: number, card: object) {
        const board = this.getBoard(boardId);

        if(board) {
            const list = board.lists.find(l => l.id === listId);

            if(list) {
                list.cards.push(card);

                this.updateBoard(boardId, board);
            }
        }
    }

    getList(boardId: number, id: number) {
        const board = this.getBoard(boardId);

        if(board) {
            return board.lists.find(l => l.id === id);
        }

        return undefined;
    }

    addCardToList(boardId: number, listId: number, name: string) {
        this.addCardObjToList(boardId, listId, {id: this.newCardId(boardId, listId), name});
    }
}

export default new BoardService;