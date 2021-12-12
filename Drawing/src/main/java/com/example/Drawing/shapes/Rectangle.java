package com.example.Drawing.shapes;

public class Rectangle extends Shape {

    @Override
    public void drawShape(long id, String type, String fill, String border, long[] coordinates) {
        setType("rectangle");
        setId(id);
        setFill(fill);
        setBorder(border);
        setX(Math.min(coordinates[0],coordinates[2]));
        setY(Math.min(coordinates[1],coordinates[3]));
        //the width
        setDim1(Math.abs(coordinates[0]-coordinates[2]));
        setDim2(Math.abs(coordinates[1]-coordinates[3]));

       /* this.type="rectangle";
        this.id=id;
        this.fill=fill;
        this.border=border;
        this.x=Math.min(coordinates[0],coordinates[2]);
        this.y=Math.min(coordinates[1],coordinates[3]);
        //the width
        this.dim1=Math.abs(coordinates[0]-coordinates[2]);
        this.dim2=Math.abs(coordinates[1]-coordinates[3]);*/
    }
}
