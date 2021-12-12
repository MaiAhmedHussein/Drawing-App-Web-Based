package com.example.Drawing;



import com.example.Drawing.shapes.Shape;
import com.example.Drawing.shapes.ShapeFactory;
import com.fasterxml.jackson.core.exc.StreamReadException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.DatabindException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.json.JsonMapper;
import org.springframework.web.bind.annotation.*;

import java.beans.XMLDecoder;
import java.beans.XMLEncoder;
import java.io.*;
import java.util.HashMap;

@RestController
@CrossOrigin (origins = "http://localhost:4200")

@RequestMapping("/back")
public class Controller {
    @GetMapping("/shape")
    public void control (@RequestParam long id, @RequestParam String type, @RequestParam String fill, @RequestParam String border, @RequestParam long[] coordinates){

      //Shape shape =new Shape();
      ShapeFactory factory =new ShapeFactory();
      Shape shape=factory.createShape(type);
        UndoRedo un=new UndoRedo();
        shape.drawShape(id, type,fill, border,coordinates);
        un.addShape(shape);
    }


    //

    @GetMapping("/undoo")
    public String UNDO(@RequestParam int undoo) {

        UndoRedo un=new UndoRedo();
        if(undoo==1){
            un.clearRedo();
            un.clearUndo();
            return "{}";
        }
        //return value of hashmap undo to front to draw

        return un.convertTOJson( un.undo());
    }

    @GetMapping("/redo")
    public String REDO(@RequestParam int redoo) {

        UndoRedo un=new UndoRedo();
        //return value of hashmap undo to front to draw
        if(redoo==0){
            un.clearRedo();
        }
        return un.convertTOJson( un.Redo());
    }
    @GetMapping("/savexml")
    public String saveXML(@RequestParam String path) {
        SaveLoad sv=new SaveLoad();
        System.out.println(path);
        sv.savexml(path);

        return "done";
    }

    @GetMapping("/loadxml")
    public String loadXML(@RequestParam String path) {
        SaveLoad sv = new SaveLoad();
        UndoRedo un=new UndoRedo();
      return un.convertTOJson( sv.loadxml(path));
    }

    @GetMapping("/savejson")
    public String SaveJSON(@RequestParam String path) {
        SaveLoad sv = new SaveLoad();
        sv.savejson(path);
        return "done";
    }
    @GetMapping("/loadjson")
    public  String loadJSON(@RequestParam String path) throws StreamReadException, DatabindException, IOException{
        InputStream getLocalJsonFile = new FileInputStream(path);

        HashMap<Long,String[]> jsonMap = new ObjectMapper().readValue(getLocalJsonFile, HashMap.class);
        UndoRedo un=new UndoRedo();
        //un.setUndo(jsonMap);
        return un.convertTOJson(jsonMap);
    }

}

