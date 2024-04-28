import View from '/core/view.js';

export default class Test extends View {
    id;
    constructor(id) {
        super();
        this.id = id;
    }
    template() {
    //    this.throwError('view_not_found', 'id');
        return /*html*/`
            <div>The id is: ${this.id}</div>
        `;
    }
}
