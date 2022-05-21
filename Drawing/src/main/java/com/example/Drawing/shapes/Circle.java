package com.example.Drawing.shapes;

public class Circle extends Shape {
    @Override
    public void drawShape(long id, String type, String fill, String border, long[] coordinates) {
        setType("circle");
        setId(id);
        setFill(fill);
        setBorder(border);
        setX(Math.abs(coordinates[0]+coordinates[2])/2);
        setY(Math.abs(coordinates[1]+coordinates[3])/2);
        setDim1(Math.abs(coordinates[2]-coordinates[0])/2);
        setDim2(0);

       /* this.type="circle";
        this.id=id;
        this.fill=fill;
        this.border=border;
        this.x= Math.abs(coordinates[0]+coordinates[2])/2;
        this.y = Math.abs(coordinates[1]+coordinates[3])/2;
        this.dim1= Math.abs(coordinates[2]-coordinates[0])/2;
        this.dim2=0;*/
    }
}
