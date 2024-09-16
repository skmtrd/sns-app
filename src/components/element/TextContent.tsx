import DOMPurify from 'dompurify';
import React from 'react';

const URL_REGEX = /(https?:\/\/[^\s]+)/g;

const Url = ({ url }: { url: string }) => {
  return (
    <a href={url} target='_blank' className='text-blue-500 hover:text-blue-800 hover:underline'>
      {url}
    </a>
  );
};

const TextContent = ({ textContent }: { textContent: string }) => {
  const sanitizedText = DOMPurify.sanitize(textContent);
  const lines: string[] = sanitizedText.split('\n');
  return (
    <span className='w-full'>
      <span className='break-words text-xl' onClick={(e) => e.stopPropagation()}>
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

export default TextContent;
