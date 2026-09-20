/* =========================================================
   ALGOVISION X
   Interactive DSA Learning Platform
========================================================= */


/* =========================================================
   GLOBAL STATE
========================================================= */

let currentDS = "Array";

let arrayData = [];
let stackData = [];
let queueData = [];
let linkedListData = [];

let history = [];

let steps = [];
let currentStep = 0;
let animationTimer = null;


/* =========================================================
   DATA STRUCTURE OPERATIONS
========================================================= */

const dsOperations = {

    Array: [
        "Insert",
        "Delete",
        "Search",
        "Traverse",
        "Bubble Sort"
    ],

    String: [
        "Reverse",
        "Palindrome"
    ],

    Stack: [
        "Push",
        "Pop",
        "Peek"
    ],

    Queue: [
        "Enqueue",
        "Dequeue"
    ],

    "Linked List": [
        "Insert",
        "Delete",
        "Traverse"
    ]

};


/* =========================================================
   ALGORITHM INFORMATION
========================================================= */

const algorithms = {

    Array: [

        {
            name: "Linear Search",
            description: "Search an element sequentially.",
            complexity: "O(n)",
            code: `
// Linear Search

int linearSearch(vector<int>& arr, int target) {

    for(int i = 0; i < arr.size(); i++) {

        if(arr[i] == target)
            return i;

    }

    return -1;
}
`
        },

        {
            name: "Bubble Sort",
            description: "Sort elements using adjacent swaps.",
            complexity: "O(n²)",
            code: `
// Bubble Sort

void bubbleSort(vector<int>& arr) {

    int n = arr.size();

    for(int i = 0; i < n - 1; i++) {

        for(int j = 0; j < n - i - 1; j++) {

            if(arr[j] > arr[j + 1]) {

                swap(arr[j], arr[j + 1]);

            }

        }

    }
}
`
        }

    ],

    String: [

        {
            name: "Reverse String",
            description: "Reverse characters of a string.",
            complexity: "O(n)",
            code: `
// Reverse String

string reverseString(string s) {

    reverse(s.begin(), s.end());

    return s;
}
`
        },

        {
            name: "Palindrome",
            description: "Check whether a string reads the same.",
            complexity: "O(n)",
            code: `
// Palindrome Check

bool isPalindrome(string s) {

    int left = 0;
    int right = s.length() - 1;

    while(left < right) {

        if(s[left] != s[right])
            return false;

        left++;
        right--;

    }

    return true;
}
`
        }

    ],

    Stack: [

        {
            name: "Stack",
            description: "LIFO based data structure.",
            complexity: "O(1)",
            code: `
// Stack Operations

stack<int> st;

st.push(10);
st.push(20);

st.pop();

int topElement = st.top();
`
        }

    ],

    Queue: [

        {
            name: "Queue",
            description: "FIFO based data structure.",
            complexity: "O(1)",
            code: `
// Queue Operations

queue<int> q;

q.push(10);
q.push(20);

q.pop();

int frontElement = q.front();
`
        }

    ],

    "Linked List": [

        {
            name: "Linked List",
            description: "Dynamic nodes connected using pointers.",
            complexity: "O(n)",
            code: `
// Linked List Node

struct Node {

    int data;

    Node* next;

    Node(int value) {

        data = value;
        next = nullptr;

    }

};
`
        }

    ]

};


/* =========================================================
   SELECT DATA STRUCTURE
========================================================= */

function selectDS(ds) {

    currentDS = ds;

    document.getElementById("selectedDS").innerText = ds;

    const dashDS = document.getElementById("dashDS");

    if (dashDS) {
        dashDS.innerText = ds;
    }

    updateActiveSidebar(ds);

    showOperations();

    showAlgorithms();

    resetComplexity();

    updateCount(getCurrentData().length);

    // Clear any in-progress step animation (e.g. Bubble Sort)
    // so Next/Previous/Play don't keep animating stale data
    // from the data structure the user just switched away from.
    clearInterval(animationTimer);
    steps = [];
    currentStep = 0;

    document.getElementById("dashOperation").innerText = "None";

    document.getElementById("cppCode").innerText =
        "Select an algorithm to view its C++ implementation.";

    renderCurrentDS();

    updateExplanation(
        `You selected <strong>${ds}</strong>. Choose an operation to begin.`
    );

}


/* =========================================================
   RENDER CURRENT DATA STRUCTURE'S VISUALIZATION
========================================================= */

