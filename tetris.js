//a completer: faire des tetrimino de 4 briques(a essayer: new id=8 ????)
//a ajouter: rotation des tetriminos, compteur de points, musique, messages (game over..)


var row = 22 //hauteur de la grille ([0] a [21])
var column = 10 //largeur de la grille ([0] a [9])
var cyan = "#00ffff"
var yellow = "#ffff00"
var purple = "#ff00ff"
var orange = "#ff8800"
var blue = "#0000ff"
var red = "#ff0000"
var green = "#00ff00"
var black = "#000000"
var completed_line = 0 //compteur de brique presente a chaque ligne
var tetris_plan = [
    ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0']
]

var tab_rotation = [
    ["w14", "w15", "w00", "w01", "w02"],
    ["w13", "v07", "v00", "v01", "w03"],
    ["w12", "v06", "000", "v02", "w04"],
    ["w11", "v05", "v04", "v03", "w05"],
    ["w10", "w09", "w08", "w07", "w06"],
]
var tab_rotation_tetrimino = [
    ["0", "0", "0", "0", "0"],
    ["0", "0", "0", "0", "0"],
    ["0", "0", "0", "0", "0"],
    ["0", "0", "0", "0", "0"],
    ["0", "0", "0", "0", "0"]
]
var new_tab_rotation_tetrimino = [
    ["0", "0", "0", "0", "0"],
    ["0", "0", "0", "0", "0"],
    ["0", "0", "0", "0", "0"],
    ["0", "0", "0", "0", "0"],
    ["0", "0", "0", "0", "0"]
]
var circle_v = ["v00", "v01", "v02", "v03", "v04", "v05", "v06", "v07"]
var circle_w = ["w00", "w01", "w02", "w03", "w04", "w05", "w06", "w07", "w08", "w09", "w10", "w11", "w12", "w13", "w14", "w15"]

var circle_v_tetrimino = ["", "", "", "", "", "", "", ""]
var circle_w_tetrimino = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""]

function orient_tetrimino() {
    for (x = (tetrimino.pos_x - 2); x <= (tetrimino.pos_x + 2); x++) {
        for (y = (tetrimino.pos_y - 2); y <= (tetrimino.pos_y + 2); y++) {
            if ((x > 0) && (y > 0)) {
                if (tetris_plan[x][y] == "8") {
                    console.log("block en: x" + x + " et en y" + y)
                    tab_rotation_tetrimino[x][y-2]="8"
                    
                }
            }
            else{
                console.log("nope")
            }
        }
    }
    console.log(tab_rotation_tetrimino)
    var origMatrix = tab_rotation_tetrimino.slice();
    for(var i=0; i < tab_rotation_tetrimino.length; i++) {
        // Map each row entry to its rotated value
        var row = tab_rotation_tetrimino[i].map(function(x, j) {
            var k = (tab_rotation_tetrimino.length - 1) - j;
            return origMatrix[k][i];
        });
        tab_rotation_tetrimino[i] = row;
    }
    console.log(tab_rotation_tetrimino)
    for (x = (tetrimino.pos_x - 2); x <= (tetrimino.pos_x + 2); x++) {
        for (y = (tetrimino.pos_y - 2); y <= (tetrimino.pos_y + 2); y++) {
            tetris_plan[x][y+2]=tab_rotation_tetrimino[x][y]
        }
    }
    generate_scene()

}




function scan_tableau() {
    console.log(tetris_plan)
}

//se lace en debut de partie
document.addEventListener('DOMContentLoaded', generate_tetrimino, false)

//scanner pour determiner si une ligne est complete
function scan_line() {
    for (x = 0; x <= 21; x++) {
        for (y = 0; y <= 9; y++) {
            if (tetris_plan[x][y] != 0) {
                completed_line += 1
            }

        }
        console.log("completed line= " + completed_line)
        //la supprimer si 10 briques sont présente
        if (completed_line == 10) {
            for (y = 0; y <= 9; y++) {
                tetris_plan[x][y] = 0
            }
            //decaler le reste de la grille vers le bas
            console.log("ligne " + x + " supprimée")
            for (x_scan = x; x_scan != 1; x_scan--) {
                for (y_scan = 0; y_scan <= 9; y_scan++) {
                    tetris_plan[x_scan][y_scan] = tetris_plan[x_scan - 1][y_scan]
                }
            }
            generate_scene()
        }
        completed_line = 0
    }
}

