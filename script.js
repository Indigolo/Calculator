let answer = '';

function calculation(arithmetic){
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
                tempAnswer = Number(tempArithmetic[i - 1]) + Number(tempArithmetic[i + 1]);
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

buttons.forEach(button => {
    if(button.textContent == ' = '){
        return;
    }

    else if(button.textContent == 'AC'){
        button.addEventListener('click', () =>result.textContent = '0')
    }

    else{
        button.addEventListener('click', () => {
            if(result.textContent == '0'){
                result.textContent = button.textContent;
            }

            else{
                result.textContent += button.textContent;
            }
        });
    }
})

const enter = buttons[18];

enter.addEventListener('click', () => {
    let arithmetic = result.textContent.split(' ');
    arithmetic = arithmetic.filter((char) => {return (char !== '')});

    countPriority(arithmetic);

    if(leftIndex.length > 0 && leftIndex.length == rightIndex.length){

        while(rightIndex.length > 0){
            let priority = arithmetic.slice(leftIndex[0] + 1, rightIndex[0]);

            console.log(arithmetic)
            console.log(priority)

            arithmetic.splice(leftIndex[0], rightIndex[0] - leftIndex[0] + 1, calculation(priority));

            countPriority(arithmetic);
        }     
    }

    if(arithmetic.length == 1){
        answer = arithmetic[0];
    }

    else{
        answer = calculation(arithmetic);
    }

    result.textContent = Number(answer);
});