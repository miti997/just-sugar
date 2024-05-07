import View from '/core/view.js';
import TestComponent from '/src/components/test_component.js';

export default class Home extends View {
    counter = 0;
    param = 5;
    name = '';
    multiple = {
        wow: 'wow',
        nah: 'nah'
    };

    style() {
        return /*css*/`
            .red {
                color: red
            }
        `;
    }

    template() {
        return /*html*/`
            ${
                this.if(this.param > 0, /*html*/`
                    <div>Value ${this.param}</div>
                `)
            }

            ${
                this.for(this.multiple, (result, test) =>/*html*/`
                    <div>Multiple ${result} - ${test}</div>
                `)
            }

            <div><a ${this.on('click', 'increment')}>Increment</a></div>
            <div><a ${this.on('click', 'decrement')}>Decrement</a></div>

            <div class="red">counter ${this.counter}</div>
            ${this.loadComponent(TestComponent, ['change'])}

            ${this.loadComponent(TestComponent, ['target'])}        `;
    }

    increment() {
        this.counter++;
    }

    decrement() {
        this.counter--;
    }
}