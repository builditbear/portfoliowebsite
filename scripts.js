animateConsoleText(['me@you ~ % Hello, employer!', 
                    'I\'m Brandon Chavez, AKA Build-It Bear', 
                    'aspiring Web and Mobile App Developer!'], '#text');

// Terminal Text Animation, based on code found at https://codepen.io/Tbgse/pen/dYaJyJ by Tobias.
// Default color value is Seashell.
function animateConsoleText(words, text_element_id, color ='#FFF5EE') {
    // Functions as a mutex lock - if set to true, the other callback's that modify data are blocked from executing.
    let waiting = false
    let letterCount = 1;
    let printingForward = true
    let terminal_cursor_visible = true;
    let terminal_cursor = document.querySelector('#terminal_cursor');
    let target = document.querySelector(text_element_id);
    // Set the color of the target span to be the first entry in the color list.
    target.setAttribute('style','color:' + color);
    window.setInterval(() => {
        // If not waiting, and all letters have been deleted, reset everything to start again.
        if(letterCount === 0 && waiting === false) {
            waiting = true;
            target.innerHTML = words[0].substring(0, letterCount);
            window.setTimeout(() => {
                // cycle to the next color to be used and the next phrase (word) to be printed.
                // Add 1 to lettercount, resetting lettercount.
                let oldPhrase = words.shift();
                words.push(oldPhrase);
                printingForward = true;
                letterCount++;
                waiting = false;
                target.innerHTML = '';
            }, 1000);
        // If no other callback is modifying data, and we've finished printing the current phrase (word)...
        } else if(letterCount === words[0].length + 1 && waiting === false) {
            waiting = true;
            window.setTimeout(() => {
                printingForward = false;
                letterCount--
                waiting = false;
            }, 1000)
        } else if(waiting === false) {
            // Updates the visible portion of the current phrase (appearing to add or delete a character each time).
            // The direction is dictated by the current value of x.
            target.innerHTML = words[0].substring(0, letterCount);
            printingForward ? letterCount++ : letterCount--;
        }
    }, 45);
    // Asnchronously make the cursor visible and invisible at regular intervals.
    window.setInterval(() => {
        if(terminal_cursor_visible === true) {
            terminal_cursor.className = 'text_cursor hidden_by_opacity';
            terminal_cursor_visible = false;
        } else {
            terminal_cursor.className = 'text_cursor';
            terminal_cursor_visible = true;
        }
    }, 400);
}