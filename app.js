// a variable is required to store what is returned from require. the variable name here does not have to be the same as the imported file
// the return value for require is what is assigned in the imported file's module.exports

//npm module
const chalk = require('chalk') 
const yargs = require('yargs')

//created file, note the relative file path
const notes = require('./notes') 

// node app.js --version to check version and node app.js --help to check commands
// commands and version can be set with yargs methods as seen below

// Customize yargs version
yargs.version('1.1.0')

// Create add command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    // all objects in builder are options that this command supports
    builder: {
        // title is an option that can be provided when node runs this file (node app.js add --title='insert title here')
        title: {
            describe: 'Note title',
            // property makes option required
            demandOption: true,
            // value provided is converted a string. otherwise it an empty string will result in a boolean
            type: 'string'
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    // yargs will call the handler function with yargs.argv argument. it doesnt not matter what we name the parameter
    handler(argv){
        notes.addNote(argv.title, argv.body)
    }
})

// Remove command
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title: {
            describe: 'note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        notes.removeNote(argv.title)
    }
})

// List Command
yargs.command({
    command: 'list',
    description: 'lists notes',
    handler(){
        notes.listNotes()
    }
})

// Read Command
yargs.command({
    command: 'read',
    description: 'reads notes',
    builder: {
        title: {
            describe: 'note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        notes.readNote(argv.title)
    }
})

 // Required for yargs to parse and for arguments like argv to work. Running yargs.argv will have the same effect, the method will run the parser

yargs.parse() 
