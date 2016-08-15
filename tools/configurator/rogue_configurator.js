window.onload=function(){
// Rogue Robotics module configurator

// Build the output each time an input control is clicked

/*! @source http://purl.eligrey.com/github/FileSaver.js/blob/master/FileSaver.js */
var saveAs=saveAs||function(e){"use strict";if(typeof e==="undefined"||typeof navigator!=="undefined"&&/MSIE [1-9]\./.test(navigator.userAgent)){return}var t=e.document,n=function(){return e.URL||e.webkitURL||e},r=t.createElementNS("http://www.w3.org/1999/xhtml","a"),o="download"in r,i=function(e){var t=new MouseEvent("click");e.dispatchEvent(t)},a=/constructor/i.test(e.HTMLElement),f=/CriOS\/[\d]+/.test(navigator.userAgent),u=function(t){(e.setImmediate||e.setTimeout)(function(){throw t},0)},d="application/octet-stream",s=1e3*40,c=function(e){var t=function(){if(typeof e==="string"){n().revokeObjectURL(e)}else{e.remove()}};setTimeout(t,s)},l=function(e,t,n){t=[].concat(t);var r=t.length;while(r--){var o=e["on"+t[r]];if(typeof o==="function"){try{o.call(e,n||e)}catch(i){u(i)}}}},p=function(e){if(/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type)){return new Blob([String.fromCharCode(65279),e],{type:e.type})}return e},v=function(t,u,s){if(!s){t=p(t)}var v=this,w=t.type,m=w===d,y,h=function(){l(v,"writestart progress write writeend".split(" "))},S=function(){if((f||m&&a)&&e.FileReader){var r=new FileReader;r.onloadend=function(){var t=f?r.result:r.result.replace(/^data:[^;]*;/,"data:attachment/file;");var n=e.open(t,"_blank");if(!n)e.location.href=t;t=undefined;v.readyState=v.DONE;h()};r.readAsDataURL(t);v.readyState=v.INIT;return}if(!y){y=n().createObjectURL(t)}if(m){e.location.href=y}else{var o=e.open(y,"_blank");if(!o){e.location.href=y}}v.readyState=v.DONE;h();c(y)};v.readyState=v.INIT;if(o){y=n().createObjectURL(t);setTimeout(function(){r.href=y;r.download=u;i(r);h();c(y);v.readyState=v.DONE});return}S()},w=v.prototype,m=function(e,t,n){return new v(e,t||e.name||"download",n)};if(typeof navigator!=="undefined"&&navigator.msSaveOrOpenBlob){return function(e,t,n){t=t||e.name||"download";if(!n){e=p(e)}return navigator.msSaveOrOpenBlob(e,t)}}w.abort=function(){};w.readyState=w.INIT=0;w.WRITING=1;w.DONE=2;w.error=w.onwritestart=w.onprogress=w.onwrite=w.onabort=w.onerror=w.onwriteend=null;return m}(typeof self!=="undefined"&&self||typeof window!=="undefined"&&window||this.content);if(typeof module!=="undefined"&&module.exports){module.exports.saveAs=saveAs}else if(typeof define!=="undefined"&&define!==null&&define.amd!==null){define([],function(){return saveAs})}


// Flash the output to show the change
// from: http://jsfiddle.net/9sRTt/
/*
function animateHighlight(obj, highlightColor, duration, bgColor) {
    var highlightBg = highlightColor || "#FF9999";
    var animateMs = duration || 1000;
    var originalBg = bgColor || "#ffffff"; //obj.css("backgroundColor");
    console.log(highlightBg);
    console.log(animateMs);
    console.log(originalBg);
    obj.stop().css("background-color", highlightBg).animate({backgroundColor: originalBg}, animateMs);
};
*/

function flashObj(obj)
{
  if (obj && !obj.hasClass("flash"))
  {
    obj.addClass("flash");
    // Use a timeout to remove the class
    setTimeout(function () {
      obj.removeClass("flash");
    }, 500);
  }
}

