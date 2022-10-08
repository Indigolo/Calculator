
const result = document.querySelector('#result');
const buttons = document.querySelectorAll('button');

const AC = buttons[3];

const enter = buttons[18];


//delete .number



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
            let priority = arithmetic.slice(leftIndex[i] + 1, rightIndex[i]);

            console.log(priority)
            console.log(arithmetic);

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

            console.log(priorityAnswer[i]);
        }
    }

    for(let i = 0; i < arithmetic.length; i++){

    }
});

buttons.forEach(button => {
    button.addEventListener('click', () => result.textContent += button.textContent);
})

AC.addEventListener('click', () => result.textContent = '');


