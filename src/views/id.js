import View from '/core/view.js';

export default class Test extends View {
    ID;
    constructor(id) {
        super();
        this.ID = id;
    }

    style() {
        return /*css*/`
            .red {
                color: red
            }
        `;
    }

    template() {
        return /*html*/`
            <div class="red">The id is: ${this.ID}</div>
        `;
    }
}
