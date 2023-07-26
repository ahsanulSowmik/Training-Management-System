package com.tms.service;

import com.tms.entity.ClassRoomNotice;
import com.tms.entity.Classroom;
import com.tms.entity.Comment;
import com.tms.entity.Post;

public interface ClassroomService {
    Classroom createClassroom(Classroom classroom);

    public Post createPost(Long classroomId, Post post);

    public Comment createComment(Long classroomId,Long postId, Comment comment);

    public ClassRoomNotice createNotice(Long classroomId, ClassRoomNotice classRoomNotice);

    public Post getPost(Long postId);

    public void deletePostWithComments(Long postId);
}