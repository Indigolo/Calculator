let answer = '';

function calculation(arithmetic){
    for(let i = 0; i < arithmetic.length; i++){
        switch(arithmetic[i]){
            case '%':
                answer = arithmetic[i - 1] % arithmetic[i + 1];
                arithmetic.splice(i - 1, 3, answer);
                i = 0;
                break;

            case 'x':
                answer = arithmetic[i - 1] * arithmetic[i + 1];
                arithmetic.splice(i - 1, 3, answer);
                i = 0;
                break;

            case '/':
                answer = arithmetic[i - 1] / arithmetic[i + 1];
                arithmetic.splice(i - 1, 3, answer);
                i = 0;
                break;
        }
    }

    for(let i = 0; i < arithmetic.length; i++){
        switch(arithmetic[i]){
            case '+':
                answer = arithmetic[i - 1] + arithmetic[i + 1];
                arithmetic.splice(i - 1, 3, answer);
                i = 0;
                break;

            case '-':
                answer = arithmetic[i - 1] - arithmetic[i + 1];
                arithmetic.splice(i - 1, 3, answer);
                i = 0;
                break;
        }
    }
}


function calculation2(arithmetic){
    let tempAnswer = 0;

    let tempArithmetic = arithmetic;

    for(let i = 0; i < tempArithmetic.length; i++){
        switch(tempArithmetic[i]){
            case '%':
                tempAnswer = tempArithmetic[i - 1] % tempArithmetic[i + 1];
                tempArithmetic.splice(i - 1, 3, tempAnswer);
                i = 0;
                break;

            case 'x':
                tempAnswer = tempArithmetic[i - 1] * tempArithmetic[i + 1];
                tempArithmetic.splice(i - 1, 3, tempAnswer);
                i = 0;
                break;

            case '/':
                tempAnswer = tempArithmetic[i - 1] / tempArithmetic[i + 1];
                tempArithmetic.splice(i - 1, 3, tempAnswer);
                i = 0;
                break;
        }
    }

    for(let i = 0; i < tempArithmetic.length; i++){
        switch(tempArithmetic[i]){
            case '+':
                tempAnswer = tempArithmetic[i - 1] + tempArithmetic[i + 1];
                tempArithmetic.splice(i - 1, 3, tempAnswer);
                i = 0;
                break;

            case '-':
                tempAnswer = tempArithmetic[i - 1] - tempArithmetic[i + 1];
                tempArithmetic.splice(i - 1, 3, tempAnswer);
                i = 0;
                break;
        }
    }

    return tempAnswer;
}

let leftIndex = [];
let rightIndex = [];

function countPriority(arithmetic){
    leftIndex = [];
    rightIndex = [];

    for(let i = 0; i < arithmetic.length; i++){
        if(arithmetic[i] == '(')
        leftIndex.push(i);

        else if(arithmetic[i] == ')')
        rightIndex.push(i);
    }
}

const result = document.querySelector('#result');
const buttons = document.querySelectorAll('button');

const AC = buttons[3];

const enter = buttons[18];


//delete .number

buttons.forEach(button => {
    if(button.textContent == ' = '){
        return;
    }

    else{
        button.addEventListener('click', () => result.textContent += button.textContent);
    }
})

enter.addEventListener('click', () => {
    let arithmetic = result.textContent.split(' ');
    arithmetic = arithmetic.filter((char) => {return (char !== '')});

    countPriority(arithmetic);

    if(leftIndex.length > 0 && leftIndex.length == rightIndex.length){

        while(rightIndex.length > 0){
            let priority = arithmetic.slice(leftIndex[0] + 1, rightIndex[0]);

            console.log(arithmetic)
            console.log(priority)

            arithmetic.splice(leftIndex[0], rightIndex[0] - leftIndex[0] + 1, calculation2(priority));

            countPriority(arithmetic);
        }     
    }

    if(arithmetic.length == 1){
        answer = arithmetic[0];
    }

    else{
        answer = calculation2(arithmetic);
    }

    result.textContent = Number(answer);
});

AC.addEventListener('click', () => result.textContent = '');
