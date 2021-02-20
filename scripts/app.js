const boundElements = document.querySelectorAll('[mm-bind]');

let scope = {};

function init() {
    // Loop through input elements
    for (let el of inputElements) {
        if (el.type === 'text') {
            // Get property name from each input with an attribute of 'mm-model'
            let propName = el.getAttribute('mm-model');

            // Update bound scope property on input change
            el.addEventListener('keyup', e => {
                scope[propName] = el.value;
            });

            // Set property update logic
            setPropUpdateLogic(propName);
        }
    }
};

init();