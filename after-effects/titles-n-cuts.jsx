const mainComp = app.project.activeItem;
const mainLayer = mainComp.layer(1);

const mainWindow = new Window("palette", "Add Title and Cut", undefined);

const groupOne = mainWindow.add("group", undefined, "groupOne");
groupOne.orientation = "column";

groupOne.add("statictext", undefined, "This script allows you to add a title and cut your video");
const titleName = groupOne.add("edittext", undefined, "Title of Video");
const titleDuration = groupOne.add("edittext", undefined, "Duration of Title");

const cutOne = groupOne.add("edittext", undefined, "Cut Point 1");
const cutTwo = groupOne.add("edittext", undefined, "Cut Point 2");

const groupTwo = mainWindow.add("group", undefined, "Buttons");
groupTwo.orientation = "row";

const startButton = groupTwo.add("button", undefined, "Start");
const cancelButton = groupTwo.add("button", undefined, "Cancel");

startButton.onClick = function(){
    app.beginUndoGroup("AddTitleCut");
    doThings();
    }

cancelButton.onClick = function(){
        mainWindow.close();
    }

function doThings(){
    const compDuration = mainComp.duration;
    const titleSeconds = parseInt(titleDuration.text);
    const cutOneSeconds = parseInt(cutOne.text);
    const cutTwoSeconds = parseInt(cutTwo.text);
    
    const titleText = mainComp.layers.addText(titleName.text);
    titleText.outPoint = titleSeconds;
    
    const middleLayer = mainLayer.duplicate();
    const topLayer = middleLayer.duplicate();
    
    mainLayer.outPoint = cutOneSeconds;
    middleLayer.inPoint = cutOneSeconds;
    middleLayer.outPoint = cutTwoSeconds;
    topLayer.inPoint = cutTwoSeconds;
    topLayer.outPoint = compDuration;
    mainWindow.close();
    app.endUndoGroup("AddTitleCut")
    
    }

mainWindow.show();