//detection de la touche du clavier
function move(event) {
    var unicode = event.wich || event.keyCode
    if (unicode == 122) {
        move_up()
    }
    if (unicode == 100) {
        move_right()
    }
    if (unicode == 115) {
        move_down()
    }
    if (unicode == 113) {
        move_left()
    }
    //console.log("touche pressée: " + unicode)
}
function move_left() {
    if ((tetrimino.pos_y != "0") && (tetrimino.pos_y1 != "0") && (tetrimino.pos_y2 != "0") && (tetrimino.pos_y3 != "0") && (tetris_plan[tetrimino.pos_x][tetrimino.pos_y - 1] == "0" || tetris_plan[tetrimino.pos_x][tetrimino.pos_y - 1] == "8") && (tetris_plan[tetrimino.pos_x1][tetrimino.pos_y1 - 1] == "0" || tetris_plan[tetrimino.pos_x1][tetrimino.pos_y1 - 1] == "8") && (tetris_plan[tetrimino.pos_x2][tetrimino.pos_y2 - 1] == "0" || tetris_plan[tetrimino.pos_x2][tetrimino.pos_y2 - 1] == "8") && (tetris_plan[tetrimino.pos_x3][tetrimino.pos_y3 - 1] == "0" || tetris_plan[tetrimino.pos_x3][tetrimino.pos_y3 - 1] == "8")) {
        tetris_plan[tetrimino.pos_x][tetrimino.pos_y] = "0"
        tetris_plan[tetrimino.pos_x1][tetrimino.pos_y1] = "0"
        tetris_plan[tetrimino.pos_x2][tetrimino.pos_y2] = "0"
        tetris_plan[tetrimino.pos_x3][tetrimino.pos_y3] = "0"
        tetris_plan[tetrimino.pos_x][tetrimino.pos_y - 1] = tetrimino.id
        tetris_plan[tetrimino.pos_x1][tetrimino.pos_y1 - 1] = tetrimino.id
        tetris_plan[tetrimino.pos_x2][tetrimino.pos_y2 - 1] = tetrimino.id
        tetris_plan[tetrimino.pos_x3][tetrimino.pos_y3 - 1] = tetrimino.id
        tetrimino.pos_y -= 1
        tetrimino.pos_y1 -= 1
        tetrimino.pos_y2 -= 1
        tetrimino.pos_y3 -= 1
        generate_scene()
    }
}

