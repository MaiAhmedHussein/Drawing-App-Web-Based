package com.example.Drawing.shapes;

public class Square extends Shape{
    public void drawShape(long id, String type, String fill, String border, long[] coordinates) {

        //this.type="square";
        //this.id=id;
        setType("square");
        setId(id);
        setFill(fill) ;
        setBorder(border);
        setDim1(Math.abs(coordinates[0]-coordinates[2]));
        setY(Math.min(coordinates[1],coordinates[3]));
        setX(Math.min(coordinates[0],coordinates[2]));
        setDim2(this.dim1);
        //this.border=border;
       // this.x=Math.min(coordinates[0],coordinates[2]);
       // this.y=Math.min(coordinates[1],coordinates[3]);
        //this.dim1=Math.abs(coordinates[0]-coordinates[2]);
        //this.dim2=this.dim1;
    }
}
