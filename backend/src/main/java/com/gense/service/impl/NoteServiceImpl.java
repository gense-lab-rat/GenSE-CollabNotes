package com.gense.service.impl;

import com.gense.model.Note;
import com.gense.repository.NoteRepository;
import com.gense.service.NoteService;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.List;

@Service
public class NoteServiceImpl implements NoteService {

    private final NoteRepository repo;

    public NoteServiceImpl(NoteRepository repo) {
        this.repo = repo;
    }

    @Override
    public Note create(Note note) {
        return repo.save(note);
    }

    @Override
    public Note getById(Long id) {
        return repo.findById(id)
                   .orElseThrow(() -> new EntityNotFoundException("Note not found: " + id));
    }

    @Override
    public List<Note> getAll() {
        return repo.findAll();
    }

    @Override
    public Note update(Long id, Note note) {
        Note existing = getById(id);
        existing.setTitle(note.getTitle());
        existing.setContent(note.getContent());
        return repo.save(existing);
    }

    @Override
    public void delete(Long id) {
        repo.deleteById(id);
    }
}