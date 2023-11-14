// categories is the main data structure for the app; it looks like this:

//  [
//    { title: "Math",
//      clues: [
//        {question: "2+2", answer: 4, showing: null},
//        {question: "1+1", answer: 2, showing: null}
//        ...
//      ],
//    },
//    { title: "Literature",
//      clues: [
//        {question: "Hamlet Author", answer: "Shakespeare", showing: null},
//        {question: "Bell Jar Author", answer: "Plath", showing: null},
//        ...
//      ],
//    },
//    ...
//  ]

let categories = [];
const body = $('body');
let count = 0;


/** Get NUM_CATEGORIES random category from API.
 *
 * Returns array of category ids
 */

async function getCategoryIds() {
    const ids = [2,4,5,6,7,9,10,12,14,15,17,18,19,20,22] 
    return ids;
}

/** Return object with data about a category:
 *
 *  Returns { title: "Math", clues: clue-array }
 *
 * Where clue-array is:
 *   [
 *      {question: "Hamlet Author", answer: "Shakespeare", showing: null},
 *      {question: "Bell Jar Author", answer: "Plath", showing: null},
 *      ...
 *   ]
 */



async function getCategory(catId) {
    const clueArray = []
    let title;
    const clues = await axios.get('https://jservice.io/api/clues')
    for (clue of clues.data){
        if (clue.category_id === catId){
            clueArray.push(clue);
            title = clue.category.title;
        }
    }

    return {title, clues: clueArray}
}

/** Fill the HTML table#jeopardy with the categories & cells for questions.
 *
 * - The <thead> should be filled w/a <tr>, and a <td> for each category
 * - The <tbody> should be filled w/NUM_QUESTIONS_PER_CAT <tr>s,
 *   each with a question for each category in a <td>
 *   (initally, just show a "?" where the question/answer would go.)
 */

async function fillTable() {
    // Initializing relevant variables
    const table = $('table')
    const allIds = await getCategoryIds();
    let clues = [];
    let finalIds = _.sampleSize(allIds, 6);
    let trueFinalIds = [];

    // Adding rows, headers, and cells
    for (let i = 0; i < 6; i++){
        let tr = $('<tr>');
        // Adding headers to each column

        if (i === 0){
            for (let j = 0; j < 6; j++){
                let genre1 = await getCategory(finalIds[j])
                trueFinalIds.push(genre1.clues)
                let th = $('<th></th>').text(genre1.title);
                tr.append(th[0]);
            }
        }
        // Adding cells to each column
        else{
            for (let k = 0; k < 6; k++){
                let td = $('<td></td>').text('?')
                td.on('click', function(){
                    td.text(trueFinalIds[0][i-1].question); 
                    td.on('click', function(){
                        td.text(trueFinalIds[0][i-1].answer); 
                    })
                })
                // let td = $('<td></td>').text(genre2.clues[i-1].question);
                tr.append(td);
            }
        }
        table[0].append(tr[0])
    }
}

/** Handle clicking on a clue: show the question or answer.
 *
 * Uses .showing property on clue to determine what to show:
 * - if currently null, show question & set .showing to "question"
 * - if currently "question", show answer & set .showing to "answer"
 * - if currently "answer", ignore click
 * */

function handleClick(evt) {
    // removing the div
    evt.target.parent.children.remove()
}

/** Wipe the current Jeopardy board, show the loading spinner,
 * and update the button used to fetch data.
 */

function showLoadingView() {
    // removing table
    table.remove();

    // MORE STUFF NEEDED
}

/** Remove the loading spinner and update the button used to fetch data. */

function hideLoadingView() {
}

/** Start game:
 *
 * - get random category Ids
 * - get data for each category
 * - create HTML table
 * */

async function setupAndStart() {
    const randomIds = getCategoryIds();
    const newTable = $('<table>');
    body.append(newTable);
    fillTable();

}

// Adding Start button
const startBtn = $('<button></button>').text('Start');
startBtn.on('click', setupAndStart);
body.append(startBtn);

/** On click of start / restart button, set up game. */

const restartBtn = $('<button></button>').text('Restart');
    restartBtn.on('click', function(){
        $('table').remove();
        setupAndStart();
        if(startBtn){
            startBtn.remove()
        }
    })
startBtn.on('click', function(){
    body.append(restartBtn);
})
// TODO

/** On page load, add event handler for clicking clues */

// TODO

getCategoryIds();
