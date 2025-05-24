package com.gense.controller;

import com.gense.model.Comment;
import com.gense.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/notes/{noteId}/comments")
public class CommentController {
    @Autowired
    private CommentService commentService;

    @PostMapping
    public ResponseEntity<Comment> addComment(
        @PathVariable Long noteId,
        @RequestBody Map<String, Object> payload
    ) {
        Long authorId = Long.valueOf(payload.get("authorId").toString());
        String content = payload.get("content").toString();
        Comment saved = commentService.addComment(noteId, authorId, content);
        return ResponseEntity.ok(saved);
    }

    @GetMapping
    public ResponseEntity<List<Comment>> getComments(@PathVariable Long noteId) {
        List<Comment> list = commentService.getComments(noteId);
        return ResponseEntity.ok(list);
    }
}
