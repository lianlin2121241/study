var fs=require("fs");
var source=fs.readFileSync("music.mp3");
fs.writeFileSync("stream_copy_music.mp3",source);