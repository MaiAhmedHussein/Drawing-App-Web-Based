package com.example.Drawing.shapes;

public class Shape implements IShape {

 ShapeFactory factory =new ShapeFactory();

   String type;
   String fill;
   long x;long y;
   String border;
   long dim1;long dim2;
   long id;
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getType() {
            return type;
        }

        public void setType(String type) {
            this.type = type;
        }

        public String getFill() {
            return fill;
        }

        public void setFill(String fill) {
            this.fill = fill;
        }

        public long getX() {
            return x;
        }

        public void setX(long x) {
            this.x = x;
        }

        public long getY() {
            return y;
        }

        public void setY(long y) {
            this.y = y;
        }

        public String getBorder() {
            return border;
        }

        public void setBorder(String border) {
            this.border = border;
        }

        public long getDim1() {
            return dim1;
        }

        public void setDim1(long dim1) {
            this.dim1 = dim1;
        }

        public long getDim2() {
            return dim2;
        }

        public void setDim2(long dim2) {
            this.dim2 = dim2;
        }






    public void drawShape(long id, String type, String fill, String border, long[] coordinates) {
    }

   /* @Override
    public Shape createShape(String type) {

    }*/
}
