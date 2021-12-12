package com.example.Drawing.shapes;

public class Line extends Shape {
    @Override
    public void drawShape(long id, String type, String fill, String border, long[] coordinates) {
        setType("line");
        setId(id);
        setFill(fill);
        setBorder(border);
        setX(coordinates[0]);
        setY(coordinates[1]);
        setDim1(coordinates[2]);
        setDim2(coordinates[3]);

        /*this.type = "line";
        this.id=id;
        this.fill = fill;
        this.border = border;
        this.x = coordinates[0];
        this.y = coordinates[1];
        this.dim1 = coordinates[2];
        this.dim2 = coordinates[3];*/
    }

}