function move_up() {
    if ((tetrimino.pos_x != "0") && (tetrimino.pos_x1 != "0") && (tetrimino.pos_x2 != "0") && (tetrimino.pos_x3 != "0") && (tetris_plan[tetrimino.pos_x - 1][tetrimino.pos_y] == "0" || tetris_plan[tetrimino.pos_x - 1][tetrimino.pos_y] == "8") && (tetris_plan[tetrimino.pos_x1 - 1][tetrimino.pos_y1] == "0" || tetris_plan[tetrimino.pos_x1 - 1][tetrimino.pos_y1] == "8") && (tetris_plan[tetrimino.pos_x2 - 1][tetrimino.pos_y2] == "0" || tetris_plan[tetrimino.pos_x2 - 1][tetrimino.pos_y2] == "8") && (tetris_plan[tetrimino.pos_x3 - 1][tetrimino.pos_y3] == "0" || tetris_plan[tetrimino.pos_x3 - 1][tetrimino.pos_y3] == "8")) {
        tetris_plan[tetrimino.pos_x][tetrimino.pos_y] = '0'
        tetris_plan[tetrimino.pos_x1][tetrimino.pos_y1] = '0'
        tetris_plan[tetrimino.pos_x2][tetrimino.pos_y2] = '0'
        tetris_plan[tetrimino.pos_x3][tetrimino.pos_y3] = '0'
        tetris_plan[tetrimino.pos_x - 1][tetrimino.pos_y] = tetrimino.id
        tetris_plan[tetrimino.pos_x1 - 1][tetrimino.pos_y1] = tetrimino.id
        tetris_plan[tetrimino.pos_x2 - 1][tetrimino.pos_y2] = tetrimino.id
        tetris_plan[tetrimino.pos_x3 - 1][tetrimino.pos_y3] = tetrimino.id
        tetrimino.pos_x -= 1
        tetrimino.pos_x1 -= 1
        tetrimino.pos_x2 -= 1
        tetrimino.pos_x3 -= 1
        generate_scene()
    }
}
function move_right() {
    if ((tetrimino.pos_y != "9") && (tetrimino.pos_y1 != "9") && (tetrimino.pos_y2 != "9") && (tetrimino.pos_y3 != "9") && (tetris_plan[tetrimino.pos_x][tetrimino.pos_y + 1] == "0" || tetris_plan[tetrimino.pos_x][tetrimino.pos_y + 1] == "8") && (tetris_plan[tetrimino.pos_x1][tetrimino.pos_y1 + 1] == "0" || tetris_plan[tetrimino.pos_x1][tetrimino.pos_y1 + 1] == "8") && (tetris_plan[tetrimino.pos_x2][tetrimino.pos_y2 + 1] == "0" || tetris_plan[tetrimino.pos_x2][tetrimino.pos_y2 + 1] == "8") && (tetris_plan[tetrimino.pos_x3][tetrimino.pos_y3 + 1] == "0" || tetris_plan[tetrimino.pos_x3][tetrimino.pos_y3 + 1] == "8")) {
        tetris_plan[tetrimino.pos_x][tetrimino.pos_y] = '0'
        tetris_plan[tetrimino.pos_x1][tetrimino.pos_y1] = '0'
        tetris_plan[tetrimino.pos_x2][tetrimino.pos_y2] = '0'
        tetris_plan[tetrimino.pos_x3][tetrimino.pos_y3] = '0'
        tetris_plan[tetrimino.pos_x][tetrimino.pos_y + 1] = tetrimino.id
        tetris_plan[tetrimino.pos_x1][tetrimino.pos_y1 + 1] = tetrimino.id
        tetris_plan[tetrimino.pos_x2][tetrimino.pos_y2 + 1] = tetrimino.id
        tetris_plan[tetrimino.pos_x3][tetrimino.pos_y3 + 1] = tetrimino.id
        tetrimino.pos_y += 1
        tetrimino.pos_y1 += 1
        tetrimino.pos_y2 += 1
        tetrimino.pos_y3 += 1
        generate_scene()
    }
}
// en cas de deplacement vers le bas impossible, on considere que la piece est posée
function move_down() {
    if ((tetrimino.pos_x != "21") && (tetrimino.pos_x1 != "21") && (tetrimino.pos_x2 != "21") && (tetrimino.pos_x3 != "21") && (tetris_plan[tetrimino.pos_x + 1][tetrimino.pos_y] == "0" || tetris_plan[tetrimino.pos_x + 1][tetrimino.pos_y] == "8") && (tetris_plan[tetrimino.pos_x1 + 1][tetrimino.pos_y1] == "0" || tetris_plan[tetrimino.pos_x1 + 1][tetrimino.pos_y1] == "8") && (tetris_plan[tetrimino.pos_x2 + 1][tetrimino.pos_y2] == "0" || tetris_plan[tetrimino.pos_x2 + 1][tetrimino.pos_y2] == "8") && (tetris_plan[tetrimino.pos_x3 + 1][tetrimino.pos_y3] == "0" || tetris_plan[tetrimino.pos_x3 + 1][tetrimino.pos_y3] == "8")) {
        tetris_plan[tetrimino.pos_x][tetrimino.pos_y] = "0"
        tetris_plan[tetrimino.pos_x1][tetrimino.pos_y1] = "0"
        tetris_plan[tetrimino.pos_x2][tetrimino.pos_y2] = "0"
        tetris_plan[tetrimino.pos_x3][tetrimino.pos_y3] = "0"
        tetris_plan[tetrimino.pos_x + 1][tetrimino.pos_y] = tetrimino.id
        tetris_plan[tetrimino.pos_x1 + 1][tetrimino.pos_y1] = tetrimino.id
        tetris_plan[tetrimino.pos_x2 + 1][tetrimino.pos_y2] = tetrimino.id
        tetris_plan[tetrimino.pos_x3 + 1][tetrimino.pos_y3] = tetrimino.id
        tetrimino.pos_x += 1
        tetrimino.pos_x1 += 1
        tetrimino.pos_x2 += 1
        tetrimino.pos_x3 += 1
        generate_scene()
    }
    else {
        console.log("tetrimino.id= " + tetrimino.id + " tetrimino.old_id: " + tetrimino.old_id)
        tetrimino.id = tetrimino.old_id
        tetris_plan[tetrimino.pos_x][tetrimino.pos_y] = tetrimino.id
        tetris_plan[tetrimino.pos_x1][tetrimino.pos_y1] = tetrimino.id
        tetris_plan[tetrimino.pos_x2][tetrimino.pos_y2] = tetrimino.id
        tetris_plan[tetrimino.pos_x3][tetrimino.pos_y3] = tetrimino.id

        console.log("tetrimino.id= " + tetrimino.id + " tetrimino.old_id: " + tetrimino.old_id)
        scan_line()
        if (tetrimino.pos_x == 1 && tetrimino.pos_y == 4) {
            perdu()
        }
        else {
            generate_tetrimino()
        }

    }
}


