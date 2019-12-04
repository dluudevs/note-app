const fs = require('fs')
const chalk = require('chalk')

const readNote = title => {
    const notes = loadNotes()
    // if match is found, index item is returned
    const note = notes.find(note => note.title === title)

    if (note){
        console.log(`${chalk.yellow('Title:')} ${note.title}`) 
        console.log(`${chalk.yellow('Description:')} ${note.body}`)
    } else {
        console.log(chalk.red('Error: note not found'))
    }
}

const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.inverse('Your Notes: '))
    notes.forEach(note => console.log(chalk.cyan(note.title)))
}

const removeNote = title => {
    const notes = loadNotes()
    const filtered = notes.filter(note => note.title !== title)

    if(notes.length > filtered.length){
        console.log(chalk.green.inverse('Note removed!'))
        saveNotes(filtered)
    } else {
        console.log(chalk.red.inverse('No note found!'))
    }
}

const addNote = (title, body) => {
    // this will not override existing notes, because loadNotes returns an array and the new note is added to the array
    // the array is updated with the new note before overwriting the file (similar to React state)
    const notes = loadNotes()
    // returns element if found, otherwise undefined is returned
    const duplicateNote = notes.find(note => note.title === title)

    if (!duplicateNote){
        notes.push({
            title,
            body    
        })
        saveNotes(notes)
        console.log(chalk.green.inverse('New note added'))
    } else {
        console.log(chalk.red.inverse('Note title taken'))
    }
}

const saveNotes = (notes) => {
    // can stringfy because JSON is object or array in string
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try {
        // Must have try block. An error is thrown if the file doesn't exist (this cannot be handled by an if statement)
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        // if file is not found, return an empty array. same result if the file existed and was empty
        // this is crucial as it allows this function to return something other functions can work with (eg., adding a new note to the array)
        return []
    }
}

module.exports = {
    addNote,
    removeNote,
    listNotes,
    readNote
}