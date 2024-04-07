import View from '/core/view.js';
import TestComponent from '/src/components/test_component.js';

export default class Test extends View {
    counter = 0;
    template() {
        return /*html*/`
            <div>test page</div>
        `;
    }
}
