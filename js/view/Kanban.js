import Column from "./Column.js";

export default class Kanban {
  constructor(root) {
    this.root = root;

    Kanban.columns().forEach((column) => {
      const columnVeiw = new Column(column.id, column.title);

      this.root.appendChild(columnVeiw.element.root);
    });
  }
  static columns() {
    return [
      {
        id: 1,
        title: "Not started",
      },
      {
        id: 2,
        title: "In progress",
      },
      {
        id: 3,
        title: "Completed",
      },
    ];
  }
}
