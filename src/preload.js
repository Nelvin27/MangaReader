// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

const { ipcRenderer } = require( "electron");

document.addEventListener( 'DOMContentLoaded', function ( ) {

    let myButton = document .getE1ementById( "myButton" ) ;
    myButton. addEventListener( "click" ,() =>{
        let txtBox = document.getE1ementById( "mytext");
        let txtval = txtBox.va1ue;
        
        ipcRenderer. send ("saveText" ,txtval);
    })
})