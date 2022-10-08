let answer = '';

function action(num1, num2){

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

    let leftIndex = [];
    let rightIndex = [];

    for(let i = 0; i < arithmetic.length; i++){
        if(arithmetic[i] == '('){
            leftIndex.push(i);
        }

        else if(arithmetic[i] == ')'){
            rightIndex.push(i);
        }
    }

    if(leftIndex && rightIndex){
        let priorityAnswer = [];

        for(let i = 0; i < rightIndex.length; i++){
            let priority = arithmetic.slice(leftIndex[i] + 1 - 4 * i, rightIndex[i] - 4 * i);

            switch(priority[1]){
                case '+':
                    priorityAnswer[i] = priority[0] + priority[2];
                    break;
                
                case '-':
                    priorityAnswer[i] = priority[0] - priority[2];
                    break;
                
                case 'x':
                    priorityAnswer[i] = priority[0] * priority[2];
                    break;
                
                case '/':
                    priorityAnswer[i] = priority[0] / priority[2];
                    break;
                
                case '%':
                    priorityAnswer[i] = priority[0] % priority[2];
                    break;
            }

            arithmetic.splice(leftIndex[i] - 4 * i, rightIndex[i] - leftIndex[i] + 1, priorityAnswer[i] - 4 * i);

        }
    }

    if(arithmetic.length == 1){
        answer = arithmetic[0];
    }

    else{
        for(let i = 0; i < arithmetic.length; i++){
            switch(arithmetic[i]){
                case '+':
                    answer = arithmetic[i - 1] + arithmetic[i + 1];
                    break;
    
                case '-':
                    answer = arithmetic[i - 1] - arithmetic[i + 1];
                    break;
    
                case 'x':
                    answer = arithmetic[i - 1] * arithmetic[i + 1];
                    break;
    
                case '/':
                    answer = arithmetic[i - 1] / arithmetic[i + 1];
                    break;
    
                case '%':
                    answer = arithmetic[i - 1] % arithmetic[i + 1];
                    break;
            }
        }
    }

    result.textContent = Number(answer);
});

AC.addEventListener('click', () => result.textContent = '');
