import { Component,Renderer2,HostListener,OnDestroy, ViewChild, ElementRef,AfterViewInit, OnInit } from '@angular/core';
import { HttpBackend, HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements AfterViewInit {
  title = 'drawing';
  constructor(private http: HttpClient) {}
  @ViewChild('canvas', { static: true })
 seclectionHandles=[];
 canvas : any = null;
 ctx : any = null;
 x:any;
 y:any;
 x2:any;
 y2:any;
 radiusx:any;
 radiusy:any;
 centerx:any;
 centery:any;
 flag:any=0;
 rec:any=0;sq:any=0;bor:any=0;fil:any=0;
 lin:any=0;se:any=0;
 elli:any=0;circ:any=0;
 tri:any=0;
 b:any;
 colour: string="#ffffff";
 c: string;
 width:any;
 height:any;
 isDrawing=false;
 count=1;
 shapes= new Map ();
 coordinates:number [];
 bk:any;
redoo=0;
ld=0;
undoo=0;
path="";
 ngAfterViewInit(): void {
  this.canvas = <HTMLCanvasElement> document.getElementById('canvas');
  if(this.canvas.getContext) {
    this.ctx = this.canvas.getContext('2d');
  }

  this.canvas.addEventListener('mousedown', e => {
    this.x = e.offsetX;
    this.y = e.offsetY;
    this.isDrawing = true;
  });

  this.canvas.addEventListener('mouseup', e => {
    if (this.isDrawing === true) {
      this.x2=e.offsetX;
      this.y2=e.offsetY;
      if(this.rec==1){
        this.rectangle();
      }else if(this.lin==1){
        this.line();
      }else if(this.sq==1){
        this.square();
      }else if(this.elli==1){
        this.ellipse();
      }else if(this.circ==1){
        this.circle();
      }else if(this.tri==1){
          this.triangle();
      }else if(this.se==1){
        this.select();
      }
      this.isDrawing=false;
    }
  });

}


 drawLine(context, x1, y1, x2, y2) {
  context.beginPath();
  context.strokeStyle = 'black';
  context.lineWidth = 1;
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  context.stroke();
  context.closePath();
}


///////////////////////////
rect(){
  if(this.se==1){
    //undo();
  }
  this.rec=1,this.lin=0;this.se=0; this.sq=0;this.elli=0;this.circ=0;this.tri=0;this.redoo=0;
}
li(){
  if(this.se==1){
    //undo();
  }
  this.lin=1,this.rec=0;this.se=0; this.sq=0;this.elli=0;this.circ=0;this.tri=0;this.redoo=0;
}
sel(){
  if(this.se==1){
    //undo();
  }
  this.se=1;this.lin=0,this.rec=0; this.sq=0;this.elli=0;this.circ=0;this.tri=0;this.redoo=0;
}
sqr(){
  if(this.se==1){
    //undo();
  }
  this.sq=1;this.se=0;this.lin=0,this.rec=0;this.elli=0;this.circ=0;this.tri=0;this.redoo=0;
}
ell(){
  if(this.se==1){
    //undo();
  }
  this.elli=1;this.sq=0;this.se=0;this.lin=0,this.rec=0;this.circ=0;this.tri=0;this.redoo=0;
}
cir(){
  if(this.se==1){
    //undo();
  }
  this.circ=1;this.elli=0;this.sq=0;this.se=0;this.lin=0,this.rec=0;this.tri=0;this.redoo=0;
}
tria(){
  if(this.se==1){
    //undo();
  }
  this.tri=1;this.circ=0;this.elli=0;this.sq=0;this.se=0;this.lin=0,this.rec=0;this.redoo=0;
}
////////////////////////////store function
//used to store our data in hashmap to be used when dealing with data
store(shape,color,border,x1,y1,x2,y2,){
  if(x1!=x2 &&y1!=y2){
  this.shapes.set(this.count,[shape,color,border,x1,y1,x2,y2]);
  this.back();
 // this.history.push([this.count,shape,color,border,x1,y1,x2,y2]);
   this.count++;
  }
 }
/////////////////////////////////////shapes///////////////////////

//each shape has it's own function to be drawn when it's clicked
rectangle(){
  this.ctx.beginPath();
  this.width=Math.abs(this.x-this.x2)
  this.height=Math.abs(this.y-this.y2)
  this.ctx.strokeStyle = 'black';
  this.ctx.lineWidth=2;
  this.ctx.strokeRect(Math.min(this.x,this.x2), Math.min(this.y,this.y2),this.width, this.height);
  this.isDrawing=false;
  //////////////////last added
  this.store('rectangle','none',this.ctx.strokeStyle,this.x,this.y,this.x2,this.y2);

 ///////////////////////
  console.log(this.shapes);
  console.log(this.ctx.isPointInPath(this.x2,this.y2));
  //console.log(this.history);
  this.ctx.closePath();
}

square(){

  this.ctx.beginPath();
  this.width=Math.abs(this.x-this.x2)
  this.ctx.strokeStyle = 'black';
  this.ctx.lineWidth=2;
  this.ctx.strokeRect(Math.min(this.x,this.x2), Math.min(this.y,this.y2),this.width, this.width);
  ////last added
  this.store('square','none',this.ctx.strokeStyle,this.x,this.y,this.x2,this.y2);

  /////////////////////
  console.log(this.shapes);
  this.isDrawing=false;
  this.ctx.closePath();
}
ellipse(){

  this.ctx.beginPath();
  this.ctx.strokeStyle = 'black';
  this.ctx.lineWidth=2;
  this.radiusx = Math.abs(this.x2-this.x)/2;
  this.radiusy = Math.abs(this.y2-this.y)/2;
  this.centerx= Math.abs(this.x2+this.x)/2;
  this.centery=Math.abs(this.y2+this.y)/2;
  this.ctx.ellipse(this.centerx, this.centery, this.radiusx, this.radiusy, Math.PI, 0, 2 * Math.PI);
  this.ctx.stroke();
  ///////////////////////last added

  this.store('ellipse','none',this.ctx.strokeStyle,this.x,this.y,this.x2,this.y2);

  ///////////////////////////
  console.log(this.shapes);
  this.isDrawing=false;

}
circle(){

  this.ctx.beginPath();
  this.ctx.strokeStyle = 'black';
  this.ctx.lineWidth=2;
  this.radiusx =Math.abs(this.x2-this.x)/2;
  this.centerx= Math.abs(this.x2+this.x)/2;
  this.centery=Math.abs(this.y2+this.y)/2;
  this.ctx.arc(this.centerx, this.centery, this.radiusx, 0, 2 * Math.PI);
/////////////////last added
  this.store('circle','none',this.ctx.strokeStyle,this.x,this.y,this.x2,this.y2);

/////////////////////////////////
  console.log(this.shapes);
  this.ctx.stroke();
  }
  triangle(){
    this.ctx.beginPath();
    this.ctx.strokeStyle = 'black';
    this.ctx.lineWidth=2;
    this.ctx.moveTo(this.x,this.y);
    this.ctx.lineTo(this.x,this.y2);
    this.ctx.lineTo(this.x2,this.y2);
    ///////////////////////////last added
    this.store('triangle','none',this.ctx.strokeStyle,this.x,this.y,this.x2,this.y2);

    //////////////////////////////
    this.ctx.closePath();
    console.log(this.shapes);
    this.ctx.stroke();

  }
  line(){
    //the starting position
     this.ctx.beginPath();
     this.ctx.strokeStyle = 'black';
     this.ctx.lineWidth = 2;
     this.ctx.moveTo(this.x, this.y);
     this.ctx.lineTo(this.x2, this.y2);
     this.ctx.stroke();
     this.color();
     this.isDrawing=false;
     /////////////////////////last added
     this.store('line','none',this.ctx.strokeStyle,this.x,this.y,this.x2,this.y2);

     ////////////////////////////////////////////
     console.log(this.shapes);
     this.ctx.closePath();

   }
   /////////////////////////////////////////////////
   //used only to clear shape
   //not complete yet
select(){

  this.ctx.beginPath();
  this.width=Math.abs(this.x-this.x2)
  this.height=Math.abs(this.y-this.y2)
  this.ctx.strokeStyle = '#CC0000';
  this.ctx.lineWidth=2;
  this.ctx.strokeRect(Math.min(this.x,this.x2), Math.min(this.y,this.y2),this.width, this.height);
  console.log(this.shapes);
  this.isDrawing=false;
  this.ctx.closePath();
}

clearsave(){
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  this.shapes.clear();
  this.count=1;
}
//save as xml
 savex() {
  
  this.path = prompt("Enter the path of the file ", "D:/college/2nd year/mai.xml");

  this.http.get('http://localhost:8080/back/savexml', {  
    responseType: 'text',
    params: {
      path : this.path,
     },
     observe: "response"

    })
    .subscribe((response) => {
      var text=response.body
      this.clearsave();
    })
}

//save as json
savel() {
  
  
  this.path = prompt("Enter the path of the file ", "D:/college/2nd year/draw.json");

  this.http.get('http://localhost:8080/back/savejson', {  
    responseType: 'text',
    params: {
      path : this.path,
     },
     observe: "response"

    })
    .subscribe((response) => {
      var text=response.body
      this.clearsave();
    })
}
//used only at load and save
closeForm1() {
  document.getElementById("myForm").style.display = "none";
}
openForm1() {
  document.getElementById("myForm").style.display = "block";
}
closeForm() {
  document.getElementById("Form").style.display = "none";
}
openForm() {
  document.getElementById("Form").style.display = "block";
}


loadx(){
 
  this.path = prompt("Enter the path of the file ", "D:/college/2nd year/paint.xml");
  this.http.get('http://localhost:8080/back/loadxml', {  
    responseType: 'json',
    params: {
      path : this.path,
     },
     observe: "response"

    })
    .subscribe((response) => {
      var mapp=new Map<any, any>()  ;
      for (var value in response.body) {
        mapp.set( Number(value),response.body[value]) ;
        }
        this.shapes=mapp;
        this.count=this.shapes.size+1
        this.loadd();
    })
   
}
loadl(){
  this.path = prompt("Enter the path of the file ", "D:/college/2nd year/bob.json");
  this.http.get('http://localhost:8080/back/loadjson', {  
    responseType: 'json',
    params: {
      path : this.path,
     },
     observe: "response"

    })
    .subscribe((response) => {
      var mapp=new Map<any, any>()  ;
      for (var value in response.body) {
        mapp.set( Number(value),response.body[value]) ;
        }
        this.shapes=mapp;
        this.count=this.shapes.size+1
        this.loadd();
    })
   
}


 clearAll(){
   if(this.ld==0){
     this.undoo=1
     this.undo();
    this.shapes.clear();
   }
  
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
 
 }
 //used only when select
clearSelect(){
 this.ctx.clearRect(Math.min(this.x,this.x2)-1, Math.min(this.y,this.y2)-1, this.width+2, this.height+2);
 //console.log( this.canvas.getBoundingClientRect());
 }
 border(){
  this.bor=1;this.color();
 }
 filll(){
   this.fil=1;
   this.color();
 }
 //the redo and undo we sent flag to the back to check the right operation and  get json file to be readed here
 undo(){
 this.redoo=1;
  this.http.get('http://localhost:8080/back/undoo', {
    responseType: 'json',
    params: {
      undoo : this.undoo,
     },
    observe: "response"

  })
  .subscribe((response) => {

    var mapp=new Map<any, any>()  ;
    for (var value in response.body) {
      mapp.set( Number(value),response.body[value]) ;
      }
      this.shapes=mapp;
      console.log(this.shapes);
      this.loadd();
      if(this.undoo==1){
        this.undoo=0;
      }
  })


 }
redo(){
  this.http.get('http://localhost:8080/back/redo', {
    responseType: 'json',
    params: {
      redoo : this.redoo,
     },
    observe: "response"

  })
  .subscribe((response) => {

    var mapp=new Map<any, any>()  ;
    for (var value in response.body) {
      mapp.set( Number(value),response.body[value]) ;
      }
      this.shapes=mapp;
      console.log(this.shapes);
      this.loadd();
  })

 }
//function for color the shape and border of the shape
 color(){
     if(this.rec==1 || this.sq==1){
      
     this.colour=(<HTMLInputElement>document.getElementById("colorpickerLine")).value;
     this.c=(<HTMLInputElement>document.getElementById("colorpickerLinee")).value;
     //this.ctx.fillStyle = this.colour;
     if(this.rec==1){
     this.ctx.rect(Math.min(this.x,this.x2), Math.min(this.y,this.y2),this.width, this.height);
     if(this.fil==1){
     this.ctx.fillStyle = this.colour;
     this.ctx.fill();
     this.fil=0;
     }
     this.ctx.lineWidth = 2;
     if(this.bor==1){
     this.ctx.strokeStyle = this.c;
     this.bor=0;
     }
     ///////////////////////////////////////////////storing informmation
     //this.count=this.count-1;
     this.store('rectangle',this.colour,this.ctx.strokeStyle,this.x,this.y,this.x2,this.y2);
     this.ctx.stroke();
     }
     else{
      this.ctx.rect( Math.min(this.x,this.x2), Math.min(this.y,this.y2),this.width, this.width);
      if(this.fil==1){
      this.ctx.fillStyle = this.colour;
      this.ctx.fill();this.fil=0;
      }

      this.ctx.lineWidth = 2;
      if(this.bor==1){
      this.ctx.strokeStyle = this.c;this.bor=0;
      }
      /////////////////////storing shapes
     // this.count=this.count-1;
      this.store('square',this.colour,this.ctx.strokeStyle,this.x,this.y,this.x2,this.y2);
      this.ctx.stroke();
     }

     }else if(this.lin==1){
      this.colour=(<HTMLInputElement>document.getElementById("colorpickerLine")).value;
      this.c=(<HTMLInputElement>document.getElementById("colorpickerLinee")).value;
      if(this.bor==1){
      this.ctx.strokeStyle = this.c;this.bor=0;
      }
      if(this.fil==1){
        this.ctx.strokeStyle=this.colour;this.fil=0;
      }
      this.ctx.beginPath();
      this.ctx.lineWidth = 2;
       this.ctx.moveTo(this.x, this.y);
       this.ctx.lineTo(this.x2, this.y2);
       this.store('line',this.ctx.strokeStyle,this.ctx.strokeStyle,this.x,this.y,this.x2,this.y2);
       this.ctx.stroke();

       this.isDrawing=false;
       this.ctx.closePath();

     }else if(this.tri==1){
      this.colour=(<HTMLInputElement>document.getElementById("colorpickerLine")).value;
      this.c=(<HTMLInputElement>document.getElementById("colorpickerLinee")).value;
      if(this.bor==1){
      this.ctx.strokeStyle = this.c;this.bor=0;
      }
      this.ctx.beginPath();
     // this.ctx.strokeStyle = 'black';
      this.ctx.lineWidth=2;
      if(this.fil==1){
      this.ctx.fillStyle=this.colour;
      }
      this.ctx.moveTo(this.x,this.y);
      this.ctx.lineTo(this.x,this.y2);
      this.ctx.lineTo(this.x2,this.y2);
      if(this.fil==1){
      this.ctx.fill();this.fil=0;
      }
      this.ctx.closePath();
     //////////////////////// ///storing information of updates
     // this.count=this.count-1;
      this.store('triangle',this.colour,this.ctx.strokeStyle,this.x,this.y,this.x2,this.y2);
      this.ctx.stroke();

     }else if(this.elli==1){
      this.colour=(<HTMLInputElement>document.getElementById("colorpickerLine")).value;
       this.c=(<HTMLInputElement>document.getElementById("colorpickerLinee")).value;
       if(this.bor==1){
      this.ctx.strokeStyle = this.c;this.bor=0;
       }
      this.ctx.beginPath();
     // this.ctx.strokeStyle = 'black';
      this.ctx.lineWidth=2;
      this.ctx.ellipse(this.centerx, this.centery, this.radiusx, this.radiusy, Math.PI, 0, 2 * Math.PI);
      if(this.fil==1){
      this.ctx.fillStyle=this.colour;
      this.ctx.fill();this.fil=0;
      }
      ///////////////////storing shapes development
     // this.count=this.count-1;
      this.store('ellipse',this.colour,this.ctx.strokeStyle,this.x,this.y,this.x2,this.y2);

      this.ctx.stroke();
     }else if(this.circ==1){
      this.colour=(<HTMLInputElement>document.getElementById("colorpickerLine")).value;
      this.c=(<HTMLInputElement>document.getElementById("colorpickerLinee")).value;
      if(this.bor==1){
      this.ctx.strokeStyle = this.c;this.bor=0;
      }
      this.ctx.beginPath();
      this.ctx.lineWidth=2;
      this.ctx.arc(this.centerx, this.centery, this.radiusx, 0, 2 * Math.PI);
      if(this.fil==1){
      this.ctx.fillStyle=this.colour;
      this.ctx.fill();this.fil=0;
      }
      ///////////////////////////////store information
     // this.count=this.count-1;
      this.store('circle',this.colour,this.ctx.strokeStyle,this.x,this.y,this.x2,this.y2);

      this.ctx.stroke();
     }
     console.log(this.shapes);
    // console.log(this.history);
 }

 back(){
  this.coordinates=[this.shapes.get(this.count)[3],this.shapes.get(this.count)[4],this.shapes.get(this.count)[5],this.shapes.get(this.count)[6]];

  this.http.get('http://localhost:8080/back/shape', {
    responseType: 'text',
    params: {
     id : this.count,
     type : this.shapes.get(this.count)[0],
     fill : this.shapes.get(this.count)[1],
     border : this.shapes.get(this.count)[2],
     coordinates : this.coordinates
    },
    observe: "response"

  })
  .subscribe((response) => {
     this.bk=response.body;
  })

}

/*load(){
  this.ctx.getImageData();
}*/
//this function responsible for when getting data from the back end and redraw used in load,save,undo and redo 
loadd(){
  this.ld=1;
  this.clearAll();
  let map = new Map<any, any>();
  map=this.shapes;console.log(map.get(1));

  for (let item of map.keys()) {
    let filling=map.get(item)[1];
    let bordering=map.get(item)[2];
    let firstx=map.get(item)[3];
    let firsty=map.get(item)[4];
    let dim1=map.get(item)[5];
    let dim2=map.get(item)[6];
    if(map.get(item)[0]=='rectangle'){
      this.ctx.strokeStyle =bordering;
      this.ctx.beginPath();
      this.ctx.lineWidth = 2;
      this.ctx.strokeRect(firstx, firsty,dim1, dim2);
      if(filling !='none'){
      this.ctx.fillStyle = filling;
      this.ctx.fillRect(firstx, firsty,dim1, dim2);
      }
      this.ctx.lineWidth = 2;
     
      console.log(filling)
    }else if(map.get(item)[0]=='square'){
      this.ctx.strokeStyle = bordering;
      this.ctx.beginPath();
      this.ctx.lineWidth = 2;
      this.ctx.strokeRect(firstx, firsty,dim1, dim1);
      if(filling !='none'){
      this.ctx.fillStyle = filling;
      this.ctx.fillRect(firstx, firsty,dim1, dim1);
      }
     // this.ctx.fill(); this.ctx.stroke();
      this.ctx.lineWidth = 2;
     
      this.ctx.closePath();
    }else if(map.get(item)[0]=='circle'){
        this.ctx.strokeStyle = bordering;
        this.ctx.beginPath();
        this.ctx.lineWidth=2;
        this.ctx.arc(firstx, firsty, dim1, 0, 2 * Math.PI);
        if(filling !='none'){
        this.ctx.fillStyle=filling;
        this.ctx.fill();
        }
        this.ctx.stroke();
        this.ctx.closePath();
    }else if(map.get(item)[0]=='ellipse'){
        this.ctx.strokeStyle = bordering;
        this.ctx.beginPath();
        this.ctx.lineWidth=2;
        this.ctx.ellipse(firstx, firsty, dim1, dim2, Math.PI, 0, 2 * Math.PI);
        if(filling !='none'){
        this.ctx.fillStyle=filling;
        this.ctx.fill();
        }
        this.ctx.stroke();
        this.ctx.closePath();
    }else if(map.get(item)[0]=='triangle'){
        this.ctx.strokeStyle = bordering;
        this.ctx.beginPath();
        this.ctx.lineWidth=2;
        if(filling !='none'){
        this.ctx.fillStyle=filling;
        }
        this.ctx.moveTo(firstx,firsty);
        this.ctx.lineTo(firstx,dim2);
        this.ctx.lineTo(dim1,dim2);
        if(filling !='none'){
        this.ctx.fill();
        }
        this.ctx.closePath();
        this.ctx.stroke();
    }else if(map.get(item)[0]=='line'){
        this.ctx.strokeStyle = bordering;
        this.ctx.strokeStyle=filling;
        this.ctx.beginPath();
        this.ctx.lineWidth = 2;
        this.ctx.moveTo(firstx, firsty);
        this.ctx.lineTo(dim1, dim2);
        this.ctx.stroke();
        this.isDrawing=false;
        this.ctx.closePath();
    }
    }
    this.ld=0;
}

}