//affichage de la grille en fonction des données du tableau
function generate_scene() {
    sky(0, 0, 240, 528)
    for (y = 0; y <= 9; y++) {
        for (x = 0; x <= 21; x++) {
            if ((tetris_plan[x][y]) == "1") {
                brick((x * 24), (y * 24), cyan);
            }
            if ((tetris_plan[x][y]) == "2") {
                brick((x * 24), (y * 24), yellow)
            }
            if ((tetris_plan[x][y]) == "3") {
                brick((x * 24), (y * 24), purple)
            }
            if ((tetris_plan[x][y]) == "4") {
                brick((x * 24), (y * 24), orange)
            }
            if ((tetris_plan[x][y]) == "5") {
                brick((x * 24), (y * 24), blue)
            }
            if ((tetris_plan[x][y]) == "6") {
                brick((x * 24), (y * 24), red)
            }
            if ((tetris_plan[x][y]) == "7") {
                brick((x * 24), (y * 24), green)
            }
            if ((tetris_plan[x][y]) == "8") {
                if (tetrimino.old_id == 1) { temp_color = cyan }
                if (tetrimino.old_id == 2) { temp_color = yellow }
                if (tetrimino.old_id == 3) { temp_color = purple }
                if (tetrimino.old_id == 4) { temp_color = orange }
                if (tetrimino.old_id == 5) { temp_color = blue }
                if (tetrimino.old_id == 6) { temp_color = red }
                if (tetrimino.old_id == 7) { temp_color = green }
                brick((x * 24), (y * 24), temp_color)
            }
        }
    }
}

//generateur de brique 24px*24px
function brick(y, x, color) {
    var canvas = document.getElementById('mon_canvas');
    if (!canvas) {
        alert("Impossible de récupérer le canvas");
        return;
    }
    var context = canvas.getContext('2d');
    if (!context) {
        alert("Impossible de récupérer le context du canvas");
        return;
    }
    context.beginPath()
    context.moveTo(y, x)
    context.fillStyle = color
    context.fillRect(x, y, 24, 24)
    context.strokeRect(x, y, 24, 24)
    context.closePath
}

// un tetrimino standard
var tetrimino = {
    pos_x: 1,
    pos_x1: 1,
    pos_x2: 1,
    pos_x3: 1,
    pos_y: 4,
    pos_y1: 3,
    pos_y2: 5,
    pos_y3: 6,
    id: "8",
    old_id: 7,
    orient: "right"
}

