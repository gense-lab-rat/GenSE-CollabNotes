package com.gense.service;

import com.gense.model.Note;
import java.util.List;

public interface NoteService {
    Note create(Note note);
    Note getById(Long id);
    List<Note> getAll();
    Note update(Long id, Note note); 
    void delete(Long id);            
}
