package com.example.Drawing;

import com.fasterxml.jackson.databind.ObjectMapper;

import java.beans.XMLDecoder;
import java.beans.XMLEncoder;
import java.io.*;
import java.util.HashMap;

public class SaveLoad {
    public void savexml(String path){
        UndoRedo un=new UndoRedo();
        try(FileOutputStream f=new FileOutputStream(new File(path).getAbsolutePath())) {
            XMLEncoder encoder=new XMLEncoder(f);
            encoder.writeObject(un.getUndo());
            un.clearUndo();
            un.clearRedo();
            encoder.close();
        }catch(IOException ex) {
            ex.printStackTrace();
        }

    }
    public HashMap<Long,String[]>  loadxml(String path){
        HashMap<Long,String[]> load=new HashMap<>();
        try(InputStream f=new FileInputStream(new File(path).getAbsolutePath())) {
            XMLDecoder decoder=new XMLDecoder(f);
            load=(HashMap<Long,String[]>)decoder.readObject();
            decoder.close();
        }catch(IOException ex) {
            ex.printStackTrace();
        }
        System.out.print(load.values());
        UndoRedo un=new UndoRedo();
        un.setUndo(load);
        return load;
    }
   public void savejson(String path){
       ObjectMapper mapper = new ObjectMapper();
       UndoRedo un=new UndoRedo();
       try {
           String json = mapper.writeValueAsString(un.getUndo());
           un.clearUndo();
           un.clearRedo();
           FileWriter writer = new FileWriter(path);
           writer.write(json);
           writer.flush();
           writer.close();
       }catch (IOException e) {
           e.printStackTrace();
       }

   }
}