function renderCurrentDS() {

    if (currentDS === "Linked List") {

        renderLinkedList();

    } else if (currentDS === "Stack") {

        renderData([...stackData].reverse());

    } else {

        renderData(getCurrentData());

    }

}


/* =========================================================
   ACTIVE SIDEBAR
========================================================= */

function updateActiveSidebar(ds) {

    const items = document.querySelectorAll(".ds-item");

    items.forEach(item => {

        item.classList.toggle(
            "active",
            item.dataset.ds === ds
        );

    });

}


/* =========================================================
   SHOW OPERATIONS
========================================================= */

function showOperations() {

    const container =
        document.getElementById("operationContainer");

    container.innerHTML = "";

    dsOperations[currentDS].forEach(operation => {

        const button =
            document.createElement("button");

        button.className = "operation-btn";

        button.innerText = operation;

        button.onclick = () =>
            executeOperation(operation);

        container.appendChild(button);

    });

}


/* =========================================================
   SHOW ALGORITHMS
========================================================= */

function showAlgorithms() {

    const container =
        document.getElementById("algorithmContainer");

    container.innerHTML = "";

    const list = algorithms[currentDS] || [];

    list.forEach(algorithm => {

        const card =
            document.createElement("div");

        card.className = "algorithm-card";

        card.innerHTML = `

            <div class="algorithm-icon">
                ⚡
            </div>

            <h3>
                ${algorithm.name}
            </h3>

            <p>
                ${algorithm.description}
            </p>

            <span>
                ${algorithm.complexity}
            </span>

        `;

        card.onclick = () => {

            document.getElementById("cppCode").innerText =
                algorithm.code;

            updateExplanation(
                `<strong>${algorithm.name}</strong><br>
                ${algorithm.description}<br><br>
                Time Complexity:
                <strong>${algorithm.complexity}</strong>`
            );

        };

        container.appendChild(card);

    });

}


/* =========================================================
   LOAD INPUT
========================================================= */

function loadInputData() {

    const input =
        document.getElementById("userInput")
            .value
            .trim();

    if (!input) {

        updateExplanation(
            "⚠️ Please enter some data first."
        );

        return;

    }


    if (currentDS === "Array") {

        const numbers =
            input
                .split(/\s+/)
                .map(Number);

        if (numbers.some(Number.isNaN)) {

            updateExplanation(
                "⚠️ Array input must contain numbers only."
            );

            return;

        }

        arrayData = numbers;

        renderData(arrayData);

        updateCount(arrayData.length);

        updateExplanation(
            `Array loaded successfully with <strong>${arrayData.length}</strong> elements.`
        );

    }


    else if (currentDS === "String") {

        showText(input);

        updateCount(input.length);

        updateExplanation(
            `String loaded successfully. Length: <strong>${input.length}</strong>`
        );

    }


    else {

        updateExplanation(
            `Input ready for <strong>${currentDS}</strong>.`
        );

    }

}


/* =========================================================
   EXECUTE OPERATION
========================================================= */

function executeOperation(operation) {

    let success = false;

    switch (currentDS) {

        case "Array":
            success = handleArray(operation);
            break;

        case "String":
            success = handleString(operation);
            break;

        case "Stack":
            success = handleStack(operation);
            break;

        case "Queue":
            success = handleQueue(operation);
            break;

        case "Linked List":
            success = handleLinkedList(operation);
            break;

    }

    // Only record the operation in history / dashboard if it
    // actually ran. Previously this fired unconditionally, so
    // clicking an operation with no data loaded (or cancelling
    // a prompt) still logged it as if it had succeeded.
    if (success) {

        document.getElementById("dashOperation")
            .innerText = operation;

        addHistory(operation);

    }

    updateActiveOperationButton(operation);

}


/* =========================================================
   ACTIVE OPERATION BUTTON
========================================================= */

function updateActiveOperationButton(operation) {

    const buttons =
        document.querySelectorAll(".operation-btn");

    buttons.forEach(btn => {

        btn.classList.toggle(
            "active",
            btn.innerText.trim() === operation
        );

    });

}


/* =========================================================
   ARRAY
========================================================= */

