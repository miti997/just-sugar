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

            <a href="" ${this.on('click', 'increment')}>Clikc here</a>

            <div>counter ${this.counter}</div>
            ${this.loadComponent(TestComponent)}

            <input ${this.bind('name')}>
            <div>Your name: ${this.name}</div>
        `;
    }

    increment() {
        this.counter++;
    }
}