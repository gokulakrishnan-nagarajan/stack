const stackSizeId = 'stack-size', stackId = 'stack', errMsgId = 'err-msg', stackOverflowTxt = 'Stack Overflow !', stackUnderflowTxt = 'Stack Underflow !';

function setStackSize(size) {
    const stackSizeEle = document.getElementById(stackSizeId);
    stackSizeEle.value = size;

    const stackEle = document.getElementById(stackId);
    const stackItems = stackEle.children;

    if(stackItems.length > size) {
        setErrMsg(stackOverflowTxt);
    } else {
        setErrMsg('');
    }
}

function stackSizeChanged() {
    const stackSizeEle = document.getElementById(stackSizeId);
    setStackSize(stackSizeEle.value);

    saveStackData();
}

function setErrMsg(msg) {
    const errMsgEle = document.getElementById(errMsgId);
    errMsgEle.innerText = msg;
}

function push(value, force = false) {
    const stackEle = document.getElementById(stackId);
    const stackCount = stackEle.children.length;

    const stackSizeEle = document.getElementById(stackSizeId);
    const stackSize = parseInt(stackSizeEle.value);

    if(stackCount < stackSize || force) {
        const newEle = document.createElement('div');
        newEle.classList.add('stack-item');
        newEle.innerText = value;

        stackEle.appendChild(newEle);

        setErrMsg(stackCount < stackSize ? '' : stackOverflowTxt);
    } else {
        setErrMsg(stackOverflowTxt);
    }
}

function pushClicked() {
    const inputEle = document.getElementById('input');
    const inputValue = parseInt(inputEle.value);

    push(inputValue);

    saveStackData();
}

function pop() {
    const stackEle = document.getElementById(stackId);
    const stackItems = stackEle.children;

    if(stackItems.length > 0) {
        stackEle.removeChild(stackItems[stackItems.length-1]);

        const stackCount = stackEle.children.length;

        const stackSizeEle = document.getElementById(stackSizeId);
        const stackSize = parseInt(stackSizeEle.value);

        if(stackCount > stackSize) {
            setErrMsg(stackOverflowTxt);
        } else {
            setErrMsg('');
        }

        saveStackData();
    } else {
        setErrMsg(stackUnderflowTxt);
    }
}

function popClicked() {
    pop();
}

async function saveStackData() {
    const data = {stackSize: 0, stack: []};

    const stackSizeEle = document.getElementById(stackSizeId);
    data.stackSize = parseInt(stackSizeEle.value);

    const stackEle = document.getElementById(stackId);
    const stackItems = stackEle.children;

    for(let i=0; i<stackItems.length; i++) {
        data.stack.push(stackItems[i].innerText);
    }

    await axios.post('stackData', data);
}

async function fetchStackData() {
    const response = await axios('stackData');
    const data = response.data;

    setStackSize(data.stackSize);

    for(let i=0; i<data.stack.length; i++) {
        push(data.stack[i], true);
    }
}

fetchStackData();