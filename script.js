// ==========================
// GLOBAL VARIABLES
// ==========================

let currentDS = "Array";

let arrayData = [];
let stackData = [];
let queueData = [];
let linkedListData = [];

// ==========================
// OPERATIONS
// ==========================

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

// ==========================
// SELECT DATA STRUCTURE
// ==========================

function selectDS(ds) {

    currentDS = ds;

    document.getElementById("selectedDS").innerText = ds;

    const dashDS =
    document.getElementById("dashDS");

    if (dashDS) {
        dashDS.innerText = ds;
    }

    showOperations();
}

// ==========================
// SHOW OPERATIONS
// ==========================

function showOperations() {

    const container =
    document.getElementById(
        "operationContainer"
    );

    container.innerHTML = "";

    dsOperations[currentDS]
    .forEach(operation => {

        const btn =
        document.createElement("button");

        btn.className =
        "operation-btn";

        btn.innerText =
        operation;

        btn.onclick = () =>
        executeOperation(operation);

        container.appendChild(btn);

    });
}

// ==========================
// EXECUTE OPERATION
// ==========================

function executeOperation(operation) {

    const input =
    document.getElementById(
        "userInput"
    ).value.trim();

    const dashOperation =
    document.getElementById(
        "dashOperation"
    );

    if (dashOperation) {
        dashOperation.innerText =
        operation;
    }

    switch (currentDS) {

        case "Array":
            handleArray(
                operation,
                input
            );
            break;

        case "String":
            handleString(
                operation,
                input
            );
            break;

        case "Stack":
            handleStack(
                operation,
                input
            );
            break;

        case "Queue":
            handleQueue(
                operation,
                input
            );
            break;

        case "Linked List":
            handleLinkedList(
                operation,
                input
            );
            break;
    }
}

// ==========================
// ARRAY
// ==========================

function handleArray(
    operation,
    input
) {

    if (operation === "Insert") {

        arrayData =
        input
        .split(" ")
        .filter(item => item !== "")
        .map(Number);

        renderData(arrayData);

        updateExplanation(
        "Array inserted successfully."
        );

        updateCount(
        arrayData.length
        );
    }

    if (operation === "Delete") {

        arrayData.pop();

        renderData(arrayData);

        updateExplanation(
        "Last element deleted."
        );

        updateCount(
        arrayData.length
        );
    }

    if (operation === "Traverse") {

        renderData(arrayData);

        updateExplanation(
        "Traversing all elements."
        );
    }

    if (operation === "Search") {

        const target =
        Number(
        prompt(
        "Enter element to search"
        ));

        const index =
        arrayData.indexOf(
        target
        );

        if (index !== -1) {

            updateExplanation(
            `Element found at index ${index}`
            );

        } else {

            updateExplanation(
            "Element not found"
            );
        }
    }

    if (operation === "Bubble Sort") {

        for (
            let i = 0;
            i < arrayData.length;
            i++
        ) {

            for (
                let j = 0;
                j < arrayData.length - i - 1;
                j++
            ) {

                if (
                    arrayData[j] >
                    arrayData[j + 1]
                ) {

                    let temp =
                    arrayData[j];

                    arrayData[j] =
                    arrayData[j + 1];

                    arrayData[j + 1] =
                    temp;
                }
            }
        }

        renderData(arrayData);

        updateExplanation(
        "Bubble Sort Applied."
        );

        updateComplexity(
        "O(n)",
        "O(n²)",
        "O(n²)",
        "O(1)"
        );
    }
}

// ==========================
// STRING
// ==========================

function handleString(
    operation,
    input
) {

    if (operation === "Reverse") {

        const reversed =
        input
        .split("")
        .reverse()
        .join("");

        showText(reversed);

        updateExplanation(
        "String reversed."
        );
    }

    if (operation === "Palindrome") {

        const reversed =
        input
        .split("")
        .reverse()
        .join("");

        if (
            reversed === input
        ) {

            showText(
            "Palindrome"
            );

            updateExplanation(
            "Given string is palindrome."
            );

        } else {

            showText(
            "Not Palindrome"
            );

            updateExplanation(
            "Given string is not palindrome."
            );
        }
    }
}

// ==========================
// STACK
// ==========================

function handleStack(
    operation,
    input
) {

    if (operation === "Push") {

        stackData.push(input);
    }

    if (operation === "Pop") {

        stackData.pop();
    }

    if (operation === "Peek") {

        alert(
        stackData[
        stackData.length - 1
        ] || "Stack Empty"
        );
    }

    renderData(
    [...stackData].reverse()
    );

    updateCount(
    stackData.length
    );
}

// ==========================
// QUEUE
// ==========================

function handleQueue(
    operation,
    input
) {

    if (
        operation === "Enqueue"
    ) {

        queueData.push(input);
    }

    if (
        operation === "Dequeue"
    ) {

        queueData.shift();
    }

    renderData(queueData);

    updateCount(
    queueData.length
    );
}

// ==========================
// LINKED LIST
// ==========================

function handleLinkedList(
    operation,
    input
) {

    if (operation === "Insert") {

        linkedListData.push(input);
    }

    if (operation === "Delete") {

        linkedListData.pop();
    }

    if (operation === "Traverse") {

        updateExplanation(
        "Traversing linked list."
        );
    }

    renderData(
    linkedListData
    );

    updateCount(
    linkedListData.length
    );
}

// ==========================
// VISUALIZATION
// ==========================

function renderData(data) {

    const visualizer =
    document.getElementById(
        "visualizer"
    );

    visualizer.innerHTML = "";

    data.forEach(value => {

        const box =
        document.createElement("div");

        box.className =
        "visual-box";

        box.innerText =
        value;

        visualizer.appendChild(
        box
        );

    });
}

// ==========================
// TEXT OUTPUT
// ==========================

function showText(text) {

    document
    .getElementById(
    "visualizer"
    )
    .innerHTML =
    `<h2>${text}</h2>`;
}

// ==========================
// EXPLANATION
// ==========================

function updateExplanation(text) {

    document
    .getElementById(
    "explanation"
    )
    .innerHTML = text;
}

// ==========================
// COMPLEXITY
// ==========================

function updateComplexity(
    best,
    avg,
    worst,
    space
) {

    document
    .getElementById(
    "bestCase"
    )
    .innerText = best;

    document
    .getElementById(
    "avgCase"
    )
    .innerText = avg;

    document
    .getElementById(
    "worstCase"
    )
    .innerText = worst;

    document
    .getElementById(
    "spaceCase"
    )
    .innerText = space;
}

// ==========================
// DASHBOARD COUNT
// ==========================

function updateCount(count) {

    const elementBox =
    document.getElementById(
        "dashElements"
    );

    if (elementBox) {

        elementBox.innerText =
        count;
    }
}

// ==========================
// START
// ==========================

showOperations();