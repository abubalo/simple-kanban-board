import KanbanAPI from "../api/KanbanAPI.js";
import DropZone from "./DropZone.js";

export default class Item{
    constructor(id, content){

        const dropZoneButtom = DropZone.createDropZone()
        this.element = {};
        this.element.root = Item.createRoot();
        this.element.input = this.element.root.querySelector('.kanban__item-input');

        this.element.root.dataset.id = id
        this.element.input.textContent = content;
        this.content = content; 
        this.element.root.appendChild(dropZoneButtom)
        
        const onBlur = () =>{
            const newCentent = this.element.input.textContent.trim();
            if(newCentent == this.content) return ;

            this.content = newCentent;
            KanbanAPI.updateItem(id, {
                content: this.content
            })
        }
        this.element.input.addEventListener('blur', onBlur);
        
        this.element.input.addEventListener('dblclick', ()=>{
            const doDelete = confirm("Are you sure you want to delete?");
            
            if(doDelete){
                KanbanAPI.deleteItem(id);
                
                this.element.input.removeEventListener('blur', onBlur);
                this.element.root.parentElement.removeChild(this.element.root)
                
            }
        } )
        this.element.root.addEventListener('dragstart', e =>{
            e.dataTransfer.setData("text/plain", id)
        });

        this.element.input.addEventListener('drop', e => {
            e.preventDefault()
        })
    }

    static createRoot(){
        const range = document.createRange();

        range.selectNode(document.body);

        return range.createContextualFragment(`
            <div class="kanban__item" draggable="true">
                <div class="kanban__item-input" contenteditable="true"></div>
            </div>
        
        `).children[0]
    }
}