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

            <a ${this.on('click', 'increment')}>Clikc here</a>

            <div class="red">counter ${this.counter}</div>
            ${this.loadComponent(TestComponent, ['change'])}

            ${this.loadComponent(TestComponent, ['target'])}

            <input ${this.bind('name')}>
            <div>Your name: ${this.name}</div>
        `;
    }

    increment() {
        this.counter++;
    }
}