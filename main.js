import {solids, polyhedra, models} from './model.js';
import {loadObj, edgeList} from './loader.js';
import * as g from './render.js';

const ww = 500, wh = 500;
const canvas = document.getElementById('canv');
const ctx = canvas.getContext('2d');
canvas.width = ww; canvas.height = wh;

let obj = loadObj(Object.values(polyhedra)[2], 1.4);
let obj_v = obj.vertices.v;
let obj_i = obj.indices.v;
obj_i = edgeList(obj_i);
console.log(obj_i.length);

let mouse = {x:0,y:0};
canvas.onmousemove = (e)=>{
    mouse.x = (2.*e.clientX-ww)/wh;
    mouse.y = (2.*e.clientY-wh)/ww;
}

let run = true;
document.body.onkeydown = (e)=>{
    if(e.key === " ") run = !run;
}

let rot = g.create_rot(.02, -0.03, -0.014);
obj_v = g.mat_mul_4(obj_v, g.create_rot(0.2, -0.5, 0.7));

let translate = [[1,0,0,0],[0,1,0,0],[0,0,1,0],[mouse.x,mouse.y,0,1]];
let proj = g.create_proj(.7, .3, .3);

const colors = { bkgd: 'darkslateblue', fill: 'darkslateblue', stroke: 'black' };
let scene = g.create_canvas_scene(ctx, ww, wh, colors, obj_v, obj_i, rot, translate, null, proj);

let t = 0;
window.setInterval(()=>{
    if(run){
        translate[3][0] = mouse.x*3;
        translate[3][1] = mouse.y*3; 
        translate[3][2] = 2;  
        scene.v_mat = g.lookAt( [-mouse.x*5, -mouse.y*5, -1.], [0,0, .5], .0);
        g.canvasrender(scene, (t++)*.01);
    }
}, 30);