function handleArray(operation) {

    const input =
        document.getElementById("userInput")
            .value
            .trim();


    if (operation === "Insert") {

        if (!input) {

            updateExplanation(
                "⚠️ Enter numbers to insert first."
            );

            return false;

        }

        const values =
            input
                .split(/\s+/)
                .map(Number);

        if (values.some(Number.isNaN)) {

            updateExplanation(
                "⚠️ Please enter valid numbers."
            );

            return false;

        }

        // Insert appends to the existing array (true DSA
        // insert semantics). Use "Load Data" above to replace
        // the array entirely.
        arrayData = arrayData.concat(values);

        renderData(
            arrayData,
            values.map((_, i) => arrayData.length - values.length + i)
        );

        updateCount(arrayData.length);

        updateComplexity(
            "O(1)",
            "O(1)",
            "O(n)",
            "O(1)"
        );

        updateExplanation(
            `<strong>${values.length}</strong> element(s) inserted at the end of the array.`
        );

        return true;

    }


    else if (operation === "Delete") {

        if (arrayData.length === 0) {

            updateExplanation(
                "⚠️ Array is empty."
            );

            return false;

        }

        const deleted =
            arrayData.pop();

        renderData(arrayData);

        updateCount(arrayData.length);

        updateComplexity(
            "O(1)",
            "O(1)",
            "O(1)",
            "O(1)"
        );

        updateExplanation(
            `Element <strong>${deleted}</strong> was deleted from the end of the array.`
        );

        return true;

    }


    else if (operation === "Traverse") {

        if (arrayData.length === 0) {

            updateExplanation(
                "⚠️ Load an array first."
            );

            return false;

        }

        renderData(arrayData);

        updateCount(arrayData.length);

        updateExplanation(
            "Traversing the array from the first element to the last element."
        );

        updateComplexity(
            "O(n)",
            "O(n)",
            "O(n)",
            "O(1)"
        );

        return true;

    }


    else if (operation === "Search") {

        if (arrayData.length === 0) {

            updateExplanation(
                "⚠️ Load an array first."
            );

            return false;

        }

        const rawInput =
            prompt("Enter element to search:");

        // Cancelling the prompt returns null. Number(null) is 0,
        // which was silently treated as "search for 0" before.
        if (rawInput === null || rawInput.trim() === "") {

            updateExplanation(
                "Search was cancelled."
            );

            return false;

        }

        const target = Number(rawInput);

        if (Number.isNaN(target)) {

            updateExplanation(
                "⚠️ Invalid search value."
            );

            return false;

        }

        const index =
            arrayData.indexOf(target);

        renderData(
            arrayData,
            index !== -1 ? [index] : []
        );

        updateComplexity(
            "O(1)",
            "O(n)",
            "O(n)",
            "O(1)"
        );

        if (index !== -1) {

            updateExplanation(
                `🎯 Element <strong>${escapeHTML(target)}</strong> found at index <strong>${index}</strong>.`
            );

        } else {

            updateExplanation(
                `❌ Element <strong>${escapeHTML(target)}</strong> was not found.`
            );

        }

        return true;

    }


    else if (operation === "Bubble Sort") {

        if (arrayData.length === 0) {

            updateExplanation(
                "⚠️ Load an array first."
            );

            return false;

        }

        createBubbleSortSteps();

        return true;

    }

    return false;

}


/* =========================================================
   BUBBLE SORT STEP GENERATOR
========================================================= */

function createBubbleSortSteps() {

    steps = [];

    currentStep = 0;

    const arr = [...arrayData];

    for (let i = 0; i < arr.length - 1; i++) {

        for (let j = 0; j < arr.length - i - 1; j++) {

            steps.push({
                data: [...arr],
                compare: [j, j + 1],
                type: "compare",
                message:
                    `Comparing ${arr[j]} and ${arr[j + 1]}`
            });

            if (arr[j] > arr[j + 1]) {

                [
                    arr[j],
                    arr[j + 1]
                ] =
                [
                    arr[j + 1],
                    arr[j]
                ];

                steps.push({
                    data: [...arr],
                    compare: [j, j + 1],
                    type: "swap",
                    message:
                        `Swapped ${arr[j + 1]} and ${arr[j]}`
                });

            }

        }

    }

    steps.push({
        data: [...arr],
        compare: [],
        message:
            "Bubble Sort completed successfully."
    });

    showStep();

    updateComplexity(
        "O(n)",
        "O(n²)",
        "O(n²)",
        "O(1)"
    );

}


/* =========================================================
   SHOW STEP
========================================================= */

