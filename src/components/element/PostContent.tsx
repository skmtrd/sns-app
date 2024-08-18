import DOMPurify from 'dompurify';
import React from 'react';

const URL_REGEX = /(https?:\/\/[^\s]+)/g;

const Url = ({ url }: { url: string }) => {
  return (
    <a
      href={url}
      onClick={(e) => e.stopPropagation()}
      target='_blank'
      className='text-blue-500 hover:text-blue-800 hover:underline'
    >
      {url}
    </a>
  );
};

const PostContent = ({ textContent }: { textContent: string }) => {
  const sanitizedText = DOMPurify.sanitize(textContent);
  const lines: string[] = sanitizedText.split('\n');
  return (
    <span>
      <span className='break-words'>
        {lines.map((line, lineIndex) => {
          const parts = line.split(URL_REGEX);
          return (
            <React.Fragment key={lineIndex}>
              {parts.map((part, partIndex) =>
                URL_REGEX.test(part) ? <Url key={`${lineIndex}-${partIndex}`} url={part} /> : part,
              )}
              {lineIndex < lines.length - 1 && <br />}
            </React.Fragment>
          );
        })}
      </span>
    </span>
  );
};

export default PostContent;
