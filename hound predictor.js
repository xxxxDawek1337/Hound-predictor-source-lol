const { MessageEmbed } = require("discord.js");
const Command = require("../Structures/Command.js");
function Accuracy() {
    var rating = Math.floor((Math.random() * 35) + 45);
    return rating;
}
function genMineSweeper(gridX = 5, gridY = 5, mines = 4) {
    if (gridX.constructor != Number) gridX = 5;
    if (gridY.constructor != Number) gridY = 5;
    if (mines.constructor != Number) mines = 4;
 
    function genGridMatrix(x = gridX, y = gridY, fill = 0) {
      let out_ = [];
 
      while (y--) {
        out_.push((new Array(x)).fill(fill));
      }
 
      return out_;
    }
 
    function getSurroundingInMatrix(arr, x, y) {
      let i = 0;
 
      if (arr[y - 1] && arr[y - 1][x - 1] == ":white_check_mark:") i++;
      if (arr[y - 1] && arr[y - 1][x] == ":white_check_mark:") i++;
      if (arr[y - 1] && arr[y - 1][x + 1] == ":white_check_mark:") i++;
      if (arr[y] && arr[y][x - 1] == ":white_check_mark:") i++;
      if (arr[y] && arr[y][x + 1] == ":white_check_mark:") i++;
 
      return ":question:";
    }
 
    function genMines(arr, x, y, mines_) {
      while (mines_--) {
       let ranX = Math.floor(Math.random() * x);
       let ranY = Math.floor(Math.random() * y);
 
       while (arr[ranY][ranX] == ":white_check_mark:") {
         ranX = Math.floor(Math.random() * x);
         ranY = Math.floor(Math.random() * y);
       }
 
       arr[ranY][ranX] = ":white_check_mark:";
      }
 
      return arr;
    }
 
    let matrix = genGridMatrix();
    matrix = genMines(matrix, gridX, gridY, mines);
    matrix = matrix.map((x1, y) => {
      return x1.map((x2, x) => {
        if (x2 != ":white_check_mark:") {
          return getSurroundingInMatrix(matrix, x, y);
        } else {
          return x2;
        }
      });
    });
 
    let allZeros = [];
 
    for (let y in matrix) {
      for (let x in matrix[y]) {
        if (matrix[y][x] == ":question:") {
          allZeros.push({
            x: x,
            y: y
          });
        }
      }
    }
 
    let ran = allZeros[Math.floor(Math.random() * allZeros.length)];
 
    if (ran && matrix[ran.y] && matrix[ran.y][ran.x]) matrix[ran.y][ran.x] = ":question:";
 
    let fullGrid = matrix.map(c => {
        return c.join("");
    }).join("\n");
 
    /*.replace(/:[^ \n:]+:/g, c => {
        return "|| " + c + " ||";
    });*/
 
    return fullGrid;
  }
 
module.exports = new Command({
    name: "mines",
//    permission: "SEND_MESSAGES",
    async run(message, args, client) {
    const embed = new MessageEmbed()
        .setTitle('Hound Predictions')
        .setColor('#000279')
        .addField('Grid', `${genMineSweeper()}`, false)
 
        .addField('Accuracy', `${Accuracy()}` + '%')
 
        .setThumbnail('https://cdn.discordapp.com/avatars/1010163026126712892/4c1d9ee4451c6c29cff1b91a6b1ad759.webp')
        .setFooter("Free @ discord.gg/houndpredictor")
    message.channel.send({ embeds: [embed]})
    }
})
 
