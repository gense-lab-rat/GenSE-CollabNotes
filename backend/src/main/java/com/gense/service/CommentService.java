package com.gense.service;

import com.gense.model.Comment;
import com.gense.model.Note;
import com.gense.repository.CommentRepository;
import com.gense.repository.NoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class CommentService {
    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private NoteRepository noteRepository;

    @Transactional
    public Comment addComment(Long noteId, Long authorId, String content) {
        Note note = noteRepository.findById(noteId)
            .orElseThrow(() -> new IllegalArgumentException("Note not found"));
        Comment c = new Comment();
        c.setNote(note);
        c.setAuthorId(authorId);
        c.setContent(content);
        c.setCreatedAt(LocalDateTime.now());
        return commentRepository.save(c);
    }

    public List<Comment> getComments(Long noteId) {
        return commentRepository.findByNoteId(noteId);
    }
}
