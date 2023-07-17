package com.tms.service.implementation;

import com.tms.entity.ClassRoomNotice;
import com.tms.entity.Classroom;
import com.tms.entity.Comment;
import com.tms.entity.Post;
import com.tms.repository.ClassRoomNoticeRepository;
import com.tms.repository.ClassroomRepository;
import com.tms.repository.CommentRepo;
import com.tms.repository.PostRepository;
import com.tms.service.ClassroomService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ClassroomServiceImpl implements ClassroomService {

    @Autowired
    private final ClassroomRepository classroomRepository;

    @Autowired
    private final PostRepository postRepository;

    @Autowired
    private final CommentRepo commentRepo;

    @Autowired
    private final ClassRoomNoticeRepository classRoomNoticeRepository;

//    public ClassroomServiceImpl(ClassroomRepository classroomRepository, PostRepository postRepository) {
//        this.classroomRepository = classroomRepository;
//        this.postRepository = postRepository;
//    }

    @Override
    public Classroom createClassroom(Classroom classroom) {
        System.out.println(classroom);
        return classroomRepository.save(classroom);
    }

    @Override
    public Post createPost(Long classroomId, Post post) {
        Classroom classroom = classroomRepository.findById(classroomId).orElse(null);
        if (classroom == null) {
            throw new IllegalArgumentException("Classroom not found with ID: " + classroomId);
        }

        Post newPost = postRepository.save(post);

        classroom.getPosts().add(newPost);
        classroomRepository.save(classroom);

        return newPost;
    }

    @Override
    public Comment createComment(Long classroomId, Long postId, Comment comment) {

        Classroom classroom = classroomRepository.findById(classroomId).orElse(null);
        if (classroom == null) {
            throw new IllegalArgumentException("Classroom not found with ID: " + classroomId);
        }

        Post post = postRepository.findById(postId).orElse(null);
        if (post == null) {
            throw new IllegalArgumentException("Post not found with ID: " + classroomId);
        }
        Comment co = commentRepo.save(comment);

        post.getComments().add(co);
        postRepository.save(post);
        return  co;



    }

    @Override
    public ClassRoomNotice createNotice(Long classroomId, ClassRoomNotice classRoomNotice) {
        Classroom classroom = classroomRepository.findById(classroomId).orElse(null);
        if (classroom == null) {
            throw new IllegalArgumentException("Classroom not found with ID: " + classroomId);
        }

        ClassRoomNotice newClassRoomNotice = classRoomNoticeRepository.save(classRoomNotice);

        classroom.getClassRoomNotice().add(newClassRoomNotice);
        classroomRepository.save(classroom);

        return newClassRoomNotice;
    }

    @Override
    public Post getPost(Long postId) {

        Post post = postRepository.findById(postId).get();

        return post;


    }
}