function build8bit(name)
{
  var newValue = 0;
  for (var i = 0; i < 8; i++)
  {
    if ($("input[name=" + name + "-" + i + "]").prop("checked"))
    {
      newValue += 1 << i;
    }
  }
  return newValue;
}

function constrainControl(obj, min, max)
{
  if (obj.val() < min)
  {
    obj.val(min);
  }
  else if (obj.val() > max)
  {
    obj.val(max);
  }
  obj.val(obj.val().replace(/^0+(?!\.|$)/, ''));  // Get rid of leading zeroes
}

function constrainModuleSelection()
{
  var moduleSelection = $("select[name=moduleSelection]").val();

  if (moduleSelection !== "UMMC" && moduleSelection !== "UMP3" && moduleSelection !== "RMP3")
  {
    moduleSelection = "RMP3";
  }
  return moduleSelection;
}

function setOutputText(obj, newText)
{
  if (obj.text() !== newText)
  {
    obj.text(newText);
    flashObj(obj);
  }
}

function updateOutput()
{
  var moduleSelection;

  var newInputStyle;
  var newFileOffset;
  var newHBI;
  var newDebounce;
  var newInputPolarity;
  var newNonStop;

  var newStartupVolume;
  var newLoopCount;
  var newBoost;

  var newCopyStyle;
  var newLineEnding;
  var newWriteTimeout;
  var newDirStyle;

  var newDataRate;
  var newPromptChar;
  var newResponseDelay;

  var outputString = "";

  var currentControl;

  moduleSelection = constrainModuleSelection();
  switch (moduleSelection)
  {
    case "UMMC":
      // Hide most of the fieldsets
      $("#inputSettings").slideUp("slow");
      $("#audioSettings").slideUp("slow");
      break;
    case "UMP3":
    case "RMP3":  // Default to MP3 modules
    default:
      $("#inputSettings").slideDown("slow");
      $("#audioSettings").slideDown("slow");
      break;
  }

  // Let's go fishing
  
  if (moduleSelection === "RMP3" || moduleSelection === "UMP3")
  {
    // Input Style
    newInputStyle = "S" + $("input[name=inputStyle]:checked").val();
    setOutputText($("#outputInputStyle"), newInputStyle);

    // File Offset
    currentControl = $("input[name=fileOffset]");
    constrainControl(currentControl, 0, 9872);  // FYI: 9999 - 127
    newFileOffset = "N" + currentControl.val();
    setOutputText($("#outputFileOffset"), newFileOffset);

    // Hardware Busy Indicator
    newHBI = "H" + ($("input[name=hardwareBusyIndicator]").prop("checked") ? "1" : "0");
    setOutputText($("#outputHBI"), newHBI);

    // Debounce
    newDebounce = "M" + ($("input[name=debounce]").prop("checked") ? "1" : "0");
    setOutputText($("#outputDebounce"), newDebounce);

    // Input Polarity
    newInputPolarity = "A" + build8bit("inputPolarity");
    setOutputText($("#outputInputPolarity"), newInputPolarity);

    // Non-Stop
    newNonStop = "U" + build8bit("nonStop");
    setOutputText($("#outputNonStop"), newNonStop);

    // Volume
    // TODO: use <progress> element?
    currentControl = $("input[name=startupVolume]");
    constrainControl(currentControl, 0, 255);
    newStartupVolume = "V" + currentControl.val();
    $("#volumeDisplay").text((currentControl.val() * -0.5).toFixed(1));
    setOutputText($("#outputStartupVolume"), newStartupVolume);

    // Loop Count
    currentControl = $("input[name=loopCount]");
    constrainControl(currentControl, 0, 255);
    newLoopCount = "O" + currentControl.val();
    setOutputText($("#outputLoopCount"), newLoopCount);

    // Boost
    if ($("select[name=trebleBoost]").val() === '0' && $("select[name=bassBoost]").val() === '0')
    {
      newBoost = "B0";
    }
    else
    {
      newBoost = "B" + (($("select[name=trebleBoost]").val() << 12)
                     + ($("select[name=trebleFrequency]").val() << 8)
                     + ($("select[name=bassBoost]").val() << 4)
                     + ($("select[name=bassFrequency]").val() << 0));
    }
    setOutputText($("#outputBoost"), newBoost);
  }

  // Copy Style
  newCopyStyle = "C" + $("input[name=copyStyle]:checked").val();
  setOutputText($("#outputCopyStyle"), newCopyStyle);

  // Line Ending
  newLineEnding = "E" + $("input[name=lineEnding]:checked").val();
  setOutputText($("#outputLineEnding"), newLineEnding);

  // Write Time-out
  currentControl = $("input[name=writeTimeout]");
  constrainControl(currentControl, 0, 255);
  newWriteTimeout = "T" + currentControl.val();
  if (currentControl.val() == 0)
  {
    $("#displayWriteTimeout").text("--");
  }
  else
  {
    $("#displayWriteTimeout").text(currentControl.val() * 10);
  }
  setOutputText($("#outputWriteTimeout"), newWriteTimeout);

  // Directory Style
  newDirStyle = "L" + $("input[name=dirStyle]:checked").val();
  setOutputText($("#outputDirStyle"), newDirStyle);

  // Data Rate
  newDataRate = "D" + $("select[name=dataRate]").val();
  setOutputText($("#outputDataRate"), newDataRate);

  // Prompt Char
  currentControl = $("input[name=promptChar]");
  constrainControl(currentControl, 0, 255);
  // display the character
  if (currentControl.val() > 32 && currentControl.val() < 126)
  {
    $("#char").text(String.fromCharCode(currentControl.val()));
  }
  else if (currentControl.val() === 32)
  {
    $("#char").text("sp");
  }
  else
  {
    $("#char").text(currentControl.val());
  }
  newPromptChar = "P" + currentControl.val();
  setOutputText($("#outputPromptChar"), newPromptChar);
  
  // Response Delay
  currentControl = $("input[name=responseDelay]");
  constrainControl(currentControl, 0, 255);
  $("#displayResponseDelay").text(currentControl.val() * 10);
  newResponseDelay = "R" + currentControl.val();
  setOutputText($("#outputResponseDelay"), newResponseDelay);

  if (moduleSelection === "UMP3" || moduleSelection === "RMP3")
  {
    outputString += newInputStyle + "\n"
                  + newFileOffset + "\n"
                  + newHBI + "\n"
                  + newDebounce + "\n"
                  + newInputPolarity + "\n"
                  + newNonStop + "\n"
                  + newStartupVolume + "\n"
                  + newLoopCount + "\n"
                  + newBoost + "\n";
  }

  outputString += newCopyStyle + "\n"
                + newLineEnding + "\n"
                + newWriteTimeout + "\n"
                + newDirStyle + "\n"
                + newDataRate + "\n"
                + newPromptChar + "\n"
                + newResponseDelay + "\n";


  $("#output").text(outputString);
}


// Handlers
$("input").change(updateOutput);
$("select").change(updateOutput);
$("#btn-save").click(function () {
  var text = $("#output").text();
  var filename = constrainModuleSelection() + ".CFG";
  var blob = new Blob([text], {type: "text/plain;charset=utf-8"});
  saveAs(blob, filename);
});
$("#promptCharDefault").click(function (e) {
  $("input[name=promptChar]").val(62);
  updateOutput();
});
$(document).keydown(function (e) {
  var keyCode = e.keyCode || e.which;
  
  if (keyCode === 9 || keyCode === 13 || keyCode === 38 || keyCode === 40)
  {
    updateOutput();
  }
});

}
