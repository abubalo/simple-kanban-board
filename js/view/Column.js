import KanbanAPI from "../api/KanbanAPI.js";
import DropZone from "./DropZone.js";
import Item from "./Item.js";

export default class Column{

    constructor(id, title){
        const DropTopZone = DropZone.createDropZone();
        
        this.element = {}
        this.element.root = Column.createRoot();
        this.element.title = this.element.root.querySelector('.kanban__column-title');
        this.element.items = this.element.root.querySelector('.kanban__column-items');
        this.element.addItem = this.element.root.querySelector('.kanban__add-item');

        this.element.root.dataset.id = id;
        this.element.title.textContent = title;
        this.element.items.appendChild(DropTopZone)

        this.element.addItem.addEventListener('click', ()=>{
            const newItem = KanbanAPI.insertItem(id, "");
            this.randerItem(newItem)
        }) 

        KanbanAPI.getItem(id).forEach(item => {
            this.randerItem(item)
        });
    }
    
    static createRoot(){
        const range = document.createRange();

        range.selectNode(document.body);

        return range.createContextualFragment(`
            <div class="kanban__column">
                <div class="kanban__column-title"></div>
                <div class="kanban__column-items"></div>
                <button type="button" class="kanban__add-item">+ Add</button>
            </div>
        
        `).children[0]
    }

    randerItem(data){
        const item = new Item(data.id, data.content);

        this.element.items.appendChild(item.element.root)
    }
}