function showStep() {

    if (!steps.length)
        return;

    const step =
        steps[currentStep];

    renderData(
        step.data,
        step.compare,
        step.type === "compare" ? "comparing" : "active"
    );

    updateExplanation(
        `Step <strong>${currentStep + 1}</strong> / ${steps.length}<br>
        ${step.message}`
    );

    updateCount(
        step.data.length
    );

}


/* =========================================================
   NEXT STEP
========================================================= */

function nextStep() {

    if (!steps.length)
        return;

    if (currentStep < steps.length - 1) {

        currentStep++;

        showStep();

    }

}


/* =========================================================
   PREVIOUS STEP
========================================================= */

function previousStep() {

    if (!steps.length)
        return;

    if (currentStep > 0) {

        currentStep--;

        showStep();

    }

}


/* =========================================================
   PLAY ANIMATION
========================================================= */

function playAnimation() {

    if (!steps.length)
        return;

    clearInterval(animationTimer);

    animationTimer =
        setInterval(() => {

            if (currentStep >= steps.length - 1) {

                clearInterval(animationTimer);

                return;

            }

            currentStep++;

            showStep();

        }, 700);

}


/* =========================================================
   PAUSE ANIMATION
========================================================= */

function pauseAnimation() {

    clearInterval(animationTimer);

}


/* =========================================================
   STRING
========================================================= */

function handleString(operation) {

    const input =
        document.getElementById("userInput")
            .value
            .trim();

    if (!input) {

        updateExplanation(
            "⚠️ Enter a string first."
        );

        return false;

    }


    if (operation === "Reverse") {

        const reversed =
            input
                .split("")
                .reverse()
                .join("");

        showText(reversed);

        updateCount(reversed.length);

        updateComplexity(
            "O(n)",
            "O(n)",
            "O(n)",
            "O(n)"
        );

        updateExplanation(
            `Original: <strong>${escapeHTML(input)}</strong><br>
             Reversed: <strong>${escapeHTML(reversed)}</strong>`
        );

        return true;

    }


    else if (operation === "Palindrome") {

        // Ignore case and non-alphanumeric characters so phrases
        // like "Madam" or "A man a plan a canal Panama" are
        // recognised correctly, not just exact-character mirrors.
        const normalized =
            input
                .toLowerCase()
                .replace(/[^a-z0-9]/g, "");

        const reversed =
            normalized
                .split("")
                .reverse()
                .join("");

        const palindrome =
            normalized === reversed && normalized.length > 0;

        showText(
            palindrome
                ? "✓ Palindrome"
                : "✗ Not Palindrome"
        );

        updateCount(input.length);

        updateComplexity(
            "O(n)",
            "O(n)",
            "O(n)",
            "O(n)"
        );

        updateExplanation(
            palindrome
                ? `✓ <strong>${escapeHTML(input)}</strong> is a palindrome.`
                : `✗ <strong>${escapeHTML(input)}</strong> is not a palindrome.`
        );

        return true;

    }

    return false;

}


/* =========================================================
   STACK
========================================================= */

function handleStack(operation) {

    const input =
        document.getElementById("userInput")
            .value
            .trim();


    if (operation === "Push") {

        if (!input) {

            updateExplanation(
                "⚠️ Enter a value to push."
            );

            return false;

        }

        stackData.push(input);

        updateExplanation(
            `<strong>${escapeHTML(input)}</strong> pushed onto the stack.`
        );

    }


    else if (operation === "Pop") {

        if (stackData.length === 0) {

            updateExplanation(
                "⚠️ Stack is empty."
            );

            return false;

        }

        const removed =
            stackData.pop();

        updateExplanation(
            `<strong>${escapeHTML(removed)}</strong> popped from the stack.`
        );

    }


    else if (operation === "Peek") {

        if (stackData.length === 0) {

            updateExplanation(
                "⚠️ Stack is empty."
            );

            return false;

        }

        const top =
            stackData[stackData.length - 1];

        updateExplanation(
            `Top element is <strong>${escapeHTML(top)}</strong>.`
        );

    }

    else {

        return false;

    }


    renderData(
        [...stackData].reverse()
    );

    updateCount(stackData.length);

    updateComplexity(
        "O(1)",
        "O(1)",
        "O(1)",
        "O(n)"
    );

    return true;

}


/* =========================================================
   QUEUE
========================================================= */