//un nouveau tetrimino aléatoire est crée avec une position et orientation de départ fixes
function generate_tetrimino() {
    tetrimino.old_id = (Math.ceil(Math.random() * Math.floor(7)))
    //tetrimino.old_id = 1
    tetrimino.id = "8"
    tetrimino.pos_x = 2
    tetrimino.pos_y = 4
    tetrimino.orient = "right"
    if (tetrimino.old_id == 1) { tetrimino.pos_x1 = 2; tetrimino.pos_x2 = 2; tetrimino.pos_x3 = 2; tetrimino.pos_y1 = 3; tetrimino.pos_y2 = 5; tetrimino.pos_y3 = 6 }
    if (tetrimino.old_id == 2) { tetrimino.pos_x1 = 2; tetrimino.pos_x2 = 3; tetrimino.pos_x3 = 3; tetrimino.pos_y1 = 5; tetrimino.pos_y2 = 4; tetrimino.pos_y3 = 5 }
    if (tetrimino.old_id == 3) { tetrimino.pos_x1 = 2; tetrimino.pos_x2 = 2; tetrimino.pos_x3 = 1; tetrimino.pos_y1 = 3; tetrimino.pos_y2 = 5; tetrimino.pos_y3 = 4 }
    if (tetrimino.old_id == 4) { tetrimino.pos_x1 = 2; tetrimino.pos_x2 = 2; tetrimino.pos_x3 = 3; tetrimino.pos_y1 = 3; tetrimino.pos_y2 = 5; tetrimino.pos_y3 = 3 }
    if (tetrimino.old_id == 5) { tetrimino.pos_x1 = 2; tetrimino.pos_x2 = 2; tetrimino.pos_x3 = 3; tetrimino.pos_y1 = 3; tetrimino.pos_y2 = 5; tetrimino.pos_y3 = 5 }
    if (tetrimino.old_id == 6) { tetrimino.pos_x1 = 2; tetrimino.pos_x2 = 3; tetrimino.pos_x3 = 3; tetrimino.pos_y1 = 3; tetrimino.pos_y2 = 4; tetrimino.pos_y3 = 5 }
    if (tetrimino.old_id == 7) { tetrimino.pos_x1 = 2; tetrimino.pos_x2 = 3; tetrimino.pos_x3 = 3; tetrimino.pos_y1 = 5; tetrimino.pos_y2 = 3; tetrimino.pos_y3 = 4 }
    tetris_plan[tetrimino.pos_x][tetrimino.pos_y] = tetrimino.id
    tetris_plan[tetrimino.pos_x1][tetrimino.pos_y1] = tetrimino.id
    tetris_plan[tetrimino.pos_x2][tetrimino.pos_y2] = tetrimino.id
    tetris_plan[tetrimino.pos_x3][tetrimino.pos_y3] = tetrimino.id
    generate_scene()
}

//fonction poubelle pour faire des tests
function describe_tetrimino() {
    //console.log("nouveau tetrimino créé: pos_x:" + tetrimino.pos_x + ", pos_ y:" + tetrimino.pos_y + ", id:" + tetrimino.id + ", orient:" + tetrimino.orient)
    console.log(" tetrimino créé: pos_x:" + tetrimino.pos_x + ", pos_ y:" + tetrimino.pos_y + ", id:" + tetrimino.id + ", orient:" + tetrimino.orient)
}

//generateur de fond de la grille(ici du gris)
function sky(x_debut, y_debut, x_fin, y_fin) {
    var canvas = document.getElementById('mon_canvas');
    if (!canvas) {
        alert("Impossible de récupérer le canvas");
        return;
    }
    var context = canvas.getContext('2d');
    if (!context) {
        alert("Impossible de récupérer le context du canvas");
        return;
    }
    context.beginPath()
    context.moveTo(x_debut, y_debut)
    context.fillStyle = "#d3d3d3"
    context.fillRect(x_debut, y_debut, x_fin, y_fin)
    context.closePath()
}

//a activer en cas de partie perdue(a completer) nb: eviter le declenchement de fonction supplémentaire
//ajouter la desactivation de fonction ou d'input. a voir....
function perdu() {
    console.log("vous avez perdu")
}

function transposeArray(array, arrayLength) {
    var newArray = [];
    for (var i = 0; i < array.length; i++) {
        newArray.push([]);
    };

    for (var i = 0; i < array.length; i++) {
        for (var j = 0; j < arrayLength; j++) {
            newArray[j].push(array[i][j]);
        };
    };

    return newArray;
}