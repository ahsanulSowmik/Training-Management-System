package com.tms.controller;

import com.tms.entity.ClassRoomNotice;
import com.tms.entity.Classroom;
import com.tms.entity.Comment;
import com.tms.entity.Post;
import com.tms.service.ClassroomService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/classrooms")
@CrossOrigin(origins = "*")
public class ClassroomController {
    private final ClassroomService classroomService;

    public ClassroomController(ClassroomService classroomService) {
        this.classroomService = classroomService;
    }

    @PostMapping
    public ResponseEntity<Classroom> createClassroom(@RequestBody Classroom classroom) {
        Classroom createdClassroom = classroomService.createClassroom(classroom);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdClassroom);
    }

    @PostMapping("/{classroomId}/posts")
    public ResponseEntity<?> createPost(@PathVariable Long classroomId, @RequestBody Post post) {
        Post createdPost = classroomService.createPost(classroomId, post);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdPost);
    }

    @PostMapping("/{classroomId}/post/{postId}/comments")
    public ResponseEntity<?> createComment(@PathVariable Long classroomId,@PathVariable Long postId, @RequestBody Comment comment) {
        Comment createdPost = classroomService.createComment(classroomId, postId,comment);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdPost);
    }

    @GetMapping("/post/{postId}")
    public ResponseEntity<?> getPost(@PathVariable Long postId) {
        Post post = classroomService.getPost(postId);
        return ResponseEntity.status(HttpStatus.CREATED).body(post);
    }

    @DeleteMapping("/{postId}")
    public ResponseEntity<String> deletePostWithComments(@PathVariable Long postId) {
        classroomService.deletePostWithComments(postId);
        return new ResponseEntity<>("Post with ID " + postId + " and its comments have been deleted.", HttpStatus.OK);
    }
}

