import KanbanAPI from "../api/KanbanAPI.js";

export default class DropZone {
  static createDropZone() {
    const range = document.createRange();

    range.selectNode(document.body);

    const dropZone = range.createContextualFragment(`
            <div class="kanban__dropzone"></div>
        
        `).children[0];

    dropZone.addEventListener("dragover", (e) => {
      e.preventDefault();

      dropZone.classList.add("Kanban__dropzone--active");
    });

    dropZone.addEventListener("dragleave", (e) => {
      dropZone.classList.remove("Kanban__dropzone--active");
    });

    dropZone.addEventListener("drop", (e) => {
      e.preventDefault();
      dropZone.classList.remove("Kanban__dropzone--active");

      const columnElement = dropZone.closest(".kanban__column");
      const columnId = Number(columnElement.dataset.id);
      const dropZonesInColumn = Array.from(
        columnElement.querySelectorAll(".kanban__dropzone")
      );
      const droppedIndex = dropZonesInColumn.indexOf(dropZone);
      const itemId = Number(e.dataTransfer.getData("text/plain"));
      const droppedItemElement = document.querySelector(
        `[data-id="${itemId}"]`
      );
      const inserAfter = dropZone.parentElement.classList.contains(
        ".kanban__item"
      )
        ? dropZone.parentElement
        : dropZone;

      if (droppedItemElement.contains(dropZone)) return;
      inserAfter.after(droppedItemElement);

      KanbanAPI.updateItem(itemId, {
        columnId,
        position: droppedIndex,
      });

      console.log(droppedItemElement);
    });

    return dropZone;
  }
}
