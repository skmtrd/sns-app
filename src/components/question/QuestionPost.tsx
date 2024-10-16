'use client';

import { useDeleteQuestion } from '@/hooks/DeleteContent/useDeleteQuestion';
import { useQuestionLike } from '@/hooks/Like/useQuestionLike';
import { useRelativeTime } from '@/hooks/useRelativeTime';
import { Question } from '@/lib/types';
import {
  BookmarkPlus,
  ChevronDown,
  ChevronUp,
  MessageCircleReply,
  MoreVertical,
  Send,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { mutate } from 'swr';
import KebabMenu from '../element/KebabMenu';
import TextContent from '../element/TextContent';
import QuestionReplies from './QuestionReplies';

type QuestionPostProps = {
  question: Question;
  currentUserId: string;
};

type ReplyFormData = {
  content: string;
};

const QuestionPost: React.FC<QuestionPostProps> = ({ question, currentUserId }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isReplyDrawerOpen, setIsReplyDrawerOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const [replyContentHeight, setReplyContentHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const replyContentRef = useRef<HTMLDivElement>(null);
  const timeAgo = useRelativeTime(question.createdAt);
  const { likesCount, isLiked, isLiking, handleToggleLike } = useQuestionLike(
    question.likes,
    currentUserId,
  );

  const handleDeleteQuestion = useDeleteQuestion();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ReplyFormData>();

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleReplyDrawerToggle = () => {
    setIsReplyDrawerOpen(!isReplyDrawerOpen);
  };

  const onSubmit = async (data: ReplyFormData) => {
    const newReply = {
      content: data.content,
      questionId: question.id,
    };
    try {
      const response = await fetch(`/api/question/${question.id}/reply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newReply),
      });
      mutate('/api/question');
      reset();
      setIsReplyDrawerOpen(false);
    } catch (err: any) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
    if (replyContentRef.current) {
      setReplyContentHeight(replyContentRef.current.scrollHeight);
    }
  }, [isDrawerOpen, isReplyDrawerOpen]);

  return (
    <div className='relative w-11/12 rounded-lg bg-white p-6 shadow'>
      <div className='flex items-start justify-between'>
        <div>
          <h3 className='break-words text-xl font-bold'>{question.title}</h3>
          <p className='break-words text-sm text-gray-600'>{question.author.name}さん</p>
          <div className='mt-2'>
            <TextContent textContent={question.description} />
          </div>
        </div>
        <p className='mr-1 whitespace-nowrap text-sm text-gray-500'>{timeAgo}</p>
      </div>
      <h4 className='mt-4 font-semibold'>回答({question.replies.length})</h4>
      {question.replies.length > 0 ? (
        <>
          <QuestionReplies
            replyAuthorName={question.replies[0].author.name}
            textContent={question.replies[0].content}
          />
          {question.replies.length > 1 && (
            <>
              <div
                ref={contentRef}
                className='overflow-hidden transition-all duration-500 ease-in-out'
                style={{ height: isDrawerOpen ? `${contentHeight}px` : '0' }}
              >
                {question.replies.slice(1).map((reply) => (
                  <QuestionReplies
                    key={reply.id}
                    replyAuthorName={reply.author.name}
                    textContent={reply.content}
                  />
                ))}
              </div>
              <div className='mt-6 flex w-full items-center justify-between'>
                <div className='flex items-center justify-center gap-2'>
                  <button
                    onClick={handleReplyDrawerToggle}
                    className='flex items-center justify-center rounded-full bg-blue-400 px-4 py-2 text-white transition-all hover:bg-blue-600 hover:shadow-lg'
                  >
                    <MessageCircleReply size={20} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleLike(question.id);
                    }}
                    className='text-blue-600'
                  >
                    {isLiked ? (
                      <BookmarkPlus size={27} fill={'rgb(37 99 235)'} />
                    ) : (
                      <BookmarkPlus size={27} />
                    )}
                  </button>
                </div>
                <div className='relative flex gap-2'>
                  <button
                    onClick={handleDrawerToggle}
                    className='flex items-center justify-center rounded-full bg-blue-100 px-4 py-2 text-blue-600 transition-all hover:bg-blue-200'
                  >
                    {isDrawerOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className='text-gray-500 hover:text-gray-700'
                  >
                    <MoreVertical size={20} />
                  </button>
                  {isDropdownOpen && (
                    <KebabMenu
                      currentUserId={currentUserId}
                      authorUserId={question.author.id}
                      contentId={question.id}
                      handleDelete={handleDeleteQuestion}
                    />
                  )}
                </div>
              </div>
            </>
          )}
        </>
      ) : (
        <p className='mt-4 font-semibold text-red-500'>まだ回答がありません</p>
      )}

      {question.replies.length <= 1 && (
        <div className='relative mt-6 flex w-full justify-between'>
          <div className='flex items-center justify-center gap-2'>
            <button
              onClick={handleReplyDrawerToggle}
              className='flex items-center justify-center rounded-full bg-blue-400 px-4 py-2 text-white transition-all hover:bg-blue-600 hover:shadow-lg'
            >
              <MessageCircleReply size={20} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleToggleLike(question.id);
              }}
              className='text-blue-600'
            >
              {isLiked ? (
                <BookmarkPlus size={27} fill={'rgb(37 99 235)'} />
              ) : (
                <BookmarkPlus size={27} />
              )}
            </button>
          </div>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className='text-gray-500 hover:text-gray-700'
          >
            <MoreVertical size={20} />
          </button>
          {isDropdownOpen && (
            <KebabMenu
              contentId={question.id}
              currentUserId={currentUserId}
              authorUserId={question.author.id}
              handleDelete={handleDeleteQuestion}
            />
          )}
        </div>
      )}

      <div
        ref={replyContentRef}
        className='overflow-hidden transition-all duration-500 ease-in-out'
        style={{ height: isReplyDrawerOpen ? `${replyContentHeight}px` : '0' }}
      >
        <form
          onSubmit={async (e: React.FormEvent) => {
            e.preventDefault();
            handleSubmit(onSubmit)();
          }}
          className='mt-4'
        >
          <textarea
            {...register('content', { required: '回答を入力してください' })}
            className='w-full rounded-lg border p-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200'
            rows={4}
            placeholder='回答を入力してください'
          />
          {errors.content && <p className='mt-1 text-sm text-red-500'>{errors.content.message}</p>}
          <div className='mt-3 text-right'>
            <button
              type='submit'
              className='mb-4 inline-flex items-center justify-center rounded-full bg-green-500 px-4 py-2 text-white transition-all hover:bg-green-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-300 focus:ring-offset-2'
            >
              <Send size={20} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuestionPost;
