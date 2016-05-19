var fs=require("fs");

fs.createReadStream("music.mp3").pipe(fs.createWriteStream("pipe_copy_music.mp3"))