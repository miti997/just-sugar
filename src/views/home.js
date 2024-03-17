import View from '/core/view.js';
import TestComponent from '/src/components/test_component.js';

export default class Home extends View {
    counter = 0;
    param = 5;

    multiple = [1, 2];

    template() {
        return /*html*/`
            Home
            ${
                this.if(this.param > 0, /*html*/`
                    <div>Value ${this.param}</div>
                `)
            }

            ${
                this.for(this.multiple, (result) => /*html*/`
                    <div>Multiple ${result}</div>
                `)
            }

            <a href="" js-click='increment'>Clikc here</a>
            <div>counter ${this.counter}</div>
            ${new TestComponent().render()}
        `;
    }

    increment() {
        this.counter++;
    }

    changes()
    {
        console.log('test')
    }
}