function handleQueue(operation) {

    const input =
        document.getElementById("userInput")
            .value
            .trim();


    if (operation === "Enqueue") {

        if (!input) {

            updateExplanation(
                "⚠️ Enter a value to enqueue."
            );

            return false;

        }

        queueData.push(input);

        updateExplanation(
            `<strong>${escapeHTML(input)}</strong> added to the rear of the queue.`
        );

    }


    else if (operation === "Dequeue") {

        if (queueData.length === 0) {

            updateExplanation(
                "⚠️ Queue is empty."
            );

            return false;

        }

        const removed =
            queueData.shift();

        updateExplanation(
            `<strong>${escapeHTML(removed)}</strong> removed from the front of the queue.`
        );

    }

    else {

        return false;

    }


    renderData(queueData);

    updateCount(queueData.length);

    updateComplexity(
        "O(1)",
        "O(1)",
        "O(n)",
        "O(n)"
    );

    return true;

}


/* =========================================================
   LINKED LIST
========================================================= */

function handleLinkedList(operation) {

    const input =
        document.getElementById("userInput")
            .value
            .trim();


    if (operation === "Insert") {

        if (!input) {

            updateExplanation(
                "⚠️ Enter a value to insert."
            );

            return false;

        }

        linkedListData.push(input);

        updateExplanation(
            `<strong>${escapeHTML(input)}</strong> inserted into the linked list.`
        );

    }


    else if (operation === "Delete") {

        if (linkedListData.length === 0) {

            updateExplanation(
                "⚠️ Linked list is empty."
            );

            return false;

        }

        const removed =
            linkedListData.pop();

        updateExplanation(
            `<strong>${escapeHTML(removed)}</strong> deleted from the linked list.`
        );

    }


    else if (operation === "Traverse") {

        if (linkedListData.length === 0) {

            updateExplanation(
                "⚠️ Linked list is empty."
            );

            return false;

        }

        updateExplanation(
            "Traversing linked list nodes from head to tail."
        );

    }

    else {

        return false;

    }


    renderLinkedList();

    updateCount(
        linkedListData.length
    );

    updateComplexity(
        "O(1)",
        "O(n)",
        "O(n)",
        "O(n)"
    );

    return true;

}


/* =========================================================
   RENDER NORMAL DATA
========================================================= */

function renderData(data, highlighted = [], highlightClass = "active") {

    const visualizer =
        document.getElementById("visualizer");

    visualizer.innerHTML = "";

    if (!data.length) {

        visualizer.innerHTML = `

            <div class="visual-empty">

                <div class="visual-empty-icon">
                    ◈
                </div>

                <h3>
                    No Data
                </h3>

                <p>
                    Add some elements to visualize them.
                </p>

            </div>

        `;

        return;

    }


    data.forEach((value, index) => {

        const box =
            document.createElement("div");

        box.className = "visual-box";

        box.innerText = value;

        if (highlighted.includes(index)) {

            box.classList.add(highlightClass);

        }

        visualizer.appendChild(box);

    });

}


/* =========================================================
   LINKED LIST VISUALIZATION
========================================================= */

function renderLinkedList() {

    const visualizer =
        document.getElementById("visualizer");

    visualizer.innerHTML = "";

    if (!linkedListData.length) {

        visualizer.innerHTML = `

            <div class="visual-empty">

                <div class="visual-empty-icon">
                    →
                </div>

                <h3>
                    Empty Linked List
                </h3>

                <p>
                    Insert nodes to begin.
                </p>

            </div>

        `;

        return;

    }


    linkedListData.forEach(
        (value, index) => {

            const wrapper =
                document.createElement("div");

            wrapper.className =
                "linked-node";


            const node =
                document.createElement("div");

            node.className =
                "visual-box";

            node.innerText =
                value;


            wrapper.appendChild(node);


            if (
                index <
                linkedListData.length - 1
            ) {

                const arrow =
                    document.createElement("span");

                arrow.className =
                    "node-arrow";

                arrow.innerText =
                    "→";

                wrapper.appendChild(
                    arrow
                );

            }


            else {

                const nullText =
                    document.createElement("span");

                nullText.className =
                    "node-arrow";

                nullText.innerText =
                    "→ NULL";

                wrapper.appendChild(
                    nullText
                );

            }


            visualizer.appendChild(
                wrapper
            );

        }
    );

}


/* =========================================================
   SHOW TEXT
========================================================= */

