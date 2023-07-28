package com.tms.service.implementation;

import com.tms.entity.*;
import com.tms.repository.ClassRoomNoticeRepository;
import com.tms.repository.ClassroomRepository;
import com.tms.repository.CommentRepo;
import com.tms.repository.PostRepository;
import com.tms.service.ClassroomService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class
ClassroomServiceImpl implements ClassroomService {

    @Autowired
    private final ClassroomRepository classroomRepo;

    @Autowired
    private final PostRepository postRepo;

    @Autowired
    private final CommentRepo commentRepo;

    @Autowired
    private final ClassRoomNoticeRepository classRoomNoticeRepo;


    @Override
    public Classroom createClassroom(Classroom classroom) {
        System.out.println(classroom);
        return classroomRepo.save(classroom);
    }

    @Override
    public Post createPost(Long classroomId, Post post) {
        Classroom classroom = classroomRepo.findById(classroomId)
                .orElseThrow(() -> new IllegalArgumentException("Classroom not found with ID: " + classroomId));

        String content = post.getContent();
        int maxContentLength = 500;

        if (content != null && content.length() > maxContentLength) {
            throw new IllegalArgumentException("Content length exceeds the maximum allowed (500 characters).");
        }

        post.setClassroomId(classroomId);

        Post newPost = postRepo.save(post);

        classroom.getPosts().add(newPost);
        classroomRepo.save(classroom);

        return newPost;
    }



    @Override
    public Comment createComment(Long classroomId, Long postId, Comment comment) {

        Classroom classroom = classroomRepo.findById(classroomId).orElse(null);
        if (classroom == null) {
            throw new IllegalArgumentException("Classroom not found with ID: " + classroomId);
        }

        Post post = postRepo.findById(postId).orElse(null);
        if (post == null) {
            throw new IllegalArgumentException("Post not found with ID: " + classroomId);
        }
        Comment co = commentRepo.save(comment);

        post.getComments().add(co);
        postRepo.save(post);
        return  co;



    }

    @Override
    public ClassRoomNotice createNotice(Long classroomId, ClassRoomNotice classRoomNotice) {
        Classroom classroom = classroomRepo.findById(classroomId).orElse(null);
        if (classroom == null) {
            throw new IllegalArgumentException("Classroom not found with ID: " + classroomId);
        }

        ClassRoomNotice newClassRoomNotice = classRoomNoticeRepo.save(classRoomNotice);

        classroom.getClassRoomNotice().add(newClassRoomNotice);
        classroomRepo.save(classroom);

        return newClassRoomNotice;
    }

    @Override
    public Post getPost(Long postId) {

        Post post = postRepo.findById(postId).get();

        return post;
    }

    public void deletePostWithComments(Long postId) {
        Post post = postRepo.findById(postId).orElse(null);
        if (post != null) {

            post.getComments().clear();
            Classroom classroom = classroomRepo.findById(post.getClassroomId()).orElse(null);
            if (classroom != null) {
                classroom.getPosts().remove(post);
                classroomRepo.save(classroom);
            }
            postRepo.delete(post);
        }
    }


}