function showText(text) {

    const visualizer =
        document.getElementById("visualizer");

    visualizer.innerHTML = `

        <div class="visual-empty">

            <div class="visual-empty-icon">
                𝕊
            </div>

            <h3>
                ${escapeHTML(text)}
            </h3>

        </div>

    `;

}


/* =========================================================
   UPDATE EXPLANATION
========================================================= */

function updateExplanation(text) {

    const element =
        document.getElementById("explanation");

    element.innerHTML = `

        <div class="explanation-icon">
            💡
        </div>

        <div>

            <h3>
                Explanation
            </h3>

            <p>
                ${text}
            </p>

        </div>

    `;

}


/* =========================================================
   UPDATE COMPLEXITY
========================================================= */

function updateComplexity(
    best,
    avg,
    worst,
    space
) {

    document.getElementById(
        "bestCase"
    ).innerText = best;

    document.getElementById(
        "avgCase"
    ).innerText = avg;

    document.getElementById(
        "worstCase"
    ).innerText = worst;

    document.getElementById(
        "spaceCase"
    ).innerText = space;


    document.getElementById(
        "dashComplexity"
    ).innerText = worst;

}


/* =========================================================
   RESET COMPLEXITY
========================================================= */

function resetComplexity() {

    updateComplexity(
        "-",
        "-",
        "-",
        "-"
    );

}


/* =========================================================
   UPDATE COUNT
========================================================= */

function updateCount(count) {

    const element =
        document.getElementById(
            "dashElements"
        );

    element.innerText = count;

}


/* =========================================================
   GET CURRENT DATA
========================================================= */

function getCurrentData() {

    switch (currentDS) {

        case "Array":
            return arrayData;

        case "Stack":
            return stackData;

        case "Queue":
            return queueData;

        case "Linked List":
            return linkedListData;

        default:
            return [];

    }

}


/* =========================================================
   OPERATION HISTORY
========================================================= */

function addHistory(operation) {

    history.unshift({

        operation: operation,

        ds: currentDS,

        time: new Date()
            .toLocaleTimeString()

    });

    if (history.length > 10) {

        history.pop();

    }

    renderHistory();

}


/* =========================================================
   RENDER HISTORY
========================================================= */

function renderHistory() {

    const container =
        document.getElementById(
            "historyContainer"
        );

    if (!history.length) {

        container.innerHTML = `

            <div class="empty-history">
                No operations performed yet.
            </div>

        `;

        return;

    }


    container.innerHTML = "";

    history.forEach(item => {

        const div =
            document.createElement("div");

        div.className =
            "history-item";

        div.innerHTML = `

            <span>
                ${item.ds} → ${item.operation}
            </span>

            <span>
                ${item.time}
            </span>

        `;

        container.appendChild(div);

    });

}


/* =========================================================
   COPY C++ CODE
========================================================= */

function copyCode() {

    const code =
        document.getElementById(
            "cppCode"
        ).innerText;

    if (
        !code ||
        code.includes(
            "Select an algorithm"
        )
    ) {

        return;

    }

    navigator.clipboard
        .writeText(code)
        .then(() => {

            updateExplanation(
                "✓ C++ code copied to clipboard."
            );

        })
        .catch(() => {

            updateExplanation(
                "Unable to copy code."
            );

        });

}


/* =========================================================
   RESET VISUALIZER
========================================================= */

function resetVisualizer() {

    clearInterval(animationTimer);

    currentStep = 0;

    steps = [];

    arrayData = [];

    stackData = [];

    queueData = [];

    linkedListData = [];

    history = [];

    document.getElementById(
        "userInput"
    ).value = "";

    document.getElementById(
        "dashOperation"
    ).innerText = "None";

    updateActiveOperationButton(null);

    document.getElementById(
        "cppCode"
    ).innerText =
        "Select an algorithm to view its C++ implementation.";

    updateCount(0);

    resetComplexity();

    renderHistory();

    document.getElementById(
        "visualizer"
    ).innerHTML = `

        <div class="visual-empty">

            <div class="visual-empty-icon">
                ◈
            </div>

            <h3>
                Visualization Area
            </h3>

            <p>
                Load data and select an operation
                to begin visualization.
            </p>

        </div>

    `;

    updateExplanation(
        "Visualizer has been reset. Select an operation to begin."
    );

}


/* =========================================================
   ESCAPE HTML
========================================================= */

function escapeHTML(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


/* =========================================================
   INITIALIZE
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        selectDS("Array");

        renderHistory();

    }
);
